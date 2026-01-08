'use server'

import { prisma } from '@/lib/prisma'
import { ApplicationStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

/**
 * Başvuru durumunu güncelle
 */
export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.visaApplication.update({
      where: { id: applicationId },
      data: {
        status,
        reviewedAt: new Date()
      }
    })

    revalidatePath('/admin/applications')
    return { success: true }
  } catch (error: any) {
    console.error('Update application status error:', error)
    return {
      success: false,
      error: error.message || 'Durum güncellenirken bir hata oluştu'
    }
  }
}

/**
 * Tüm başvuruları getir (Admin için)
 */
export async function getAllApplications() {
  try {
    const applications = await prisma.visaApplication.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        visaType: {
          include: {
            country: {
              select: {
                name: true,
                flag: true
              }
            }
          }
        },
        destinationCountry: {
          select: {
            name: true,
            flag: true
          }
        },
        originCountry: {
          select: {
            name: true,
            flag: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, applications }
  } catch (error: any) {
    console.error('Get all applications error:', error)
    return {
      success: false,
      error: error.message || 'Başvurular getirilirken bir hata oluştu',
      applications: []
    }
  }
}
