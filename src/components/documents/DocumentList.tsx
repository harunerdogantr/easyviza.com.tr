'use client'

import { useState, useEffect } from 'react'
import { getApplicationDocuments, getDocumentUrlAction } from '@/lib/actions/document.actions'
import Link from 'next/link'

interface DocumentListProps {
  visaApplicationId: string
}

export function DocumentList({ visaApplicationId }: DocumentListProps) {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [urls, setUrls] = useState<Record<string, string>>({})

  useEffect(() => {
    loadDocuments()
  }, [visaApplicationId])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const docs = await getApplicationDocuments(visaApplicationId)
      setDocuments(docs)

      // Her document için presigned URL al
      const documentIds = docs.map((doc: any) => doc.id)
      const presignedUrls: Record<string, string> = {}
      
      for (const doc of docs) {
        const url = await getDocumentUrlAction(doc.id)
        if (url) {
          presignedUrls[doc.id] = url
        }
      }
      
      setUrls(presignedUrls)
    } catch (error) {
      console.error('Error loading documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return 'Bilinmiyor'
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getDocumentTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      passport: 'Pasaport',
      photo: 'Fotoğraf',
      bank_statement: 'Banka Dekontu',
      invitation: 'Davetiye',
      flight_ticket: 'Uçak Bileti',
      hotel_reservation: 'Otel Rezervasyonu'
    }
    return labels[type] || type
  }

  if (loading) {
    return <div className="text-center py-4">Yükleniyor...</div>
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Henüz döküman yüklenmedi
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Yüklenen Dökümanlar
      </h3>
      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {getDocumentTypeLabel(doc.type)}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {doc.name}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Boyut: {formatFileSize(doc.size)}</span>
                  <span>
                    Yüklenme: {new Date(doc.uploadedAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
              {urls[doc.id] && (
                <Link
                  href={urls[doc.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Görüntüle
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}







