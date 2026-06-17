import { NextRequest, NextResponse } from 'next/server'
import { getDocumentUrl } from '@/lib/s3'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
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

    // Belgenin sahibini doğrula (ADMIN her belgeye erişebilir)
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        visaApplication: {
          select: { userId: true }
        }
      }
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Document bulunamadı' },
        { status: 404 }
      )
    }

    const userRole = session.user.role
    const userId = session.user.id

    if (userRole !== 'ADMIN' && document.visaApplication.userId !== userId) {
      return NextResponse.json(
        { error: 'Bu belgeye erişim yetkiniz yok' },
        { status: 403 }
      )
    }

    const url = await getDocumentUrl(documentId)

    if (!url) {
      return NextResponse.json(
        { error: 'URL oluşturulamadı' },
        { status: 500 }
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












