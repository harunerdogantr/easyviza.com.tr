import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
  FilePlus,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Kullanıcının başvurularını getir
  const applications = await prisma.visaApplication.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      visaType: {
        include: {
          country: true
        }
      },
      destinationCountry: true,
      documents: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  })

  // İstatistikler
  const totalApplications = applications.length
  const pendingApplications = applications.filter(
    (app) => app.status === 'PENDING'
  ).length
  const approvedApplications = applications.filter(
    (app) => app.status === 'APPROVED'
  ).length
  const applicationsWithMissingDocs = applications.filter(
    (app) => app.documents.length === 0
  ).length

  const stats = [
    {
      name: 'Aktif Başvurular',
      value: pendingApplications.toString(),
      icon: Clock,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: '/dashboard/applications?status=PENDING'
    },
    {
      name: 'Onaylanan Başvurular',
      value: approvedApplications.toString(),
      icon: CheckCircle2,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      href: '/dashboard/applications?status=APPROVED'
    },
    {
      name: 'Eksik Belgeler',
      value: applicationsWithMissingDocs.toString(),
      icon: AlertCircle,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      href: '/dashboard/documents'
    },
    {
      name: 'Toplam Başvuru',
      value: totalApplications.toString(),
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: '/dashboard/applications'
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Hoş Geldiniz, {session.user.name || session.user.email?.split('@')[0]}
        </h1>
        <p className="text-slate-600">
          Vize başvurularınızı yönetin ve takip edin
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Hızlı Erişim */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/dashboard/apply"
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-lg group-hover:bg-white/30 transition-colors">
              <FilePlus className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Yeni Başvuru</h3>
              <p className="text-blue-100">
                Yeni bir vize başvurusu oluşturun
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/documents"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-4 rounded-lg group-hover:bg-blue-50 transition-colors">
              <FileText className="w-8 h-8 text-slate-700 group-hover:text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">
                Belgelerim
              </h3>
              <p className="text-slate-600">
                Yüklediğiniz belgeleri görüntüleyin
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Son Başvurular */}
      {applications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Son Başvurular</h2>
            <Link
              href="/dashboard/applications"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Tümünü Gör →
            </Link>
          </div>
          <div className="space-y-4">
            {applications.slice(0, 5).map((app) => (
              <Link
                key={app.id}
                href={`/dashboard/applications/${app.id}`}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-slate-50 transition-all duration-200 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg">{app.destinationCountry.flag}</span>
                    <h3 className="font-semibold text-slate-800 group-hover:text-blue-600">
                      {app.visaType.name} - {app.destinationCountry.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    {new Date(app.createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'APPROVED'
                        ? 'bg-green-100 text-green-700'
                        : app.status === 'REJECTED'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {app.status === 'APPROVED'
                      ? 'Onaylandı'
                      : app.status === 'REJECTED'
                      ? 'Reddedildi'
                      : 'Beklemede'}
                  </span>
                  <span className="text-slate-400 group-hover:text-blue-600">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Boş durum */}
      {applications.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Henüz başvurunuz yok
          </h3>
          <p className="text-slate-600 mb-6">
            İlk vize başvurunuzu oluşturmak için aşağıdaki butona tıklayın
          </p>
          <Link
            href="/dashboard/apply"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FilePlus className="w-5 h-5" />
            Yeni Başvuru Oluştur
          </Link>
        </div>
      )}
    </div>
  )
}
