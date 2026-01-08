'use server'

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { extractTextFromImage } from '@/lib/ocr'
import { revalidatePath } from 'next/cache'

// Google Gemini client yapılandırması
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export interface PassportAnalysisResult {
  success: boolean
  data?: {
    firstName: string
    lastName: string
    expiryDate: string
  }
  ocrText?: string
  error?: string
}

/**
 * Dosyayı public/uploads klasörüne kaydet
 */
async function saveFileToPublic(file: File): Promise<{ path: string; url: string }> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // public/uploads klasörünü oluştur (yoksa)
  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  try {
    await mkdir(uploadsDir, { recursive: true })
  } catch (error) {
    // Klasör zaten varsa hata vermez
  }

  // Benzersiz dosya adı oluştur
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const fileExtension = file.name.substring(file.name.lastIndexOf('.'))
  const fileName = `${timestamp}-${randomString}${fileExtension}`
  
  const filePath = join(uploadsDir, fileName)
  await writeFile(filePath, buffer)

  // Public URL oluştur
  const publicUrl = `/uploads/${fileName}`

  return { path: filePath, url: publicUrl }
}

/**
 * File'ı base64'e dönüştür (Gemini için)
 */
async function fileToBase64(file: File): Promise<{ mimeType: string; data: string }> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString('base64')
  
  return {
    mimeType: file.type,
    data: base64
  }
}

/**
 * Pasaportu analiz et (Gemini Flash + OCR)
 */
export async function analyzePassport(file: File): Promise<PassportAnalysisResult> {
  try {
    // Dosyayı public/uploads'a kaydet
    const { path: filePath, url: fileUrl } = await saveFileToPublic(file)

    // OCR ile metin çıkar (opsiyonel - ek bilgi için)
    let ocrText = ''
    try {
      const ocrResult = await extractTextFromImage(filePath)
      ocrText = ocrResult.text
      console.log('OCR Confidence:', ocrResult.confidence)
    } catch (ocrError) {
      console.warn('OCR hatası (devam ediliyor):', ocrError)
      // OCR hatası olsa bile Gemini analizine devam et
    }

    // File'ı base64'e dönüştür
    const { mimeType, data: base64Data } = await fileToBase64(file)

    // Gemini Flash modelini kullan
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Bu pasaport görüntüsünü analiz et ve sadece şu bilgileri JSON formatında döndür:
- firstName: Ad (Türkçe karakterleri İngilizce karşılıklarına çevir, örn: "Ahmet" -> "Ahmet")
- lastName: Soyad (Türkçe karakterleri İngilizce karşılıklarına çevir)
- expiryDate: Son geçerlilik tarihi (YYYY-MM-DD formatında)

Sadece JSON döndür, başka açıklama yapma. Eğer bir bilgi bulunamazsa null kullan.

Örnek format:
{
  "firstName": "Ahmet",
  "lastName": "Yilmaz",
  "expiryDate": "2025-12-31"
}`

    // Gemini API çağrısı
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      }
    ])

    const response = await result.response
    const content = response.text()

    if (!content) {
      return {
        success: false,
        error: 'Gemini\'den cevap alınamadı',
        ocrText: ocrText || undefined
      }
    }

    // JSON'u parse et (Gemini bazen markdown code block içinde döndürebilir)
    let jsonContent = content.trim()
    
    // Markdown code block'ları temizle
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/^```(?:json)?\n?/g, '').replace(/\n?```$/g, '')
    }

    let analysisData: { firstName?: string; lastName?: string; expiryDate?: string }
    try {
      analysisData = JSON.parse(jsonContent)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw content:', content)
      return {
        success: false,
        error: 'Gemini cevabı parse edilemedi',
        ocrText: ocrText || undefined
      }
    }

    // Validasyon
    if (!analysisData.firstName || !analysisData.lastName || !analysisData.expiryDate) {
      return {
        success: false,
        error: 'Pasaport bilgileri tam olarak çıkarılamadı',
        ocrText: ocrText || undefined
      }
    }

    return {
      success: true,
      data: {
        firstName: analysisData.firstName,
        lastName: analysisData.lastName,
        expiryDate: analysisData.expiryDate
      },
      ocrText: ocrText || undefined
    }
  } catch (error: any) {
    console.error('Analyze passport error:', error)
    
    if (error?.message?.includes('API_KEY')) {
      return {
        success: false,
        error: 'Google Gemini API anahtarı geçersiz'
      }
    }
    
    if (error?.message?.includes('quota') || error?.message?.includes('429')) {
      return {
        success: false,
        error: 'Rate limit aşıldı, lütfen daha sonra tekrar deneyin'
      }
    }

    return {
      success: false,
      error: error?.message || 'Pasaport analiz edilirken bir hata oluştu'
    }
  }
}
