# Google Gemini API ve Tesseract.js Entegrasyonu

Bu proje OpenAI yerine Google Gemini Flash modeli ve Tesseract.js OCR kullanır.

## Özellikler

✅ **Google Gemini Flash**: Hızlı ve ekonomik AI modeli
✅ **Tesseract.js OCR**: Görselden metin çıkarma
✅ **Pasaport Analizi**: Ad, soyad, geçerlilik tarihi çıkarma
✅ **Belge Analizi**: Vize belgelerini analiz etme
✅ **Çoklu Dil Desteği**: İngilizce ve Türkçe OCR

## Kurulum

### 1. Paketleri Yükleyin

```bash
npm install @google/generative-ai tesseract.js
```

### 2. Environment Variables

`.env` dosyasına şu değişkeni ekleyin:

```env
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Google Gemini API Key Alma

1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
2. API Key oluşturun
3. `.env` dosyasına ekleyin

## Kullanım

### Pasaport Analizi

```typescript
import { analyzePassport } from '@/lib/actions/passport.actions'

const file = // File objesi
const result = await analyzePassport(file)

if (result.success) {
  console.log('Ad:', result.data.firstName)
  console.log('Soyad:', result.data.lastName)
  console.log('Geçerlilik:', result.data.expiryDate)
  console.log('OCR Metni:', result.ocrText) // Opsiyonel
}
```

### OCR (Tesseract.js)

```typescript
import { performOCRFromFile, performOCRMultiLang } from '@/lib/actions/ocr.actions'

// Tek dil (İngilizce)
const result = await performOCRFromFile(file)

// Çoklu dil (İngilizce + Türkçe)
const result = await performOCRMultiLang(file, ['eng', 'tur'])

if (result.success) {
  console.log('Çıkarılan Metin:', result.text)
  console.log('Güven Skoru:', result.confidence)
}
```

### Belge Analizi (Gemini)

```typescript
import { analyzeDocument } from '@/services/ai-service'

const result = await analyzeDocument(documentId, visaApplicationId)

if (result.success) {
  console.log('AI Review:', result.review)
}
```

## Dosya Yapısı

```
src/
├── lib/
│   ├── ocr.ts                    # Tesseract.js OCR fonksiyonları
│   └── actions/
│       ├── passport.actions.ts   # Pasaport analizi (Gemini Flash)
│       └── ocr.actions.ts        # OCR Server Actions
└── services/
    └── ai-service.ts            # Belge analizi (Gemini Flash)
```

## Gemini Flash Model

- **Model**: `gemini-1.5-flash`
- **Hız**: Çok hızlı
- **Maliyet**: Düşük
- **Vision**: Evet (görüntü analizi)
- **JSON Mode**: Evet

## Tesseract.js OCR

- **Dil Desteği**: İngilizce (eng), Türkçe (tur) ve daha fazlası
- **Güven Skoru**: 0-100 arası
- **Worker**: Otomatik yönetim
- **Performans**: Client-side ve server-side destek

## OCR Kullanım Senaryoları

### 1. Pasaport Analizi
Pasaport yüklendiğinde hem Gemini hem de OCR çalışır:
- Gemini: Yapılandırılmış bilgi çıkarır
- OCR: Ham metin çıkarır (backup/doğrulama için)

### 2. Belge Doğrulama
OCR ile çıkarılan metin, Gemini'nin çıkardığı bilgileri doğrulamak için kullanılabilir.

### 3. Çoklu Dil Desteği
Türkçe ve İngilizce pasaportlar için:
```typescript
const result = await performOCRMultiLang(file, ['eng', 'tur'])
```

## Hata Yönetimi

- **API Key Hatası**: `GOOGLE_GEMINI_API_KEY` kontrol edin
- **Rate Limit**: Gemini API quota kontrolü
- **OCR Hatası**: OCR başarısız olsa bile Gemini analizi devam eder
- **JSON Parse**: Gemini cevabı otomatik temizlenir (markdown code block'lar)

## Maliyet

### Google Gemini Flash
- Çok ekonomik
- Ücretsiz tier mevcut
- [Fiyatlandırma](https://ai.google.dev/pricing)

### Tesseract.js
- Tamamen ücretsiz
- Open source
- Client-side veya server-side

## Performans

- **Gemini Flash**: ~1-3 saniye
- **OCR (Tesseract)**: ~2-5 saniye (görüntü boyutuna göre)
- **Toplam**: ~3-8 saniye (her ikisi birlikte)

## Örnek Kullanım

```typescript
'use server'

import { analyzePassport } from '@/lib/actions/passport.actions'

export async function handlePassportUpload(file: File) {
  const result = await analyzePassport(file)
  
  if (result.success) {
    // Gemini'den çıkarılan bilgiler
    const { firstName, lastName, expiryDate } = result.data!
    
    // OCR metni (opsiyonel - doğrulama için)
    const ocrText = result.ocrText
    
    return {
      firstName,
      lastName,
      expiryDate,
      ocrText
    }
  } else {
    throw new Error(result.error)
  }
}
```

## Geçiş Notları (OpenAI → Gemini)

- ✅ API key değişti: `OPENAI_API_KEY` → `GOOGLE_GEMINI_API_KEY`
- ✅ Model değişti: `gpt-4o` → `gemini-1.5-flash`
- ✅ Base64 image encoding kullanılıyor
- ✅ JSON response otomatik temizleniyor
- ✅ OCR desteği eklendi











