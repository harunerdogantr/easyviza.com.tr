import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Admin123!', 10)

  await prisma.user.upsert({
    where: { email: 'admin@easyviza.com.tr' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@easyviza.com.tr',
      name: 'Yönetici',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  const countries = [
    { name: 'Hollanda', code: 'NL', flag: '🇳🇱' },
    { name: 'Almanya',  code: 'DE', flag: '🇩🇪' },
    { name: 'Fransa',   code: 'FR', flag: '🇫🇷' },
    { name: 'İtalya',   code: 'IT', flag: '🇮🇹' },
    { name: 'İspanya',  code: 'ES', flag: '🇪🇸' },
    { name: 'Polonya',  code: 'PL', flag: '🇵🇱' },
    { name: 'Avusturya',code: 'AT', flag: '🇦🇹' },
    { name: 'Belçika',  code: 'BE', flag: '🇧🇪' },
    { name: 'İsviçre',  code: 'CH', flag: '🇨🇭' },
    { name: 'Türkiye',  code: 'TR', flag: '🇹🇷' },
  ]

  for (const c of countries) {
    const country = await prisma.country.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    })

    if (c.code !== 'TR') {
      await prisma.visaType.upsert({
        where: { name_countryId: { name: 'Schengen Turistik', countryId: country.id } },
        update: {},
        create: {
          name: 'Schengen Turistik',
          description: '90 güne kadar kısa süreli turistik vize.',
          countryId: country.id,
          duration: 90,
          price: 80.0,
        },
      })
    }
  }

  console.log('✅ Seed tamamlandı.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
