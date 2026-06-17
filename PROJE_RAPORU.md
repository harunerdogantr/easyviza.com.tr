# EasyViza Proje İnceleme Raporu (Güncellenmiş)

**Tarih:** 2026-06-17 — v2 (Tam Kaynak Kodu İncelemesi)
**Proje:** easyviza.com.tr — Vize başvuru ve belge yönetim platformu
**Teknoloji:** Next.js 14 (App Router), TypeScript, Prisma ORM, PostgreSQL (Neon), NextAuth.js, Tailwind CSS, Google Gemini, Cloudflare R2 / AWS S3, Tesseract.js

---

## Düzeltilmiş Sorunlar (v1 → v2)

Önceki raporu takiben aşağıdaki sorunlar giderilmiştir:

| # | Sorun | Durum |
|---|-------|-------|
| 1 | `.env` ↔ kod ortam değişkeni uyumsuzluğu | ✅ Düzeltildi |
| 2 | Admin detay sayfasındaki `fileName/fileType/fileSize` alan adları | ✅ Düzeltildi |
| 3 | `NEXTAUTH_SECRET` zayıf placeholder | ✅ Güçlü değerle değiştirildi |
| 4 | Belge URL ve upload API'lerinde ownership kontrolü eksikliği | ✅ Eklendi |
| 5 | Admin server action'larında yetki kontrolü yok | ✅ `requireAdmin()` eklendi |
| 6 | `/prisma/migrations` gitignore'da | ✅ Kaldırıldı |

---

## 1. 🔴 Kritik Sorunlar (Uygulamayı Bozan / Hatalı Çalışma)

### 1.1. Başvuru Oluşturma Sayfası Tamamen Çalışmaz — Eksik Server Action'lar

