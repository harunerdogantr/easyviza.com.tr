import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { prisma } from './prisma'

// S3/R2 Client yapılandırması
const s3Client = new S3Client({
  region: process.env.R2_REGION || 'auto',
  endpoint: process.env.R2_ENDPOINT, // Cloudflare R2 endpoint
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!
const PRESIGNED_URL_EXPIRATION = 3600 // 1 saat (saniye cinsinden)

// İzin verilen dosya tipleri
const ALLOWED_MIME_TYPES = [
  'application/pdf', // PDF
  'image/jpeg', // JPG
  'image/jpg', // JPG
  'image/png', // PNG
]

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png']

// Maksimum dosya boyutu (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

export interface FileUploadResult {
  success: boolean
  documentId?: string
  error?: string
  url?: string
}

export interface FileValidationResult {
  valid: boolean
  error?: string
}

/**
 * Dosya validasyonu
 */
export function validateFile(file: File): FileValidationResult {
  // Dosya boyutu kontrolü
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'Dosya boyutu 10MB\'dan büyük olamaz'
    }
  }

  // MIME type kontrolü
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Sadece PDF, JPG ve PNG dosyaları yüklenebilir'
    }
  }

  // Dosya uzantısı kontrolü
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    return {
      valid: false,
      error: 'Geçersiz dosya uzantısı. Sadece .pdf, .jpg, .jpeg, .png uzantıları kabul edilir'
    }
  }

  return { valid: true }
}

/**
 * Dosyayı S3/R2'ye yükle (private)
 */
async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  // Benzersiz dosya adı oluştur (timestamp + random + original name)
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const fileExtension = fileName.substring(fileName.lastIndexOf('.'))
  const uniqueFileName = `${timestamp}-${randomString}${fileExtension}`

  // S3 key (path) oluştur
  const key = `documents/${uniqueFileName}`

  // PutObjectCommand oluştur
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: mimeType,
    // Private olarak ayarla (ACL yerine metadata kullan)
    Metadata: {
      'uploaded-at': new Date().toISOString(),
    },
  })

  // Dosyayı yükle
  await s3Client.send(command)

  // S3 key'i döndür (URL değil, çünkü private)
  return key
}

/**
 * Presigned URL oluştur (güvenli görüntüleme için)
 */
export async function getPresignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: PRESIGNED_URL_EXPIRATION,
  })

  return url
}

/**
 * Dosyayı yükle ve Document tablosuna kaydet
 */
export async function uploadDocument(
  file: File,
  visaApplicationId: string,
  documentType: string
): Promise<FileUploadResult> {
  try {
    // Dosya validasyonu
    const validation = validateFile(file)
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      }
    }

    // VisaApplication'ın var olduğunu kontrol et
    const visaApplication = await prisma.visaApplication.findUnique({
      where: { id: visaApplicationId }
    })

    if (!visaApplication) {
      return {
        success: false,
        error: 'Vize başvurusu bulunamadı'
      }
    }

    // Dosyayı Buffer'a dönüştür
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Dosyayı S3/R2'ye yükle
    const s3Key = await uploadFileToS3(buffer, file.name, file.type)

    // Document'i veritabanına kaydet
    const document = await prisma.document.create({
      data: {
        visaApplicationId,
        name: file.name,
        type: documentType,
        url: s3Key, // S3 key'i kaydet (full URL değil)
        mimeType: file.type,
        size: file.size,
      },
    })

    return {
      success: true,
      documentId: document.id,
      url: s3Key,
    }
  } catch (error) {
    console.error('File upload error:', error)
    return {
      success: false,
      error: 'Dosya yüklenirken bir hata oluştu'
    }
  }
}

/**
 * Document için presigned URL al
 */
export async function getDocumentUrl(documentId: string): Promise<string | null> {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return null
    }

    // S3 key'den presigned URL oluştur
    const presignedUrl = await getPresignedUrl(document.url)

    return presignedUrl
  } catch (error) {
    console.error('Get presigned URL error:', error)
    return null
  }
}

/**
 * Birden fazla document için presigned URL'ler al
 */
export async function getDocumentUrls(documentIds: string[]): Promise<Record<string, string>> {
  const urls: Record<string, string> = {}

  try {
    const documents = await prisma.document.findMany({
      where: {
        id: {
          in: documentIds
        }
      }
    })

    for (const document of documents) {
      try {
        const presignedUrl = await getPresignedUrl(document.url)
        urls[document.id] = presignedUrl
      } catch (error) {
        console.error(`Error getting URL for document ${document.id}:`, error)
      }
    }
  } catch (error) {
    console.error('Get document URLs error:', error)
  }

  return urls
}

