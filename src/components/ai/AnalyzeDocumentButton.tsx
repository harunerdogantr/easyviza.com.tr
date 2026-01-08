'use client'

import { useState } from 'react'
import { analyzeDocumentAction } from '@/lib/actions/ai.actions'
import type { AIReviewResult } from '@/services/ai-service'

interface AnalyzeDocumentButtonProps {
  documentId: string
  visaApplicationId: string
  onAnalysisComplete?: (review: AIReviewResult) => void
}

export function AnalyzeDocumentButton({
  documentId,
  visaApplicationId,
  onAnalysisComplete
}: AnalyzeDocumentButtonProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIReviewResult | null>(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await analyzeDocumentAction(documentId, visaApplicationId)
      
      if (response.success) {
        setResult(response.review)
        if (onAnalysisComplete) {
          onAnalysisComplete(response.review)
        }
      } else {
        setError(response.error)
      }
    } catch (err) {
      setError('Analiz sırasında bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>AI Analiz Ediyor...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Belgeyi AI ile Analiz Et</span>
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Analiz Sonucu
          </h3>

          {/* Durum Göstergeleri */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg ${result.isValid ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Geçerlilik</p>
              <p className={`text-lg font-bold ${result.isValid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {result.isValid ? '✓ Geçerli' : '✗ Geçersiz'}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${!result.isBlurry ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Netlik</p>
              <p className={`text-lg font-bold ${!result.isBlurry ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                {!result.isBlurry ? '✓ Net' : '⚠ Bulanık'}
              </p>
            </div>
          </div>

          {/* Güven Skoru */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Güven Skoru</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                {result.confidence}%
              </span>
            </div>
          </div>

          {/* Kişisel Bilgiler */}
          {Object.values(result.personalInfo).some(v => v) && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Çıkarılan Bilgiler</h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
                {result.personalInfo.firstName && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Ad:</span>{' '}
                    <span className="text-gray-900 dark:text-white">{result.personalInfo.firstName}</span>
                  </p>
                )}
                {result.personalInfo.lastName && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Soyad:</span>{' '}
                    <span className="text-gray-900 dark:text-white">{result.personalInfo.lastName}</span>
                  </p>
                )}
                {result.personalInfo.passportNumber && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Pasaport No:</span>{' '}
                    <span className="text-gray-900 dark:text-white">{result.personalInfo.passportNumber}</span>
                  </p>
                )}
                {result.personalInfo.expiryDate && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Geçerlilik Tarihi:</span>{' '}
                    <span className="text-gray-900 dark:text-white">{result.personalInfo.expiryDate}</span>
                  </p>
                )}
                {result.personalInfo.dateOfBirth && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Doğum Tarihi:</span>{' '}
                    <span className="text-gray-900 dark:text-white">{result.personalInfo.dateOfBirth}</span>
                  </p>
                )}
                {result.personalInfo.nationality && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Uyruk:</span>{' '}
                    <span className="text-gray-900 dark:text-white">{result.personalInfo.nationality}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Sorunlar */}
          {result.issues && result.issues.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-red-700 dark:text-red-300">Tespit Edilen Sorunlar</h4>
              <ul className="list-disc list-inside space-y-1 bg-red-50 dark:bg-red-900 rounded-lg p-4">
                {result.issues.map((issue, index) => (
                  <li key={index} className="text-sm text-red-700 dark:text-red-300">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Öneriler */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Öneriler</h4>
              <ul className="list-disc list-inside space-y-1 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-700 dark:text-blue-300">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}







