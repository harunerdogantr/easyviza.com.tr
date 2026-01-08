import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, FileText, User, Calendar, MapPin, CheckCircle, XCircle, Clock } from 'lucide-react'

function getStatusBadge(status: string) {
  const statusConfig = {
    PENDING: {
      label: 'Beklemede',
      className: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: Clock
    },
    APPROVED: {
      label: 'Onaylandı',
      className: 'bg-green-100 text-green-700 border-green-200',
      icon: CheckCircle
    },
    REJECTED: {
      label: 'Reddedildi',
      className: 'bg-red-100 text-red-700 border-red-200',
      icon: XCircle
    }
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.className}`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  )
}

export default async function ApplicationDetailPage({
  params
}: {
  params: { id: string }
}) {
  // Authentication kontrolü
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // ADMIN rolü kontrolü
  const userRole = (session.user as any)?.role
  if (userRole !== 'ADMIN') {
    redirect('/dashboard')
  }

  // Başvuruyu getir
  const application = await prisma.visaApplication.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
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
      },
      documents: {
        select: {
          id: true,
          fileName: true,
          fileType: true,
          fileSize: true,
          uploadedAt: true
        },
        orderBy: {
          uploadedAt: 'desc'
        }
      }
    }
  })

  if (!application) {
    redirect('/admin/applications')
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Başvurulara Dön
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Başvuru Detayı
            </h1>
            <p className="text-slate-600">
              Başvuru No: #{application.id.substring(0, 8).toUpperCase()}
            </p>
          </div>
          {getStatusBadge(application.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Ana Bilgiler */}
        <div className="lg:col-span-2 space-y-6">
          {/* Müşteri Bilgileri */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Müşteri Bilgileri</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-500 mb-1">Ad Soyad</p>
                <p className="text-base font-medium text-slate-800">
                  {application.user.name || 'Belirtilmemiş'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">E-posta</p>
                <p className="text-base font-medium text-slate-800">
                  {application.user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Başvuru Bilgileri */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-50 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Başvuru Bilgileri</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Hedef Ülke</p>
                <p className="text-base font-medium text-slate-800 flex items-center gap-2">
                  <span>{application.destinationCountry.flag}</span>
                  <span>{application.destinationCountry.name}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Menşei Ülke</p>
                <p className="text-base font-medium text-slate-800 flex items-center gap-2">
                  <span>{application.originCountry.flag}</span>
                  <span>{application.originCountry.name}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Vize Tipi</p>
                <p className="text-base font-medium text-slate-800">
                  {application.visaType.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Başvuru Tarihi</p>
                <p className="text-base font-medium text-slate-800">
                  {new Date(application.createdAt).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              {application.travelDate && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Seyahat Tarihi</p>
                  <p className="text-base font-medium text-slate-800">
                    {new Date(application.travelDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              )}
              {application.purpose && (
                <div className="col-span-2">
                  <p className="text-sm text-slate-500 mb-1">Seyahat Amacı</p>
                  <p className="text-base font-medium text-slate-800">
                    {application.purpose}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Belgeler */}
          {application.documents.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Yüklenen Belgeler</h2>
              </div>
              <div className="space-y-2">
                {application.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {doc.fileName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {doc.fileType} • {(doc.fileSize / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(doc.uploadedAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sağ Kolon - Özet */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Özet</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Durum</p>
                {getStatusBadge(application.status)}
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Başvuru Tarihi</p>
                <p className="text-base font-medium text-slate-800">
                  {new Date(application.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
              {application.reviewedAt && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">İncelenme Tarihi</p>
                  <p className="text-base font-medium text-slate-800">
                    {new Date(application.reviewedAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-500 mb-1">Toplam Belge</p>
                <p className="text-base font-medium text-slate-800">
                  {application.documents.length} belge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




