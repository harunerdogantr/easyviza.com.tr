import { createWorker } from 'tesseract.js'

/**
 * Tesseract.js ile görselden metin çıkarma (OCR)
 */
export async function extractTextFromImage(
  imagePath: string | Buffer | File
): Promise<{ text: string; confidence: number }> {
  const worker = await createWorker('eng', 1, {
    logger: (m) => {
      // Log mesajlarını isteğe bağlı olarak göster
      if (m.status === 'recognizing text') {
        // Progress log'ları
      }
    }
  })

  try {
    let imageData: Buffer | string

    // File objesi ise Buffer'a dönüştür
    if (imagePath instanceof File) {
      const arrayBuffer = await imagePath.arrayBuffer()
      imageData = Buffer.from(arrayBuffer)
    } else if (typeof imagePath === 'string') {
      // String ise dosya yolu olarak kullan
      imageData = imagePath
    } else {
      // Zaten Buffer
      imageData = imagePath
    }

    // OCR işlemi
    const { data: { text, confidence } } = await worker.recognize(imageData)

    return {
      text: text.trim(),
      confidence: confidence || 0
    }
  } finally {
    await worker.terminate()
  }
}

/**
 * Birden fazla dil desteği ile OCR
 */
export async function extractTextFromImageMultiLang(
  imagePath: string | Buffer | File,
  languages: string[] = ['eng', 'tur'] // İngilizce ve Türkçe
): Promise<{ text: string; confidence: number }> {
  const langString = languages.join('+')
  const worker = await createWorker(langString, 1, {
    logger: (m) => {
      // Log mesajlarını isteğe bağlı olarak göster
    }
  })

  try {
    let imageData: Buffer | string

    if (imagePath instanceof File) {
      const arrayBuffer = await imagePath.arrayBuffer()
      imageData = Buffer.from(arrayBuffer)
    } else if (typeof imagePath === 'string') {
      imageData = imagePath
    } else {
      imageData = imagePath
    }

    const { data: { text, confidence } } = await worker.recognize(imageData)

    return {
      text: text.trim(),
      confidence: confidence || 0
    }
  } finally {
    await worker.terminate()
  }
}







