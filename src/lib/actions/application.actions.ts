'use server'

import { prisma } from '@/lib/prisma'
import { ApplicationStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Oturum açmanız gerekiyor')
  if (session.user.role !== 'ADMIN') throw new Error('Admin yetkisi gerekiyor')
  return session
}

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Oturum açmanız gerekiyor')
  return session
}

// ─── Admin Actions ─────────────────────────────────────────────────────────

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin()
    await prisma.visaApplication.update({
      where: { id: applicationId },
      data: { status, reviewedAt: new Date() }
    })
    revalidatePath('/admin/applications')
    return { success: true }
  } catch (error) {
    console.error('Update application status error:', error)
    return { success: false, error: 'Durum güncellenirken bir hata oluştu' }
  }
}

export async function getAllApplications() {
  try {
    await requireAdmin()
    const applications = await prisma.visaApplication.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        visaType: { include: { country: { select: { name: true, flag: true } } } },
        destinationCountry: { select: { name: true, flag: true } },
        originCountry: { select: { name: true, flag: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, applications }
  } catch (error) {
    console.error('Get all applications error:', error)
    return { success: false, error: 'Başvurular getirilirken bir hata oluştu', applications: [] }
  }
}

// ─── User Actions ──────────────────────────────────────────────────────────

export async function getCountries() {
  const countries = await prisma.country.findMany({
    orderBy: { name: 'asc' }
  })
  return countries
}

export async function getVisaTypesByCountry(countryId: string) {
  const visaTypes = await prisma.visaType.findMany({
    where: { countryId },
    orderBy: { name: 'asc' }
  })
  return visaTypes
}

export async function createVisaApplication(data: {
  visaTypeId: string
  originCountryId: string
  destinationCountryId: string
  travelDate?: Date
  returnDate?: Date
  purpose?: string
}): Promise<{ success: boolean; application?: { id: string }; error?: string }> {
  try {
    const session = await requireSession()

    const application = await prisma.visaApplication.create({
      data: {
        userId: session.user.id,
        visaTypeId: data.visaTypeId,
        originCountryId: data.originCountryId,
        destinationCountryId: data.destinationCountryId,
        travelDate: data.travelDate,
        returnDate: data.returnDate,
        purpose: data.purpose
      },
      select: { id: true }
    })

    revalidatePath('/dashboard')
    return { success: true, application }
  } catch (error) {
    console.error('Create visa application error:', error)
    return { success: false, error: 'Başvuru oluşturulurken bir hata oluştu' }
  }
}

export async function getUserApplications() {
  try {
    const session = await requireSession()
    const applications = await prisma.visaApplication.findMany({
      where: { userId: session.user.id },
      include: {
        visaType: { include: { country: true } },
        destinationCountry: true,
        originCountry: true,
        documents: { select: { id: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, applications }
  } catch (error) {
    console.error('Get user applications error:', error)
    return { success: false, error: 'Başvurular getirilirken bir hata oluştu', applications: [] }
  }
}

export async function getUserApplicationById(applicationId: string) {
  try {
    const session = await requireSession()
    const application = await prisma.visaApplication.findUnique({
      where: { id: applicationId },
      include: {
        visaType: { include: { country: true } },
        destinationCountry: true,
        originCountry: true,
        documents: true
      }
    })

    if (!application) return { success: false, error: 'Başvuru bulunamadı' }

    if (session.user.role !== 'ADMIN' && application.userId !== session.user.id) {
      return { success: false, error: 'Bu başvuruya erişim yetkiniz yok' }
    }

    return { success: true, application }
  } catch (error) {
    console.error('Get user application by id error:', error)
    return { success: false, error: 'Başvuru getirilirken bir hata oluştu' }
  }
}
