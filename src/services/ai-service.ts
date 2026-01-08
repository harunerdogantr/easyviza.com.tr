import { GoogleGenerativeAI } from '@google/generative-ai'
import { getDocumentUrl } from '@/lib/s3'
import { prisma } from '@/lib/prisma'

// Google Gemini client yapılandırması
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

// AI Review sonuç tipi
export interface AIReviewResult {
  isValid: boolean
  isBlurry: boolean
  personalInfo: {
    firstName?: string
    lastName?: string
    passportNumber?: string
    expiryDate?: string
    dateOfBirth?: string
    nationality?: string
  }
  issues: string[]
  recommendations: string[]
  confidence: number // 0-100 arası güven skoru
}

export interface AnalyzeDocumentResult {
  success: boolean
  review?: AIReviewResult
  error?: string
}

/**
 * Belgeyi Google Gemini Flash ile analiz et
 */
export async function analyzeDocument(
  documentId: string,
  visaApplicationId: string
): Promise<AnalyzeDocumentResult> {
  try {
    // Document'i veritabanından al
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        visaApplication: true
      }
    })

    if (!document) {
      return {
        success: false,
        error: 'Döküman bulunamadı'
      }
    }

    // Presigned URL al
    const documentUrl = await getDocumentUrl(documentId)
    if (!documentUrl) {
      return {
        success: false,
        error: 'Döküman URL\'si alınamadı'
      }
    }

    // URL'den görüntüyü indir (base64'e dönüştürmek için)
    const imageResponse = await fetch(documentUrl)
    const imageBuffer = await imageResponse.arrayBuffer()
    const base64Image = Buffer.from(imageBuffer).toString('base64')

    // Gemini Flash modelini kullan
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const systemPrompt = `Sen bir vize uzmanısın. Yüklenen belgeyi detaylı bir şekilde incele ve analiz et. 
Belgenin geçerliliğini, netliğini ve uygunluğunu değerlendir. 
Kişisel bilgileri çıkar ve belgenin vize başvurusu için uygun olup olmadığını belirle.`

    const userPrompt = `Bu belgeyi bir vize uzmanı gibi incele. 
Aşağıdaki bilgileri çıkar ve belgenin uygun olup olmadığını değerlendir:

1. Kişisel Bilgiler:
   - Ad (firstName)
   - Soyad (lastName)
   - Pasaport numarası (passportNumber)
   - Geçerlilik tarihi (expiryDate)
   - Doğum tarihi (dateOfBirth)
   - Uyruk (nationality)

2. Belge Değerlendirmesi:
   - Belge geçerli mi? (isValid: boolean)
   - Belge bulanık mı? (isBlurry: boolean)
   - Tespit edilen sorunlar (issues: string[])
   - Öneriler (recommendations: string[])
   - Güven skoru 0-100 arası (confidence: number)

Lütfen sonucu JSON formatında döndür. Sadece JSON döndür, başka açıklama yapma.

JSON formatı:
{
  "isValid": boolean,
  "isBlurry": boolean,
  "personalInfo": {
    "firstName": "string veya null",
    "lastName": "string veya null",
    "passportNumber": "string veya null",
    "expiryDate": "YYYY-MM-DD formatında veya null",
    "dateOfBirth": "YYYY-MM-DD formatında veya null",
    "nationality": "string veya null"
  },
  "issues": ["sorun1", "sorun2"],
  "recommendations": ["öneri1", "öneri2"],
  "confidence": 85
}`

    // Gemini API çağrısı
    const result = await model.generateContent([
      systemPrompt + '\n\n' + userPrompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: document.mimeType || 'image/jpeg'
        }
      }
    ])

    const response = await result.response
    const content = response.text()

    if (!content) {
      return {
        success: false,
        error: 'Gemini\'den cevap alınamadı'
      }
    }

    // JSON'u parse et
    let jsonContent = content.trim()
    
    // Markdown code block'ları temizle
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/^```(?:json)?\n?/g, '').replace(/\n?```$/g, '')
    }

    let aiReview: AIReviewResult
    try {
      aiReview = JSON.parse(jsonContent) as AIReviewResult
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw content:', content)
      return {
        success: false,
        error: 'Gemini cevabı parse edilemedi'
      }
    }

    // Validasyon: Gerekli alanların varlığını kontrol et
    if (typeof aiReview.isValid !== 'boolean' || typeof aiReview.isBlurry !== 'boolean') {
      return {
        success: false,
        error: 'Gemini cevabı geçersiz format'
      }
    }

    // VisaApplication'a AI review'ı kaydet
    await prisma.visaApplication.update({
      where: { id: visaApplicationId },
      data: {
        aiReview: aiReview as any // Prisma Json tipi için
      }
    })

    return {
      success: true,
      review: aiReview
    }
  } catch (error: any) {
    console.error('Analyze document error:', error)
    
    // Gemini API hatalarını handle et
    if (error?.message?.includes('API_KEY')) {
      return {
        success: false,
        error: 'Google Gemini API anahtarı geçersiz'
      }
    }
    
    if (error?.message?.includes('quota') || error?.message?.includes('429')) {
      return {
        success: false,
        error: 'Gemini API rate limit aşıldı, lütfen daha sonra tekrar deneyin'
      }
    }

    return {
      success: false,
      error: error?.message || 'Belge analiz edilirken bir hata oluştu'
    }
  }
}

/**
 * VisaApplication'ın AI review'ını al
 */
export async function getAIReview(visaApplicationId: string): Promise<AIReviewResult | null> {
  try {
    const application = await prisma.visaApplication.findUnique({
      where: { id: visaApplicationId },
      select: { aiReview: true }
    })

    if (!application || !application.aiReview) {
      return null
    }

    return application.aiReview as AIReviewResult
  } catch (error) {
    console.error('Get AI review error:', error)
    return null
  }
}