[dashboard/apply/page.tsx:6](src/app/dashboard/apply/page.tsx#L6) üç fonksiyon import ediyor:

```typescript
import { getCountries, getVisaTypesByCountry, createVisaApplication } from '@/lib/actions/application.actions'
```

Ancak bu üç fonksiyon [application.actions.ts](src/lib/actions/application.actions.ts) içinde **mevcut değil**. Dosyada yalnızca `updateApplicationStatus` ve `getAllApplications` var. Kullanıcı vize başvurusu oluşturmaya çalıştığında sayfa runtime hatasıyla çöker.

**Çözüm:** `getCountries`, `getVisaTypesByCountry`, `createVisaApplication` fonksiyonlarını `application.actions.ts`'e ekle.

### 1.2. Admin Dashboard Hiçbir Yetki Kontrolü Yapmıyor

[admin/page.tsx](src/app/admin/page.tsx) doğrudan `prisma.visaApplication.count()` ve `prisma.visaApplication.findMany()` çağrıları yapıyor, ancak **ne session ne de ADMIN rolü** kontrol ediyor. Herhangi bir kullanıcı (hatta oturum açmamış biri bile) `/admin` adresine gittiğinde tüm başvuru istatistiklerini görebilir.

Bunun yanı sıra [admin/layout.tsx:17-20](src/app/admin/layout.tsx#L17) içindeki admin rol kontrolü **yorum satırına** alınmış:

```typescript
// TODO: Admin role kontrolü eklenebilir
// if (session.user.role !== 'ADMIN') {
//   redirect('/dashboard')
// }
```

Yani layout sadece oturum açılmış olup olmadığını kontrol eder; ADMIN olmayan herhangi bir kullanıcı `/admin/*` rotalarına erişebilir.

### 1.3. Ödeme Sayfası Tamamen Sahte — Gerçek Entegrasyon Yok

[payment/page.tsx:76-84](src/app/payment/page.tsx#L76) içindeki ödeme işlemi:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
    router.push('/dashboard/apply')
  }, 2000)
}
```

2 saniye bekleyip `/dashboard/apply`'a yönlendiriyor. Hiçbir ödeme işlemi gerçekleşmiyor. İyzico, Stripe veya başka bir ödeme sağlayıcısı entegrasyonu **tamamen eksik**. Kullanıcılardan ücret tahsil etmek isteniyorsa bu kritik bir eksiktir.

### 1.4. `passport.actions.ts` — Dosyaları `public/uploads` Klasörüne Yazıyor

[passport.actions.ts:26-51](src/lib/actions/passport.actions.ts#L26) dosyaları sunucunun lokal `public/uploads` dizinine kaydediyor. Bu yöntem:

- **Vercel / serverless** dağıtımlarında tamamen çalışmaz (dosya sistemi sürekliliği yok).
- `public/` altındaki dosyalar **herkese açık URL** üzerinden erişilebilir — pasaport görseli hiçbir kimlik doğrulaması olmadan internet üzerinden erişilebilir olur.
- Ana yükleme akışı (S3/R2) ile çelişiyor; iki farklı depolama mekanizması var.

Buna ek olarak bu dosya kendi `fileToBase64` fonksiyonunu tanımlıyor; bu fonksiyon zaten [lib/gemini.ts](src/lib/gemini.ts) içinde mevcut.

---

## 2. 🟠 Güvenlik Sorunları

### 2.1. Server Action'larda Eksik Yetki Kontrolü

Aşağıdaki server action'larda session veya ownership kontrolü yok:

| Dosya | Fonksiyon | Risk |
|-------|-----------|------|
| [document.actions.ts:112](src/lib/actions/document.actions.ts#L112) | `deleteDocumentAction` | Herhangi biri başka kullanıcının belgesini silebilir |
| [document.actions.ts:91](src/lib/actions/document.actions.ts#L91) | `getApplicationDocuments` | Başka kullanıcının belgelerini listeleyebilir |
| [ai.actions.ts:13](src/lib/actions/ai.actions.ts#L13) | `analyzeDocumentAction` | Herhangi biri belge AI analizi tetikleyebilir |
| [ai.actions.ts:39](src/lib/actions/ai.actions.ts#L39) | `getAIReviewAction` | Herhangi biri AI inceleme sonucunu çekebilir |

### 2.2. TypeScript Tip Güvenliği Kaçırılıyor — `as any` Salgını

[next-auth.d.ts](src/types/next-auth.d.ts) Session tipine `role` ve tam anlamıyla `id` alanı eklemiyor. Bu yüzden proje genelinde:

```typescript
const userRole = (session.user as any)?.role
const userId = (session.user as any)?.id
```

gibi güvensiz `as any` cast'leri kullanılıyor. TypeScript'in rolü hatalı string içermesi halinde sessizce geçmesine neden olur.

### 2.3. `passport.actions.ts` Hata Mesajı Sızıntısı

```typescript
error: error?.message || 'Pasaport analiz edilirken bir hata oluştu'
```

İç hata mesajları (stack trace değil ama Gemini/sistem mesajları) istemciye iletiliyor. Genel mesaj tercih edilmeli.

### 2.4. Giriş Sayfasında Hatalı `<input type>` — E-posta Alanı `text` Tipi

[login/page.tsx:146](src/app/login/page.tsx#L146): `type="text"` kullanılmış, `type="email"` olmalıydı. Hem UX'i bozuyor hem tarayıcı e-posta doğrulamasını devre dışı bırakıyor.

---

## 3. 🟡 Fonksiyonel Eksiklikler (Tamamlanmamış Özellikler)

### 3.1. Çok Sayıda Kırık Navigasyon Linki

Uygulamada var olmayan sayfalara yapılan yönlendirmeler:

| Kaynak | Hedef | Sorun |
|--------|-------|-------|
| [dashboard/page.tsx:64](src/app/dashboard/page.tsx#L64) | `/dashboard/applications` | Sayfa yok |
| [dashboard/page.tsx:71](src/app/dashboard/page.tsx#L71) | `/dashboard/documents` | Sayfa yok |
| [dashboard/page.tsx:188](src/app/dashboard/page.tsx#L188) | `/dashboard/applications/${id}` | Sayfa yok |
| [login/page.tsx:166](src/app/login/page.tsx#L166) | `/forgot-password` | Sayfa yok |
| [payment/page.tsx:284](src/app/payment/page.tsx#L284) | `/terms` | Sayfa yok |
| [login/page.tsx:47,48](src/app/login/page.tsx#L47) | `/countries` | Sayfa var mı? |

Dashboard ana istatistik kartlarındaki tüm linkler kırık; kullanıcı tıkladığında 404 alır.

### 3.2. Dashboard `session.user.id` TypeScript Hatası

[dashboard/page.tsx:25](src/app/dashboard/page.tsx#L25):
```typescript
userId: session.user.id
```
`next-auth.d.ts`'de Session'a `id` eklenmemiş olduğundan bu satır TypeScript hatası üretiyor. Çalışma zamanında da `undefined` dönebilir, bu da tüm başvuruları çekememe anlamına gelir.

### 3.3. Blog İçeriği Statik/Placeholder

[page.tsx:480-508](src/app/page.tsx#L480) ve `/blog` rotası tamamen hardcoded veri kullanıyor. Veritabanı veya CMS entegrasyonu yok. Blog yazıları sadece ana sayfada card olarak görünüyor; `/blog/[slug]` route'u yok.

### 3.4. Ülke Kartları Statik — Veritabanı Kullanılmıyor

Ana sayfa ve countries listesi (page.tsx:510-621) 18 ülkeyi hardcode olarak tanımlıyor. Şemada `Country` ve `VisaType` modelleri var ve bunlar veritabanından çekilebilir; ancak UI bunları tamamen yok sayıyor.

### 3.5. `rawGeminiResponse` Production'da Görünür

[dashboard/apply/page.tsx:316-328](src/app/dashboard/apply/page.tsx#L316):
```tsx
<pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-40 text-slate-700">
  {rawGeminiResponse}
