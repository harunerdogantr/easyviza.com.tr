import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAllApplications } from '@/lib/actions/application.actions'
import { ApplicationStatus } from '@prisma/client'
import { StatusDropdown } from '@/components/admin/StatusDropdown'
import Link from 'next/link'
import { ArrowUpRight, FileText, Eye } from 'lucide-react'

// Status badge component
function getStatusBadge(status: ApplicationStatus) {
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

  const config = statusConfig[status] || statusConfig.PENDING

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  )
}

export default async function AdminApplicationsPage() {
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

  // Başvuruları getir
  const result = await getAllApplications()
  const applications = result.success ? result.applications : []

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Başvuru Yönetimi
        </h1>
        <p className="text-slate-600">
          Tüm vize başvurularını görüntüleyin ve yönetin
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Toplam Başvuru
              </p>
              <p className="text-3xl font-bold text-slate-800">
                {applications.length}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Bekleyen Başvurular
              </p>
              <p className="text-3xl font-bold text-amber-600">
                {applications.filter(app => app.status === 'PENDING').length}
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Onaylanan Başvurular
              </p>
              <p className="text-3xl font-bold text-green-600">
                {applications.filter(app => app.status === 'APPROVED').length}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Başvurular Tablosu */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Tüm Başvurular</h2>
        </div>

        {applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Başvuru No
                  </th>
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
                    Başvuru Tarihi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono font-medium text-slate-800">
                        #{app.id.substring(0, 8).toUpperCase()}
                      </div>
                    </td>
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
                      <div className="text-sm text-slate-600">
                        {new Date(app.createdAt).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusDropdown
                        applicationId={app.id}
                        currentStatus={app.status}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Detay
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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


