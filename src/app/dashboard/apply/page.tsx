'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCountries, getVisaTypesByCountry, createVisaApplication } from '@/lib/actions/application.actions'
import { analyzePassportWithGemini } from '@/lib/actions/passport-gemini.actions'
import Link from 'next/link'

export default function ApplyPage() {
  const router = useRouter()
  const [countries, setCountries] = useState<any[]>([])
  const [visaTypes, setVisaTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [passportFile, setPassportFile] = useState<File | null>(null)
  const [passportData, setPassportData] = useState<{
    ad?: string
    soyad?: string
    pasaportNumarasi?: string
    ulke?: string
  } | null>(null)
  const [rawGeminiResponse, setRawGeminiResponse] = useState<string>('')

  const [formData, setFormData] = useState({
    destinationCountryId: '',
    visaTypeId: '',
    originCountryId: '',
    travelDate: '',
    returnDate: '',
    purpose: ''
  })

  // Ülkeleri yükle
  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getCountries()
        setCountries(data)
      } catch (err) {
        setError('Ülkeler yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }
    loadCountries()
  }, [])

  // Hedef ülke değiştiğinde vize tiplerini yükle
  useEffect(() => {
    async function loadVisaTypes() {
      if (!formData.destinationCountryId) {
        setVisaTypes([])
        return
      }

      try {
        const data = await getVisaTypesByCountry(formData.destinationCountryId)
        setVisaTypes(data)
        // Vize tipini sıfırla
        setFormData(prev => ({ ...prev, visaTypeId: '' }))
      } catch (err) {
        setError('Vize tipleri yüklenirken bir hata oluştu')
      }
    }
    loadVisaTypes()
  }, [formData.destinationCountryId])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Dosya validasyonu
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setError('Sadece JPG, PNG ve PDF dosyaları kabul edilir')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Dosya boyutu 10MB\'dan büyük olamaz')
      return
    }

    setPassportFile(file)
    setError('')
    setPassportData(null)
    setRawGeminiResponse('')

    // Dosya yüklendiği anda AI analizini başlat
    setAnalyzing(true)
    try {
      const result = await analyzePassportWithGemini(file)
      
      if (result.success && result.data) {
        setPassportData(result.data)
        if (result.rawResponse) {
          setRawGeminiResponse(result.rawResponse)
        }
      } else {
        setError(result.error || 'Pasaport analiz edilemedi')
        if (result.rawResponse) {
          setRawGeminiResponse(result.rawResponse)
        }
      }
    } catch (err) {
      setError('Pasaport analiz edilirken bir hata oluştu')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validasyon
    if (!formData.destinationCountryId || !formData.visaTypeId || !formData.originCountryId) {
      setError('Lütfen tüm zorunlu alanları doldurun')
      return
    }

    if (!passportFile) {
      setError('Lütfen pasaportunuzu yükleyin')
      return
    }

    setLoading(true)

    try {
      // Vize başvurusu oluştur
      const result = await createVisaApplication({
        visaTypeId: formData.visaTypeId,
        originCountryId: formData.originCountryId,
        destinationCountryId: formData.destinationCountryId,
        travelDate: formData.travelDate ? new Date(formData.travelDate) : undefined,
        returnDate: formData.returnDate ? new Date(formData.returnDate) : undefined,
        purpose: formData.purpose || undefined
      })

      if (result.success) {
        // Başarılı, başvuru detay sayfasına yönlendir
        router.push(`/dashboard/applications/${result.application.id}`)
      } else {
        setError(result.error || 'Başvuru oluşturulurken bir hata oluştu')
      }
    } catch (err) {
      setError('Başvuru oluşturulurken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (loading && countries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Vize Başvurusu
            </h1>
            <p className="text-slate-600">
              Yeni bir vize başvurusu oluşturun
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hedef Ülke */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hedef Ülke <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.destinationCountryId}
                onChange={(e) => setFormData(prev => ({ ...prev, destinationCountryId: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800"
              >
                <option value="">Ülke seçin</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Vize Tipi */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Vize Tipi <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.visaTypeId}
                onChange={(e) => setFormData(prev => ({ ...prev, visaTypeId: e.target.value }))}
                required
                disabled={!formData.destinationCountryId || visaTypes.length === 0}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800 disabled:opacity-50"
              >
                <option value="">
                  {!formData.destinationCountryId 
                    ? 'Önce ülke seçin' 
                    : visaTypes.length === 0 
                    ? 'Vize tipi bulunamadı' 
                    : 'Vize tipi seçin'}
                </option>
                {visaTypes.map((visaType) => (
                  <option key={visaType.id} value={visaType.id}>
                    {visaType.name} {visaType.duration && `(${visaType.duration} gün)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Çıkış Ülkesi */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Çıkış Ülkesi <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.originCountryId}
                onChange={(e) => setFormData(prev => ({ ...prev, originCountryId: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800"
              >
                <option value="">Ülke seçin</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pasaport Yükleme */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pasaportunuzu Yükleyin <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-xs text-slate-500">
                Sadece PDF, JPG ve PNG dosyaları kabul edilir (Maks. 10MB)
              </p>

              {/* AI Analiz Loader */}
              {analyzing && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-blue-700 font-medium">
                      AI Pasaport Analiz Ediyor...
                    </span>
                  </div>
                </div>
              )}

              {/* Pasaport Bilgileri */}
              {passportData && !analyzing && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-3">
                      ✓ Pasaport Bilgileri Çıkarıldı
                    </h3>
                    <div className="space-y-2 text-sm">
                      {passportData.ad && (
                        <p>
                          <span className="font-medium text-green-700">Ad:</span>{' '}
                          <span className="text-green-900">{passportData.ad}</span>
                        </p>
                      )}
                      {passportData.soyad && (
                        <p>
                          <span className="font-medium text-green-700">Soyad:</span>{' '}
                          <span className="text-green-900">{passportData.soyad}</span>
                        </p>
                      )}
                      {passportData.pasaportNumarasi && (
                        <p>
                          <span className="font-medium text-green-700">Pasaport Numarası:</span>{' '}
                          <span className="text-green-900">{passportData.pasaportNumarasi}</span>
                        </p>
                      )}
                      {passportData.ulke && (
                        <p>
                          <span className="font-medium text-green-700">Ülke:</span>{' '}
                          <span className="text-green-900">{passportData.ulke}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Raw Gemini Response */}
                  {rawGeminiResponse && (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2 text-sm">
                        Gemini Ham Cevabı:
                      </h4>
                      <pre className="text-xs bg-white p-3 rounded border border-slate-200 overflow-auto max-h-40 text-slate-700">
                        {rawGeminiResponse}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Seyahat Tarihleri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gidiş Tarihi
                </label>
                <input
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dönüş Tarihi
                </label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, returnDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800"
                />
              </div>
            </div>

            {/* Seyahat Amacı */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Seyahat Amacı
              </label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800"
                placeholder="Seyahat amacınızı açıklayın..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || analyzing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                {loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
              >
                İptal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

