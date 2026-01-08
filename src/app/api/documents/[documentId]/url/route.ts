import { NextRequest, NextResponse } from 'next/server'
import { getDocumentUrl } from '@/lib/s3'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    // Kullanıcı authentication kontrolü
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { documentId } = params

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID gerekli' },
        { status: 400 }
      )
    }

    // Presigned URL al
    const url = await getDocumentUrl(documentId)

    if (!url) {
      return NextResponse.json(
        { error: 'Document bulunamadı veya URL oluşturulamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Get document URL API error:', error)
    return NextResponse.json(
      { error: 'URL oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}











