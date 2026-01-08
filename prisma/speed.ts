import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // 1. Şifreyi hazırla
  const hashedPassword = await bcrypt.hash('Admin123!', 10)

  // 2. Admin Kullanıcısını Oluştur
  const admin = await prisma.user.upsert({
    where: { email: 'admin@easyvize.com.tr' },
    update: {},
    create: {
      email: 'admin@easyvize.com.tr',
      name: 'Admin Kullanıcı',
      password: 123456,
      role: 'ADMIN',
    },
  })

  // 3. Örnek Ülke Ekle
  const germany = await prisma.country.upsert({
    where: { code: 'DE' },
    update: {},
    create: {
      name: 'Almanya',
      code: 'DE',
      flag: '🇩🇪',
    },
  })

  // 4. Örnek Vize Türü Ekle
  await prisma.visaType.upsert({
    where: { 
        name_countryId: { name: 'Schengen Turistik', countryId: germany.id } 
    },
    update: {},
    create: {
      name: 'Schengen Turistik',
      description: '90 güne kadar konaklama sağlayan turistik vize.',
      countryId: germany.id,
      duration: 90,
      price: 80.0,
    },
  })

  console.log('Seed verileri başarıyla yüklendi: Admin ve Örnek Veriler hazır!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })






import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Şifreyi burada kod üretsin, böylece tam uyumlu olur
  const passwordToHash = "123456" 
  const hashedPassword = await bcrypt.hash(passwordToHash, 10)

  await prisma.user.upsert({
    where: { email: 'admin@easyvize.com.tr' },
    update: { password: hashedPassword }, // Mevcutsa şifreyi güncelle
    create: {
      email: 'admin@easyvize.com.tr',
      name: 'Yönetici',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log(`✅ Admin güncellendi. Şifre: ${passwordToHash}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())