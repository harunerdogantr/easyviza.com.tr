import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FAQAccordion } from '@/components/faq/FAQAccordion'
import { getVisaCountry, visaCountries } from '@/lib/visa-data'
import {
  Clock3, Calendar, MapPin, CreditCard, FileText,
  CheckCircle2, XCircle, ArrowRight, ArrowLeft, Globe2,
  Users, ShieldCheck, BadgeCheck
} from 'lucide-react'

export async function generateStaticParams() {
  return visaCountries.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const country = getVisaCountry(params.slug)
  if (!country) return { title: 'Sayfa Bulunamadı' }
  return {
    title: `${country.name} Vizesi | EasyViza`,
    description: country.description,
  }
}

export default function VisaDetailPage({ params }: { params: { slug: string } }) {
  const country = getVisaCountry(params.slug)
  if (!country) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className={`relative pt-24 pb-0 overflow-hidden bg-gradient-to-br ${country.gradient}`}>
        {/* Decorative blobs */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-6">
          {/* Back link */}
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Tüm Ülkeler
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              {/* Flag + badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{country.flag}</span>
                <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {country.visaType}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {country.name} Vizesi
              </h1>
              <p className="mt-3 text-white/75 text-lg max-w-2xl leading-relaxed">
                {country.description}
              </p>
            </div>

            {/* CTA */}
            <Link
              href={`/payment?country=${country.slug}&type=${encodeURIComponent(country.visaType)}`}
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-white/90 transition-all shadow-xl text-sm whitespace-nowrap"
            >
              <Globe2 className="w-4 h-4 text-green-600" />
              Vize Al — {country.fee}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="relative">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60 C360 0 1080 0 1440 60 L1440 60 L0 60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Quick Info Cards ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Clock3,    label: 'İşlem Süresi',    value: country.duration },
              { icon: Calendar,  label: 'Kalış Süresi',    value: country.stay },
              { icon: MapPin,    label: 'Giriş Hakkı',     value: country.entry },
              { icon: CreditCard, label: 'Hizmet Ücreti',  value: country.fee },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-base font-extrabold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Required Documents ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
                <FileText className="w-3.5 h-3.5" /> Gerekli Belgeler
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                Başvuru için{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  hangi belgeler lazım?
                </span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Aşağıdaki belgelerin asılları ve fotokopileriyle birlikte hazır bulunmanız gerekmektedir.
              </p>
              <ul className="space-y-3">
                {country.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-slate-700 text-sm leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EasyViza advantage card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-extrabold mb-3">
                EasyViza ile başvurun, daha kolay olsun
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Uzman ekibimiz belge kontrolünden randevu takibine kadar tüm süreci sizin adınıza yönetir.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Belge eksikliği kontrolü',
                  'Konsolosluk randevu takibi',
                  'Başvuru durumu bildirimi',
                  'Red durumunda itiraz desteği',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                    <BadgeCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/payment?country=${country.slug}&type=${encodeURIComponent(country.visaType)}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm shadow-lg shadow-green-900/30"
              >
                Hemen Başvur — {country.fee} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Steps ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
              <Users className="w-3.5 h-3.5" /> Başvuru Adımları
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              {country.name} vizesi nasıl alınır?
            </h2>
          </div>

          <div className="space-y-6">
            {country.steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-green-200 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < country.steps.length - 1 && (
                    <div className="flex-1 w-px bg-green-100 mt-2 mb-0" style={{ minHeight: '24px' }} />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rejection Reasons ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-50 border-t border-red-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {country.name} vizesi red nedenleri
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {country.rejectionReasons.map((reason) => (
              <div key={reason} className="flex items-start gap-3 bg-white border border-red-100 rounded-xl px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                <span className="text-slate-700 text-sm">{reason}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500 bg-white border border-red-100 rounded-2xl px-5 py-4">
            <strong className="text-slate-700">EasyViza neden fark yaratır?</strong> Belge eksikliklerini başvurudan önce tespit eder, red riskini minimize ederiz.
            <Link href="/register" className="text-green-600 font-semibold ml-1 hover:underline">
              Hemen başlayın →
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
              {country.name} vizesi hakkında{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                merak edilenler
              </span>
            </h2>
            <p className="text-slate-500">En çok sorulan sorular ve cevapları.</p>
          </div>
          <FAQAccordion items={country.faq} />
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-emerald-500">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-3">Hazır mısınız?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {country.name} vizenizi bugün alın
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Ortalama {country.processingTime} içinde sonuçlanan başvurunuzu hemen oluşturun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/payment?country=${country.slug}&type=${encodeURIComponent(country.visaType)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-white/90 transition shadow-lg text-base"
            >
              Başvuruyu Başlat — {country.fee} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/10 transition text-base"
            >
              Danışmanlık Al
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
