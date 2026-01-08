# NextAuth.js Authentication Sistemi

Bu proje NextAuth.js kullanarak JWT tabanlı kimlik doğrulama sistemi içerir.

## Yapılandırma

### 1. NextAuth.js Yapılandırması (`src/lib/auth.ts`)

- **Prisma Adapter**: Veritabanı bağlantısı için Prisma adapter kullanılır
- **JWT Stratejisi**: Session yönetimi için JWT kullanılır
- **Credentials Provider**: Email/şifre ile giriş yapılır
- **bcrypt**: Şifreler bcrypt ile hash'lenir ve doğrulanır

### 2. API Route (`src/app/api/auth/[...nextauth]/route.ts`)

NextAuth.js API endpoint'i. Tüm authentication işlemleri bu route üzerinden yapılır:
- `/api/auth/signin` - Giriş
- `/api/auth/signout` - Çıkış
- `/api/auth/session` - Session bilgisi

### 3. Server Actions (`src/lib/actions/auth.actions.ts`)

#### `registerUser(formData: FormData)`
FormData ile kullanıcı kaydı yapar.

```typescript
const formData = new FormData()
formData.append('email', 'user@example.com')
formData.append('password', 'password123')
formData.append('name', 'John Doe')

const result = await registerUser(formData)
```

#### `registerUserWithData(data: { email, password, name? })`
JSON data ile kullanıcı kaydı yapar.

```typescript
const result = await registerUserWithData({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe'
})

if (result.success) {
  console.log('Kullanıcı oluşturuldu:', result.user)
} else {
  console.error('Hata:', result.error)
}
```

## Özellikler

✅ **Prisma Adapter**: Veritabanı işlemleri için Prisma kullanılır
✅ **JWT Stratejisi**: Stateless authentication
✅ **bcrypt Hashleme**: Şifreler güvenli şekilde hash'lenir (10 rounds)
✅ **Zod Validation**: Form validasyonu için Zod kullanılır
✅ **TypeScript**: Tam type safety
✅ **Server Actions**: Next.js 14 Server Actions kullanılır

## Kullanım

### Register (Kayıt)

```typescript
import { registerUserWithData } from '@/lib/actions/auth.actions'

const result = await registerUserWithData({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe'
})
```

### Login (Giriş)

```typescript
import { signIn } from 'next-auth/react'

await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirect: false
})
```

### Session Kontrolü

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const session = await getServerSession(authOptions)

if (session) {
  console.log('Kullanıcı:', session.user)
}
```

## Güvenlik

- Şifreler bcrypt ile hash'lenir (10 rounds)
- JWT token'lar güvenli şekilde saklanır
- SQL injection koruması (Prisma)
- XSS koruması (Next.js built-in)
- CSRF koruması (NextAuth.js built-in)

## Environment Variables

`.env` dosyasında şu değişkenler olmalı:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```



