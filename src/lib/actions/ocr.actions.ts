'use server'

import { extractTextFromImage, extractTextFromImageMultiLang } from '@/lib/ocr'
import { readFile } from 'fs/promises'

export interface OCRResult {
  success: boolean
  text?: string
  confidence?: number
  error?: string
}

/**
 * Dosya yolundan OCR yap (Server Action)
 */
export async function performOCR(filePath: string): Promise<OCRResult> {
  try {
    const result = await extractTextFromImage(filePath)
    
    return {
      success: true,
      text: result.text,
      confidence: result.confidence
    }
  } catch (error: any) {
    console.error('OCR error:', error)
    return {
      success: false,
      error: error?.message || 'OCR işlemi sırasında bir hata oluştu'
    }
  }
}

/**
 * File objesinden OCR yap (Server Action)
 */
export async function performOCRFromFile(file: File): Promise<OCRResult> {
  try {
    const result = await extractTextFromImage(file)
    
    return {
      success: true,
      text: result.text,
      confidence: result.confidence
    }
  } catch (error: any) {
    console.error('OCR error:', error)
    return {
      success: false,
      error: error?.message || 'OCR işlemi sırasında bir hata oluştu'
    }
  }
}

/**
 * Çoklu dil desteği ile OCR yap
 */
export async function performOCRMultiLang(
  file: File,
  languages: string[] = ['eng', 'tur']
): Promise<OCRResult> {
  try {
    const result = await extractTextFromImageMultiLang(file, languages)
    
    return {
      success: true,
      text: result.text,
      confidence: result.confidence
    }
  } catch (error: any) {
    console.error('OCR error:', error)
    return {
      success: false,
      error: error?.message || 'OCR işlemi sırasında bir hata oluştu'
    }
  }
}











