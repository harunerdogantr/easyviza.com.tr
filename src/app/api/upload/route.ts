import { NextRequest, NextResponse } from 'next/server'
import { uploadDocument } from '@/lib/s3'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Kullanıcı authentication kontrolü
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const visaApplicationId = formData.get('visaApplicationId') as string
    const documentType = formData.get('documentType') as string

    if (!file) {
      return NextResponse.json(
        { error: 'Dosya seçilmedi' },
        { status: 400 }
      )
    }

    if (!visaApplicationId) {
      return NextResponse.json(
        { error: 'Vize başvurusu ID\'si gerekli' },
        { status: 400 }
      )
    }

    if (!documentType) {
      return NextResponse.json(
        { error: 'Döküman tipi gerekli' },
        { status: 400 }
      )
    }

    // Dosyayı yükle ve kaydet
    const result = await uploadDocument(file, visaApplicationId, documentType)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        documentId: result.documentId,
        url: result.url
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Dosya yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}







