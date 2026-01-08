'use server'

import { getGeminiFlashModel, fileToBase64 } from '@/lib/gemini'

export interface PassportInfo {
  ad?: string
  soyad?: string
  pasaportNumarasi?: string
  ulke?: string
}

export interface PassportAnalysisResult {
  success: boolean
  data?: PassportInfo
  rawResponse?: string
  error?: string
}

/**
 * Pasaport görselini Gemini ile analiz et
 */
export async function analyzePassportWithGemini(
  file: File
): Promise<PassportAnalysisResult> {
  try {
    // Dosya validasyonu
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Sadece JPG, PNG ve PDF dosyaları kabul edilir'
      }
    }

    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        error: 'Dosya boyutu 10MB\'dan büyük olamaz'
      }
    }

    // File'ı base64'e dönüştür
    const { mimeType, data: base64Data } = await fileToBase64(file)

    // Gemini modelini al
    const model = getGeminiFlashModel()

    // Prompt
    const prompt = `Bu bir pasaport görselidir. Lütfen görseldeki Ad, Soyad, Pasaport Numarası ve Ülke bilgilerini oku ve bana saf JSON formatında döndür.

JSON formatı şöyle olmalı:
{
  "ad": "Ad bilgisi",
  "soyad": "Soyad bilgisi",
  "pasaportNumarasi": "Pasaport numarası",
  "ulke": "Ülke bilgisi"
}

Eğer bir bilgi bulunamazsa null kullan. Sadece JSON döndür, başka açıklama yapma.`

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
    const rawText = response.text()

    if (!rawText) {
      return {
        success: false,
        error: 'Gemini\'den cevap alınamadı'
      }
    }

    // JSON'u temizle ve parse et
    let jsonContent = rawText.trim()
    
    // Markdown code block'ları temizle
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/^```(?:json)?\n?/g, '').replace(/\n?```$/g, '')
    }

    // JSON parse et
    let passportInfo: PassportInfo
    try {
      passportInfo = JSON.parse(jsonContent)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw response:', rawText)
      return {
        success: false,
        error: 'Gemini cevabı JSON formatında değil',
        rawResponse: rawText
      }
    }

    return {
      success: true,
      data: passportInfo,
      rawResponse: rawText
    }
  } catch (error: any) {
    console.error('Analyze passport with Gemini error:', error)
    
    if (error?.message?.includes('API_KEY') || error?.message?.includes('api key')) {
      return {
        success: false,
        error: 'Google Gemini API anahtarı geçersiz veya eksik'
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












