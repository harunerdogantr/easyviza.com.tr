# EasyViza Authentication System

Next.js 14 (App Router) kullanılarak oluşturulmuş authentication sistemi.

## Özellikler

- ✅ Next.js 14 App Router
- ✅ TypeScript
- ✅ Prisma ORM
- ✅ NextAuth.js (JWT)
- ✅ bcrypt ile şifre hashleme
- ✅ Register ve Login sayfaları
- ✅ Form validasyonu (Zod)
- ✅ Modern ve responsive UI

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Veritabanı bağlantısını yapılandırın:
`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/easyviza_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
```

3. Prisma migration'larını çalıştırın:
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Development server'ı başlatın:
```bash
npm run dev
```

## Kullanım

- **Kayıt Ol**: `/register` sayfasından yeni kullanıcı oluşturabilirsiniz
- **Giriş Yap**: `/login` sayfasından giriş yapabilirsiniz
- **Ana Sayfa**: Giriş yaptıktan sonra ana sayfada kullanıcı bilgilerinizi görebilirsiniz

## Proje Yapısı

```
src/
├── app/              # Next.js App Router sayfaları ve route'ları
│   ├── api/          # API route'ları
│   ├── login/        # Login sayfası
│   ├── register/     # Register sayfası
│   └── ...
├── components/       # Reusable React component'ler
│   └── ui/           # UI component'ler
├── lib/              # Utility fonksiyonlar ve yapılandırmalar
├── services/         # Business logic ve API servisleri
└── types/            # TypeScript type tanımlamaları
```

## Teknolojiler

- **Next.js 14**: React framework (App Router)
- **TypeScript**: Type safety
- **Prisma**: Database ORM
- **NextAuth.js**: Authentication
- **bcrypt**: Password hashing
- **Zod**: Schema validation
- **Tailwind CSS**: Styling

## Veritabanı Şeması

- `User`: Kullanıcı bilgileri (email, password, name)
- `Account`: OAuth hesapları (NextAuth için)
- `Session`: Oturum bilgileri (NextAuth için)
- `VerificationToken`: Email doğrulama tokenları (NextAuth için)

## Güvenlik

- Şifreler bcrypt ile hashlenir (10 rounds)
- JWT token tabanlı session yönetimi
- Form validasyonu ile güvenli veri girişi
- SQL injection koruması (Prisma)

