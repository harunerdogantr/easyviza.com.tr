import { prisma } from '@/lib/prisma'
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react'

// Status badge component
function getStatusBadge(status: string) {
  const statusConfig = {
    PENDING: {
      label: 'Beklemede',
      className: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    APPROVED: {
      label: 'Onaylandı',
      className: 'bg-green-100 text-green-700 border-green-200'
    },
    REJECTED: {
      label: 'Reddedildi',
      className: 'bg-red-100 text-red-700 border-red-200'
    }
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  )
}

export default async function AdminDashboardPage() {
  // Veritabanından verileri çek
  const [
    totalApplications,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
    recentApplications
  ] = await Promise.all([
    // Toplam başvuru sayısı
    prisma.visaApplication.count(),
    
    // Bekleyen başvurular
    prisma.visaApplication.count({
      where: { status: 'PENDING' }
    }),
    
    // Onaylanan başvurular
    prisma.visaApplication.count({
      where: { status: 'APPROVED' }
    }),
    
    // Reddedilen başvurular
    prisma.visaApplication.count({
      where: { status: 'REJECTED' }
    }),
    
    // Son 5 başvuru
    prisma.visaApplication.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
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
        }
      }
    })
  ])

  // Tamamlanan vizeler (onaylanan + reddedilen)
  const completedVisas = approvedApplications + rejectedApplications

  // Bugünkü randevular (bugün oluşturulan başvurular)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayAppointments = await prisma.visaApplication.count({
    where: {
      createdAt: {
        gte: today
      }
    }
  })

  const stats = [
    {
      name: 'Toplam Başvuru',
      value: totalApplications.toLocaleString('tr-TR'),
      icon: FileText,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12.5%',
      changeType: 'increase' as const
    },
    {
      name: 'Bekleyen Onaylar',
      value: pendingApplications.toString(),
      icon: Clock,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: `+${pendingApplications > 0 ? pendingApplications : 0}`,
      changeType: 'increase' as const
    },
    {
      name: 'Tamamlanan Vizeler',
      value: completedVisas.toLocaleString('tr-TR'),
      icon: CheckCircle2,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8.2%',
      changeType: 'increase' as const
    },
    {
      name: 'Bugünkü Randevular',
      value: todayAppointments.toString(),
      icon: Calendar,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: todayAppointments > 0 ? `${todayAppointments} yeni` : 'Yok',
      changeType: 'neutral' as const
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-600">
          Sistem genelinde özet bilgiler ve son başvurular
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                {stat.changeType === 'increase' && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                )}
                {stat.changeType === 'neutral' && (
                  <div className="flex items-center gap-1 text-slate-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Son Başvurular Tablosu */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Son Başvurular</h2>
            <a 
              href="/admin/applications"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Tümünü Gör
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {recentApplications.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Müşteri Adı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Ülke
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Vize Tipi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      İşlem
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {recentApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-800">
                          {app.user.name || app.user.email?.split('@')[0] || 'İsimsiz'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {app.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600 flex items-center gap-2">
                          <span>{app.destinationCountry.flag}</span>
                          <span>{app.destinationCountry.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          {app.visaType.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          {new Date(app.createdAt).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a 
                          href={`/admin/applications/${app.id}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Detay
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Toplam <span className="font-medium text-slate-800">{recentApplications.length}</span> başvuru gösteriliyor
                </div>
                <div className="flex gap-2">
                  <a
                    href="/admin/applications"
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg border border-slate-200 transition-colors"
                  >
                    Tümünü Gör
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Henüz başvuru yok
            </h3>
            <p className="text-slate-600">
              Sistemde henüz hiç başvuru bulunmuyor
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
