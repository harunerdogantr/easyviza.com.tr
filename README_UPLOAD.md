# Dosya Yükleme Sistemi (Cloudflare R2)

Bu proje Cloudflare R2 (S3 uyumlu) kullanarak güvenli dosya yükleme sistemi içerir.

## Özellikler

✅ **Cloudflare R2**: S3 uyumlu object storage
✅ **Private Upload**: Dosyalar private olarak yüklenir
✅ **Presigned URLs**: Güvenli görüntüleme için presigned URL'ler
✅ **File Validation**: Sadece PDF, JPG, PNG dosyaları kabul edilir
✅ **Size Limit**: Maksimum 10MB dosya boyutu
✅ **Type Safety**: Tam TypeScript desteği

## Kurulum

### 1. Paketleri Yükleyin

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### 2. Environment Variables

`.env` dosyasına şu değişkenleri ekleyin:

```env
# Cloudflare R2
R2_ACCOUNT_ID="your-r2-account-id"
R2_ACCESS_KEY_ID="your-r2-access-key-id"
R2_SECRET_ACCESS_KEY="your-r2-secret-access-key"
R2_BUCKET_NAME="your-bucket-name"
R2_ENDPOINT="https://your-account-id.r2.cloudflarestorage.com"
R2_REGION="auto"
```

### 3. Cloudflare R2 Bucket Oluşturma

1. Cloudflare Dashboard'a giriş yapın
2. R2 → Create bucket
3. Bucket adını girin
4. Access Key ve Secret Key oluşturun
5. Endpoint URL'ini alın

## Kullanım

### Server Action ile Yükleme

```typescript
import { uploadDocumentAction } from '@/lib/actions/document.actions'

const formData = new FormData()
formData.append('file', file)
formData.append('visaApplicationId', 'app-id')
formData.append('documentType', 'passport')

const result = await uploadDocumentAction(formData)

if (result.success) {
  console.log('Dosya yüklendi:', result.documentId)
} else {
  console.error('Hata:', result.error)
}
```

### API Route ile Yükleme

```typescript
const formData = new FormData()
formData.append('file', file)
formData.append('visaApplicationId', 'app-id')
formData.append('documentType', 'passport')

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

const data = await response.json()
```

### Presigned URL ile Görüntüleme

```typescript
import { getDocumentUrlAction } from '@/lib/actions/document.actions'

// Tek bir document için
const url = await getDocumentUrlAction('document-id')

// Birden fazla document için
import { getDocumentUrlsAction } from '@/lib/actions/document.actions'

const urls = await getDocumentUrlsAction(['doc-id-1', 'doc-id-2'])
```

### API Route ile Presigned URL

```typescript
const response = await fetch(`/api/documents/${documentId}/url`)
const { url } = await response.json()
```

## Dosya Tipleri

İzin verilen dosya tipleri:
- **PDF**: `application/pdf`
- **JPG**: `image/jpeg`, `image/jpg`
- **PNG**: `image/png`

Maksimum dosya boyutu: **10MB**

## Güvenlik

- ✅ Dosyalar **private** olarak yüklenir
- ✅ **Presigned URLs** ile güvenli erişim (1 saat geçerli)
- ✅ File validation (tip ve boyut kontrolü)
- ✅ Authentication kontrolü (sadece giriş yapmış kullanıcılar)
- ✅ VisaApplication sahiplik kontrolü

## Dosya Yapısı

```
src/
├── lib/
│   ├── s3.ts                    # S3/R2 işlemleri
│   └── actions/
│       └── document.actions.ts # Server Actions
└── app/
    └── api/
        ├── upload/
        │   └── route.ts         # Upload API
        └── documents/
            └── [documentId]/
                └── url/
                    └── route.ts # Presigned URL API
```

## Fonksiyonlar

### `uploadDocument(file, visaApplicationId, documentType)`
Dosyayı S3/R2'ye yükler ve Document tablosuna kaydeder.

### `getPresignedUrl(key)`
S3 key için presigned URL oluşturur (1 saat geçerli).

### `getDocumentUrl(documentId)`
Document ID için presigned URL alır.

### `validateFile(file)`
Dosya tipi ve boyutunu kontrol eder.

## Örnek Kullanım (React Component)

```typescript
'use client'

import { useState } from 'react'
import { uploadDocumentAction } from '@/lib/actions/document.actions'

export function DocumentUpload({ visaApplicationId }: { visaApplicationId: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('visaApplicationId', visaApplicationId)
    formData.append('documentType', 'passport')

    const result = await uploadDocumentAction(formData)

    if (result.success) {
      alert('Dosya başarıyla yüklendi!')
      setFile(null)
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? 'Yükleniyor...' : 'Yükle'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
```



