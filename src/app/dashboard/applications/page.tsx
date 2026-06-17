import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserApplications } from '@/lib/actions/application.actions'
import Link from 'next/link'
import { FilePlus, Clock, CheckCircle2, XCircle, FileText } from 'lucide-react'

function StatusBadge({ status }: { status: string }) {
  const config = {
    PENDING:  { label: 'Beklemede', className: 'bg-amber-100 text-amber-700', Icon: Clock },
    APPROVED: { label: 'Onaylandı', className: 'bg-green-100 text-green-700', Icon: CheckCircle2 },
    REJECTED: { label: 'Reddedildi', className: 'bg-red-100 text-red-700', Icon: XCircle },
  }[status] ?? { label: status, className: 'bg-slate-100 text-slate-700', Icon: Clock }

  const Icon = config.Icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  )
}

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const result = await getUserApplications()
  const applications = result.success ? result.applications : []

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Başvurularım</h1>
          <p className="text-slate-600">Tüm vize başvurularınızı buradan takip edebilirsiniz</p>
        </div>
        <Link
          href="/dashboard/apply"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <FilePlus className="w-4 h-4" />
          Yeni Başvuru
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FileText className="w-14 h-14 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Henüz başvurunuz yok</h3>
          <p className="text-slate-500 mb-6">İlk vize başvurunuzu oluşturun</p>
          <Link
            href="/dashboard/apply"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <FilePlus className="w-4 h-4" />
            Yeni Başvuru Oluştur
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Link
              key={app.id}
              href={`/dashboard/applications/${app.id}`}
              className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{app.destinationCountry.flag}</span>
                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {app.visaType.name} — {app.destinationCountry.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {new Date(app.createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                    {' · '}
                    {app.documents.length} belge
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={app.status} />
                <span className="text-slate-400 group-hover:text-blue-500 transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
