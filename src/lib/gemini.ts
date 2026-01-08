import { GoogleGenerativeAI } from '@google/generative-ai'

// Google Gemini client yapılandırması
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

/**
 * Gemini 1.5 Flash modelini hazırla
 */
export function getGeminiFlashModel() {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
}

/**
 * File'ı base64'e dönüştür (Gemini için)
 */
export async function fileToBase64(file: File): Promise<{ mimeType: string; data: string }> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString('base64')
  
  return {
    mimeType: file.type,
    data: base64
  }
}

/**
 * Gemini'ye görsel gönder ve cevap al
 */
export async function analyzeImageWithGemini(
  imageBase64: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  const model = getGeminiFlashModel()
  
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType
      }
    }
  ])

  const response = await result.response
  return response.text()
}











