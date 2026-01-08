'use server'

import { analyzeDocument, getAIReview, type AIReviewResult } from '@/services/ai-service'
import { revalidatePath } from 'next/cache'

export type AnalyzeDocumentActionResult = 
  | { success: true; review: AIReviewResult }
  | { success: false; error: string }

/**
 * Belge analizi Server Action
 */
export async function analyzeDocumentAction(
  documentId: string,
  visaApplicationId: string
): Promise<AnalyzeDocumentActionResult> {
  try {
    const result = await analyzeDocument(documentId, visaApplicationId)

    if (result.success) {
      // Cache'i yenile
      revalidatePath(`/applications/${visaApplicationId}`)
      revalidatePath('/applications')
    }

    return result
  } catch (error) {
    console.error('Analyze document action error:', error)
    return {
      success: false,
      error: 'Belge analiz edilirken bir hata oluştu'
    }
  }
}

/**
 * AI review'ı al (Server Action)
 */
export async function getAIReviewAction(
  visaApplicationId: string
): Promise<AIReviewResult | null> {
  try {
    return await getAIReview(visaApplicationId)
  } catch (error) {
    console.error('Get AI review action error:', error)
    return null
  }
}












