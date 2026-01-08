import { NextRequest, NextResponse } from 'next/server'
import { analyzeDocument } from '@/services/ai-service'
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

    const body = await request.json()
    const { documentId, visaApplicationId } = body

    if (!documentId || !visaApplicationId) {
      return NextResponse.json(
        { error: 'Document ID ve Visa Application ID gerekli' },
        { status: 400 }
      )
    }

    // Belgeyi analiz et
    const result = await analyzeDocument(documentId, visaApplicationId)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        review: result.review
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Analyze API error:', error)
    return NextResponse.json(
      { error: 'Belge analiz edilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}











