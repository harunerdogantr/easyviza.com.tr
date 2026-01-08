'use client'

import { useState } from 'react'
import { uploadDocumentAction } from '@/lib/actions/document.actions'

interface DocumentUploadProps {
  visaApplicationId: string
  documentType: string
  onUploadSuccess?: () => void
}

export function DocumentUpload({
  visaApplicationId,
  documentType,
  onUploadSuccess
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
      setSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Lütfen bir dosya seçin')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('visaApplicationId', visaApplicationId)
      formData.append('documentType', documentType)

      const result = await uploadDocumentAction(formData)

      if (result.success) {
        setSuccess(true)
        setFile(null)
        // Reset file input
        const fileInput = document.getElementById(`file-input-${documentType}`) as HTMLInputElement
        if (fileInput) fileInput.value = ''
        
        if (onUploadSuccess) {
          onUploadSuccess()
        }
      } else {
        setError(result.error || 'Dosya yüklenirken bir hata oluştu')
      }
    } catch (err) {
      setError('Dosya yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor={`file-input-${documentType}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {documentType === 'passport' && 'Pasaport'}
          {documentType === 'photo' && 'Fotoğraf'}
          {documentType === 'bank_statement' && 'Banka Dekontu'}
          {!['passport', 'photo', 'bank_statement'].includes(documentType) && 'Döküman'}
        </label>
        <input
          id={`file-input-${documentType}`}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
          disabled={loading}
        />
        {file && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Seçilen dosya: {file.name} ({formatFileSize(file.size)})
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Sadece PDF, JPG ve PNG dosyaları kabul edilir (Maks. 10MB)
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Dosya başarıyla yüklendi!
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Yükleniyor...' : 'Dosyayı Yükle'}
      </button>
    </div>
  )
}












