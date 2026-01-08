# AI Entegrasyonu (Google Gemini)

Bu proje Google Gemini Flash modeli kullanarak belge analizi yapar.

**Not**: Bu proje artık Google Gemini Flash kullanıyor. OpenAI yerine Gemini tercih edilmiştir.

## Özellikler

✅ **GPT-4o Vision**: Görüntü analizi için GPT-4o modeli
✅ **Belge Analizi**: Pasaport, fotoğraf vb. belgeleri analiz eder
✅ **Kişisel Bilgi Çıkarma**: Ad, soyad, pasaport no, geçerlilik tarihi vb.
✅ **Kalite Kontrolü**: Belgenin geçerli olup olmadığını ve bulanık olup olmadığını kontrol eder
✅ **JSON Format**: Yapılandırılmış JSON çıktı
✅ **Otomatik Kayıt**: Analiz sonucu VisaApplication'a kaydedilir

## Kurulum

### 1. Paketleri Yükleyin

```bash
npm install openai
```

### 2. Environment Variables

`.env` dosyasına şu değişkeni ekleyin:

```env
OPENAI_API_KEY="sk-your-openai-api-key"
```

### 3. Prisma Migration

Schema'ya `aiReview` alanı eklendi. Migration çalıştırın:

```bash
npm run prisma:migrate
npm run prisma:generate
```

## Kullanım

### Server Action ile Analiz

```typescript
import { analyzeDocumentAction } from '@/lib/actions/ai.actions'

const result = await analyzeDocumentAction(documentId, visaApplicationId)

if (result.success) {
  console.log('Analiz sonucu:', result.review)
  console.log('Geçerli mi:', result.review.isValid)
  console.log('Bulanık mı:', result.review.isBlurry)
  console.log('Kişisel bilgiler:', result.review.personalInfo)
} else {
  console.error('Hata:', result.error)
}
```

### API Route ile Analiz

```typescript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    documentId: 'doc-id',
    visaApplicationId: 'app-id'
  })
})

const data = await response.json()
```

### AI Review'ı Alma

```typescript
import { getAIReviewAction } from '@/lib/actions/ai.actions'

const review = await getAIReviewAction(visaApplicationId)

if (review) {
  console.log('AI Review:', review)
}
```

## AI Review Yapısı

```typescript
interface AIReviewResult {
  isValid: boolean              // Belge geçerli mi?
  isBlurry: boolean             // Belge bulanık mı?
  personalInfo: {
    firstName?: string          // Ad
    lastName?: string           // Soyad
    passportNumber?: string     // Pasaport numarası
    expiryDate?: string         // Geçerlilik tarihi (YYYY-MM-DD)
    dateOfBirth?: string        // Doğum tarihi (YYYY-MM-DD)
    nationality?: string        // Uyruk
  }
  issues: string[]              // Tespit edilen sorunlar
  recommendations: string[]     // Öneriler
  confidence: number            // Güven skoru (0-100)
}
```

## Örnek Kullanım (React Component)

```typescript
'use client'

import { useState } from 'react'
import { analyzeDocumentAction } from '@/lib/actions/ai.actions'

export function AnalyzeDocumentButton({ 
  documentId, 
  visaApplicationId 
}: { 
  documentId: string
  visaApplicationId: string 
}) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await analyzeDocumentAction(documentId, visaApplicationId)
      
      if (response.success) {
        setResult(response.review)
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
    <div>
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Analiz ediliyor...' : 'Belgeyi Analiz Et'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-4">
          <h3>Analiz Sonucu</h3>
          <p>Geçerli: {result.isValid ? 'Evet' : 'Hayır'}</p>
          <p>Bulanık: {result.isBlurry ? 'Evet' : 'Hayır'}</p>
          <p>Güven Skoru: {result.confidence}%</p>
          {result.personalInfo.firstName && (
            <p>Ad: {result.personalInfo.firstName} {result.personalInfo.lastName}</p>
          )}
        </div>
      )}
    </div>
  )
}
```

## Model Detayları

- **Model**: GPT-4o
- **Vision**: Evet (görüntü analizi)
- **Max Tokens**: 2000
- **Temperature**: 0.3 (tutarlı sonuçlar için)
- **Response Format**: JSON Object

## Hata Yönetimi

- **401**: OpenAI API anahtarı geçersiz
- **429**: Rate limit aşıldı
- **Parse Error**: AI cevabı JSON formatında değil
- **Invalid Format**: AI cevabı beklenen formatta değil

## Maliyet

GPT-4o vision modeli kullanımı ücretlidir. OpenAI pricing sayfasından güncel fiyatları kontrol edin:
https://openai.com/pricing

## Güvenlik

- ✅ API anahtarı environment variable'da saklanır
- ✅ Authentication kontrolü (sadece giriş yapmış kullanıcılar)
- ✅ Presigned URL'ler kullanılır (güvenli dosya erişimi)
- ✅ Rate limiting önerilir (production için)