</pre>
```
Ham Gemini API cevabı (JSON dahil) kullanıcıya gösteriliyor. Bu bir geliştirme kalıntısı; production'da kaldırılmalı.

---

## 4. 🔵 Kod Kalitesi ve Teknik Borç

### 4.1. Pasaport Analizi 3 Farklı Yerde Yazılmış

Aynı işi (pasaport → Gemini → JSON) yapan 3 ayrı implementasyon:

| Dosya | Fonksiyon | Kullanımda mı? |
|-------|-----------|----------------|
| [passport.actions.ts](src/lib/actions/passport.actions.ts) | `analyzePassport` | Hayır (local filesystem, ESKİ) |
| [passport-gemini.actions.ts](src/lib/actions/passport-gemini.actions.ts) | `analyzePassportWithGemini` | Evet (apply sayfası) |
| [services/ai-service.ts](src/services/ai-service.ts) | `analyzeDocument` | Evet (API route) |

`passport.actions.ts` artık kullanılmıyor; temizlenmeli.

### 4.2. Kayıt Fonksiyonu İkiye Katlanmış

[auth.actions.ts](src/lib/actions/auth.actions.ts) içinde `registerUser` (FormData) ve `registerUserWithData` (plain object) bire bir aynı mantığı tekrar ediyor. Yalnızca `registerUserWithData` kullanılıyor; diğeri gereksiz.

### 4.3. Admin Layout — Yorum Satırına Alınmış Kritik Kontrol

[admin/layout.tsx:17-20](src/app/admin/layout.tsx#L17) içindeki TODO yorum satırı **kritik bir güvenlik kontrolünü** engelliyor. Bu satır sadece temizlik değil, güvenlik açığıdır (bkz. madde 1.2).

### 4.4. Site Metadata Eski

[layout.tsx:12-15](src/app/layout.tsx#L12):
```typescript
title: 'EasyViza - Authentication'
description: 'Authentication system with Next.js 14'
```
Development döneminden kalan metadata; SEO ve marka açısından güncellenmeli.

### 4.5. `package.json` Seed Betiği Yanlış Dosyaya İşaret Ediyor

[package.json:36](package.json#L36): `prisma/seed.ts` referansı var ama dosya adı `prisma/speed.ts` (yazım hatası). Seed çalışmaz.

### 4.6. Gemini Model Adı Güncel Değil

[ai-service.ts:69](src/services/ai-service.ts#L69) ve [gemini.ts:10](src/lib/gemini.ts#L10): `gemini-1.5-flash` kullanıyor. Bu model güncel Gemini sürümleriyle kıyaslandığında eski; `gemini-2.0-flash` veya `gemini-2.5-flash` gibi güncel modellere geçilmeli.

### 4.7. `next.config.js` Minimalist

[next.config.js](next.config.js) neredeyse boş. Image domains, güvenlik başlıkları (CSP, X-Frame-Options) gibi üretim konfigürasyonu eksik.

---

## 5. Öncelikli Eylem Listesi (Güncellenmiş)

| # | Öncelik | Eylem | Etki |
|---|---------|-------|------|
| 1 | 🔴 Kritik | `getCountries`, `getVisaTypesByCountry`, `createVisaApplication` fonksiyonlarını ekle | Başvuru akışı çalışır hale gelir |
| 2 | 🔴 Kritik | `/admin/page.tsx`'e session + ADMIN kontrolü ekle | Admin veri sızıntısı kapanır |
| 3 | 🔴 Kritik | `/admin/layout.tsx` yorum satırına alınmış ADMIN kontrolünü etkinleştir | Tüm admin panel korunur |
| 4 | 🔴 Kritik | Gerçek ödeme entegrasyonu yap (İyzico/Stripe) | Gelir akışı başlar |
| 5 | 🔴 Kritik | `passport.actions.ts` public/uploads yazımını kaldır veya S3'e taşı | Serverless çökmesi önlenir |
| 6 | 🟠 Güvenlik | `document.actions.ts` ve `ai.actions.ts` fonksiyonlarına auth+ownership kontrolü ekle | IDOR açığı kapatılır |
| 7 | 🟠 Güvenlik | `next-auth.d.ts`'e `role` ve `id` alanını ekle; tüm `as any` castlerini temizle | Tip güvenliği sağlanır |
| 8 | 🟠 Güvenlik | Login input tipini `text` → `email` düzelt | E-posta doğrulaması çalışır |
| 9 | 🟡 Fonksiyon | Eksik dashboard route'larını oluştur (`/applications`, `/documents`, `/applications/[id]`) | Dashboard kullanılabilir hale gelir |
| 10 | 🟡 Fonksiyon | `session.user.id` sorununu `next-auth.d.ts` ile çöz | Dashboard doğru verileri gösterir |
| 11 | 🟡 Fonksiyon | `rawGeminiResponse` debug UI'ını kaldır | Production temizliği |
| 12 | 🟡 Bakım | `passport.actions.ts` ve yinelenen `registerUser` fonksiyonunu sil | Kod yüzey alanı azalır |
| 13 | 🟡 Bakım | `prisma/speed.ts` → `prisma/seed.ts` olarak yeniden adlandır | Seed çalışır hale gelir |
| 14 | 🟡 Bakım | Site metadata'yı güncelle | SEO düzelir |
| 15 | 🔵 İyileştirme | Gemini modelini `gemini-1.5-flash` → `gemini-2.0-flash` veya daha yenisine yükselt | Daha iyi analiz kalitesi |
| 16 | 🔵 İyileştirme | `next.config.js`'e güvenlik başlıkları ekle | Temel güvenlik sertleştirmesi |

---

## 6. Proje Durumu Özeti

```
Toplam Kaynak Dosyası: ~40
Çalışan Özellikler:  Auth (login/register), Admin başvuru listesi/durum güncelleme
Kısmen Çalışan:      Dashboard görünümü, Belge yükleme (R2 config eksik)
Çalışmayan:          Başvuru oluşturma, Ödeme, Blog, Dashboard alt sayfaları
```

Proje, UI ve altyapı iskeleti açısından iyi bir başlangıç noktasına sahiptir. Ancak **kullanıcı açısından en kritik akış olan "vize başvurusu oluştur"** şu anda runtime hatası verir. Güvenlik ve fonksiyon açıkları kapatıldığında, temel bir MVP olarak yayına alınabilir.
