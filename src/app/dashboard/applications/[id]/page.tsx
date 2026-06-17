import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserApplicationById } from '@/lib/actions/application.actions'
import Link from 'next/link'
import { ArrowLeft, FileText, Clock, CheckCircle2, XCircle } from 'lucide-react'

function StatusBadge({ status }: { status: string }) {
  const config = {
    PENDING:  { label: 'Beklemede', className: 'bg-amber-100 text-amber-700 border-amber-200', Icon: Clock },
    APPROVED: { label: 'Onaylandı', className: 'bg-green-100 text-green-700 border-green-200', Icon: CheckCircle2 },
    REJECTED: { label: 'Reddedildi', className: 'bg-red-100 text-red-700 border-red-200', Icon: XCircle },
  }[status] ?? { label: status, className: 'bg-slate-100 text-slate-700 border-slate-200', Icon: Clock }

  const Icon = config.Icon
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.className}`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  )
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const result = await getUserApplicationById(params.id)

  if (!result.success || !result.application) {
    redirect('/dashboard/applications')
  }

  const app = result.application

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Başvurulara Dön
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Başvuru Detayı</h1>
            <p className="text-slate-500 text-sm mt-1">
              #{app.id.substring(0, 8).toUpperCase()}
            </p>
          </div>
          <StatusBadge status={app.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Başvuru Bilgileri */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Başvuru Bilgileri</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-slate-500 mb-0.5">Hedef Ülke</dt>
              <dd className="font-medium text-slate-800 flex items-center gap-2">
                <span>{app.destinationCountry.flag}</span>
                <span>{app.destinationCountry.name}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 mb-0.5">Menşei Ülke</dt>
              <dd className="font-medium text-slate-800 flex items-center gap-2">
                <span>{app.originCountry.flag}</span>
                <span>{app.originCountry.name}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 mb-0.5">Vize Tipi</dt>
              <dd className="font-medium text-slate-800">{app.visaType.name}</dd>
            </div>
            {app.travelDate && (
              <div>
                <dt className="text-xs text-slate-500 mb-0.5">Seyahat Tarihi</dt>
                <dd className="font-medium text-slate-800">
                  {new Date(app.travelDate).toLocaleDateString('tr-TR')}
                </dd>
              </div>
            )}
            {app.returnDate && (
              <div>
                <dt className="text-xs text-slate-500 mb-0.5">Dönüş Tarihi</dt>
                <dd className="font-medium text-slate-800">
                  {new Date(app.returnDate).toLocaleDateString('tr-TR')}
                </dd>
              </div>
            )}
            {app.purpose && (
              <div>
                <dt className="text-xs text-slate-500 mb-0.5">Seyahat Amacı</dt>
                <dd className="font-medium text-slate-800">{app.purpose}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs text-slate-500 mb-0.5">Başvuru Tarihi</dt>
              <dd className="font-medium text-slate-800">
                {new Date(app.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </dd>
            </div>
          </dl>
        </div>

        {/* Belgeler */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Belgeler ({app.documents.length})
          </h2>
          {app.documents.length === 0 ? (
            <p className="text-slate-500 text-sm">Henüz belge yüklenmemiş.</p>
          ) : (
            <div className="space-y-2">
              {app.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                >
                  <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500">
                      {doc.type}
                      {doc.size ? ` · ${(doc.size / 1024).toFixed(1)} KB` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
