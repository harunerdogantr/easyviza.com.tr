'use server'

import { uploadDocument, getDocumentUrl, getDocumentUrls } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export type DocumentUploadResult = 
  | { success: true; documentId: string; url: string }
  | { success: false; error: string }

/**
 * Dosya yükleme Server Action
 */
export async function uploadDocumentAction(
  formData: FormData
): Promise<DocumentUploadResult> {
  try {
    const file = formData.get('file') as File
    const visaApplicationId = formData.get('visaApplicationId') as string
    const documentType = formData.get('documentType') as string

    if (!file) {
      return {
        success: false,
        error: 'Dosya seçilmedi'
      }
    }

    if (!visaApplicationId) {
      return {
        success: false,
        error: 'Vize başvurusu ID\'si gerekli'
      }
    }

    if (!documentType) {
      return {
        success: false,
        error: 'Döküman tipi gerekli'
      }
    }

    // Dosyayı yükle ve kaydet
    const result = await uploadDocument(file, visaApplicationId, documentType)

    if (result.success) {
      // Cache'i yenile
      revalidatePath(`/applications/${visaApplicationId}`)
      revalidatePath('/applications')
    }

    return result
  } catch (error) {
    console.error('Upload document action error:', error)
    return {
      success: false,
      error: 'Dosya yüklenirken bir hata oluştu'
    }
  }
}

/**
 * Document için presigned URL al (Server Action)
 */
export async function getDocumentUrlAction(documentId: string): Promise<string | null> {
  try {
    return await getDocumentUrl(documentId)
  } catch (error) {
    console.error('Get document URL action error:', error)
    return null
  }
}

/**
 * Birden fazla document için presigned URL'ler al
 */
export async function getDocumentUrlsAction(
  documentIds: string[]
): Promise<Record<string, string>> {
  try {
    return await getDocumentUrls(documentIds)
  } catch (error) {
    console.error('Get document URLs action error:', error)
    return {}
  }
}

/**
 * VisaApplication'a ait tüm document'leri al
 */
export async function getApplicationDocuments(visaApplicationId: string) {
  try {
    const documents = await prisma.document.findMany({
      where: {
        visaApplicationId
      },
      orderBy: {
        uploadedAt: 'desc'
      }
    })

    return documents
  } catch (error) {
    console.error('Get application documents error:', error)
    return []
  }
}

/**
 * Document'i sil
 */
export async function deleteDocumentAction(documentId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Document'i veritabanından sil
    // Not: S3'teki dosyayı da silmek isteyebilirsiniz, bu için ek bir fonksiyon gerekir
    await prisma.document.delete({
      where: { id: documentId }
    })

    revalidatePath('/applications')
    
    return { success: true }
  } catch (error) {
    console.error('Delete document error:', error)
    return {
      success: false,
      error: 'Döküman silinirken bir hata oluştu'
    }
  }
}











