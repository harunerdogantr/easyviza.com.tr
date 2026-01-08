const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@easyviza.com.tr' },
    update: { 
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Yönetici'
    },
    create: {
      email: 'admin@easyviza.com.tr',
      name: 'Yönetici',
      password: hashedPassword,
      role: 'ADMIN',    
    },
  });
  console.log('✅ Admin başarıyla oluşturuldu/güncellendi:', user.email);
  console.log('📧 Email: admin@easyviza.com.tr');
  console.log('🔑 Şifre: 123456');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());