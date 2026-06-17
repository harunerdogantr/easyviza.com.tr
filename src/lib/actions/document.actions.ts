'use server'

import { uploadDocument, getDocumentUrl, getDocumentUrls } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Oturum açmanız gerekiyor')
  return session
}

export type DocumentUploadResult =
  | { success: true; documentId: string; url: string }
  | { success: false; error: string }

export async function uploadDocumentAction(
  formData: FormData
): Promise<DocumentUploadResult> {
  try {
    const session = await requireSession()

    const file = formData.get('file') as File
    const visaApplicationId = formData.get('visaApplicationId') as string
    const documentType = formData.get('documentType') as string

    if (!file) return { success: false, error: 'Dosya seçilmedi' }
    if (!visaApplicationId) return { success: false, error: 'Vize başvurusu ID\'si gerekli' }
    if (!documentType) return { success: false, error: 'Döküman tipi gerekli' }

    const application = await prisma.visaApplication.findUnique({
      where: { id: visaApplicationId },
      select: { userId: true }
    })

    if (!application) return { success: false, error: 'Vize başvurusu bulunamadı' }

    if (session.user.role !== 'ADMIN' && application.userId !== session.user.id) {
      return { success: false, error: 'Bu başvuruya belge yükleme yetkiniz yok' }
    }

    const result = await uploadDocument(file, visaApplicationId, documentType)

    if (result.success) {
      revalidatePath(`/dashboard/applications/${visaApplicationId}`)
    }

    return result as DocumentUploadResult
  } catch (error) {
    console.error('Upload document action error:', error)
    return { success: false, error: 'Dosya yüklenirken bir hata oluştu' }
  }
}

export async function getDocumentUrlAction(documentId: string): Promise<string | null> {
  try {
    const session = await requireSession()

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { visaApplication: { select: { userId: true } } }
    })

    if (!document) return null

    if (session.user.role !== 'ADMIN' && document.visaApplication.userId !== session.user.id) {
      return null
    }

    return await getDocumentUrl(documentId)
  } catch (error) {
    console.error('Get document URL action error:', error)
    return null
  }
}

export async function getDocumentUrlsAction(
  documentIds: string[]
): Promise<Record<string, string>> {
  try {
    await requireSession()
    return await getDocumentUrls(documentIds)
  } catch (error) {
    console.error('Get document URLs action error:', error)
    return {}
  }
}

export async function getApplicationDocuments(visaApplicationId: string) {
  try {
    const session = await requireSession()

    const application = await prisma.visaApplication.findUnique({
      where: { id: visaApplicationId },
      select: { userId: true }
    })

    if (!application) return []

    if (session.user.role !== 'ADMIN' && application.userId !== session.user.id) {
      return []
    }

    return await prisma.document.findMany({
      where: { visaApplicationId },
      orderBy: { uploadedAt: 'desc' }
    })
  } catch (error) {
    console.error('Get application documents error:', error)
    return []
  }
}

export async function deleteDocumentAction(
  documentId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await requireSession()

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { visaApplication: { select: { userId: true } } }
    })

    if (!document) return { success: false, error: 'Belge bulunamadı' }

    if (session.user.role !== 'ADMIN' && document.visaApplication.userId !== session.user.id) {
      return { success: false, error: 'Bu belgeyi silme yetkiniz yok' }
    }

    await prisma.document.delete({ where: { id: documentId } })
    revalidatePath('/dashboard/applications')
    return { success: true }
  } catch (error) {
    console.error('Delete document error:', error)
    return { success: false, error: 'Döküman silinirken bir hata oluştu' }
  }
}
