'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Register için validation şeması
const registerSchema = z.object({
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır').optional()
})

export type RegisterResult = 
  | { success: true; user: { id: string; email: string; name: string | null; createdAt: Date } }
  | { success: false; error: string }

/**
 * Kullanıcı kayıt işlemi (Server Action)
 * Şifreyi bcrypt ile hash'ler ve veritabanına kaydeder
 */
export async function registerUser(
  formData: FormData
): Promise<RegisterResult> {
  try {
    // FormData'dan değerleri al
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string | null

    // Validation
    const validatedData = registerSchema.parse({
      email,
      password,
      name: name || undefined
    })

    // Kullanıcı zaten var mı kontrol et
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email
      }
    })

    if (existingUser) {
      return {
        success: false,
        error: 'Bu email adresi zaten kullanılıyor'
      }
    }

    // Şifreyi bcrypt ile hashle (10 rounds)
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name || null
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })

    // Cache'i yenile
    revalidatePath('/register')
    revalidatePath('/login')

    return {
      success: true,
      user
    }
  } catch (error) {
    // Zod validation hatası
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }

    // Diğer hatalar
    console.error('Register error:', error)
    return {
      success: false,
      error: 'Kayıt sırasında bir hata oluştu'
    }
  }
}

/**
 * Kullanıcı kayıt işlemi (JSON data ile)
 * Alternatif kullanım için
 */
export async function registerUserWithData(
  data: { email: string; password: string; name?: string }
): Promise<RegisterResult> {
  try {
    // Validation
    const validatedData = registerSchema.parse(data)

    // Kullanıcı zaten var mı kontrol et
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email
      }
    })

    if (existingUser) {
      return {
        success: false,
        error: 'Bu email adresi zaten kullanılıyor'
      }
    }

    // Şifreyi bcrypt ile hashle (10 rounds)
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name || null
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })

    // Cache'i yenile
    revalidatePath('/register')
    revalidatePath('/login')

    return {
      success: true,
      user
    }
  } catch (error) {
    // Zod validation hatası
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }

    // Diğer hatalar
    console.error('Register error:', error)
    return {
      success: false,
      error: 'Kayıt sırasında bir hata oluştu'
    }
  }
}




