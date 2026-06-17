'use server'

import { analyzeDocument, getAIReview, type AIReviewResult } from '@/services/ai-service'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Oturum açmanız gerekiyor')
  return session
}

export type AnalyzeDocumentActionResult =
  | { success: true; review: AIReviewResult }
  | { success: false; error: string }

export async function analyzeDocumentAction(
  documentId: string,
  visaApplicationId: string
): Promise<AnalyzeDocumentActionResult> {
  try {
    const session = await requireSession()

    const application = await prisma.visaApplication.findUnique({
      where: { id: visaApplicationId },
      select: { userId: true }
    })

    if (!application) return { success: false, error: 'Başvuru bulunamadı' }

    if (session.user.role !== 'ADMIN' && application.userId !== session.user.id) {
      return { success: false, error: 'Bu belgeyi analiz etme yetkiniz yok' }
    }

    const result = await analyzeDocument(documentId, visaApplicationId)

    if (result.success) {
      revalidatePath(`/dashboard/applications/${visaApplicationId}`)
    }

    return result as AnalyzeDocumentActionResult
  } catch (error) {
    console.error('Analyze document action error:', error)
    return { success: false, error: 'Belge analiz edilirken bir hata oluştu' }
  }
}

export async function getAIReviewAction(
  visaApplicationId: string
): Promise<AIReviewResult | null> {
  try {
    const session = await requireSession()

    const application = await prisma.visaApplication.findUnique({
      where: { id: visaApplicationId },
      select: { userId: true }
    })

    if (!application) return null

    if (session.user.role !== 'ADMIN' && application.userId !== session.user.id) {
      return null
    }

    return await getAIReview(visaApplicationId)
  } catch (error) {
    console.error('Get AI review action error:', error)
    return null
  }
}
