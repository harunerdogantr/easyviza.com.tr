import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FileText, FilePlus } from 'lucide-react'

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const documents = await prisma.document.findMany({
    where: {
      visaApplication: { userId: session.user.id }
    },
    include: {
      visaApplication: {
        include: {
          destinationCountry: { select: { name: true, flag: true } }
        }
      }
    },
    orderBy: { uploadedAt: 'desc' }
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Belgelerim</h1>
          <p className="text-slate-600">Yüklediğiniz tüm belgeler</p>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FileText className="w-14 h-14 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Henüz belge yüklenmemiş</h3>
          <p className="text-slate-500 mb-6">Vize başvurusu oluşturarak belge yükleyebilirsiniz</p>
          <Link
            href="/dashboard/apply"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <FilePlus className="w-4 h-4" />
            Başvuru Oluştur
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Belge</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tür</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Başvuru</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-800 truncate max-w-[200px]">
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">{doc.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/applications/${doc.visaApplicationId}`}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>{doc.visaApplication.destinationCountry.flag}</span>
                      <span>{doc.visaApplication.destinationCountry.name}</span>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-500">
                      {new Date(doc.uploadedAt).toLocaleDateString('tr-TR')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
