import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  Newspaper, Download, ArrowRight, Mail, Globe2,
  Quote, Users, TrendingUp, Award, FileText,
  ExternalLink, Calendar
} from 'lucide-react'

const pressReleases = [
  {
    id: 1,
    date: '14 Mayıs 2026',
    category: 'Şirket Haberleri',
    title: 'EasyViza, 18 ülkeye genişleyerek Türkiye\'nin en büyük online vize platformu oldu',
    excerpt: 'İstanbul merkezli vize teknoloji şirketi EasyViza, sunduğu ülke sayısını 18\'e çıkararak sektörde liderliğini pekiştirdi.',
  },
  {
    id: 2,
    date: '2 Nisan 2026',
    category: 'Ürün',
    title: 'EasyViza AI Belge Analizi özelliğini kullanıcılarına sundu',
    excerpt: 'Yapay zeka destekli yeni belge analizi özelliği, başvuru hatalarını başvuru öncesinde tespit ederek red oranını %40 azaltıyor.',
  },
  {
    id: 3,
    date: '15 Şubat 2026',
    category: 'Büyüme',
    title: 'EasyViza ilk yılında 5.000 başvuruyu aştı',
    excerpt: 'Kuruluşunun birinci yılını kutlayan EasyViza, toplam 5.000 onaylı vize başvurusuyla sektörde dikkat çekici bir büyüme sergiledi.',
  },
  {
    id: 4,
    date: '8 Ocak 2026',
    category: 'Ortaklık',
    title: 'EasyViza ve TürkSeyahat stratejik iş birliği imzaladı',
    excerpt: 'İki şirket arasındaki iş birliği, seyahat acentesi müşterilerine entegre vize hizmeti sunmayı amaçlıyor.',
  },
]

const mediaPickups = [
  { outlet: 'Webrazzi', title: 'Vize sürecini dijitalleştiren startup: EasyViza', date: 'Nisan 2026', href: '#' },
  { outlet: 'Sabah Teknoloji', title: '5.000 kullanıcıyı geçen EasyViza nereye koşuyor?', date: 'Mart 2026', href: '#' },
  { outlet: 'Ekonomim.com', title: 'Schengen vizesi artık çok daha kolay', date: 'Şubat 2026', href: '#' },
  { outlet: 'ShiftDelete', title: 'EasyViza\'nın AI destekli belge kontrolü test ettik', date: 'Ocak 2026', href: '#' },
]

const stats = [
  { value: '5.000+', label: 'Onaylı başvuru' },
  { value: '18',     label: 'Ülke' },
  { value: '%96',    label: 'Onay oranı' },
  { value: '2025',   label: 'Kuruluş yılı' },
]

const categoryColors: Record<string, string> = {
  'Şirket Haberleri': 'bg-blue-100 text-blue-700',
  'Ürün':             'bg-purple-100 text-purple-700',
  'Büyüme':           'bg-green-100 text-green-700',
  'Ortaklık':         'bg-orange-100 text-orange-700',
}

export default function BasinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-lime-300/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-1.5 shadow-sm mb-8">
            <Newspaper className="w-3.5 h-3.5 text-green-500" />
            <span className="text-sm font-medium text-slate-700">Basın Odası</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Haberler &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Medya Kaynakları
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            EasyViza hakkında haber yapmak, röportaj talep etmek veya logo/görsel indirmek için doğru yerdesiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:basin@easyviza.com.tr"
              className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-2xl hover:opacity-90 transition shadow-lg shadow-green-200 text-base"
            >
              <Mail className="w-4 h-4" /> Basın İletişimi
            </a>
            <a
              href="#kit"
              className="inline-flex items-center gap-2 px-7 py-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl hover:bg-slate-50 transition text-base"
            >
              <Download className="w-4 h-4" /> Basın Kiti İndir
            </a>
          </div>
        </div>
      </section>

      {/* ── Rakamlarla EasyViza ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-10">
            Rakamlarla EasyViza
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-emerald-500">
                  {s.value}
                </p>
                <p className="text-slate-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alıntı ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-10 h-10 text-green-400 mx-auto mb-6 opacity-80" />
          <blockquote className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
            "Vize almak, bir ülkenin kapısını çalmaktır. Biz sadece o kapıyı biraz daha kolay açmaya çalışıyoruz."
          </blockquote>
          <p className="text-white/50 text-sm">
            — EasyViza Kurucu Ekibi
          </p>
        </div>
      </section>

      {/* ── Basın Bültenleri ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-3">
                <FileText className="w-3.5 h-3.5" /> Basın Bültenleri
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Son haberler</h2>
            </div>
          </div>

          <div className="space-y-4">
            {pressReleases.map((pr) => (
              <div
                key={pr.id}
                className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-white border border-slate-100 rounded-2xl p-6 hover:border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex-shrink-0 hidden sm:flex flex-col items-center justify-center w-16 text-center">
                  <Calendar className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-xs text-slate-400 leading-tight">{pr.date}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[pr.category] ?? 'bg-slate-100 text-slate-600'}`}>
                      {pr.category}
                    </span>
                    <span className="text-xs text-slate-400 sm:hidden">{pr.date}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 mb-1 group-hover:text-green-700 transition-colors">
                    {pr.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{pr.excerpt}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all flex-shrink-0 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Medyada EasyViza ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-3">
              <Globe2 className="w-3.5 h-3.5" /> Medyada Biz
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Hakkımızda yazılanlar
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mediaPickups.map((item) => (
              <a
                key={item.outlet}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600 font-extrabold text-xs text-center leading-tight">
                  {item.outlet.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-green-600 mb-1">{item.outlet} · {item.date}</p>
                  <p className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-green-700 transition-colors">
                    {item.title}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-green-500 transition-colors flex-shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Basın Kiti ── */}
      <section id="kit" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-3">
              <Download className="w-3.5 h-3.5" /> Basın Kiti
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Logo ve görseller
            </h2>
            <p className="mt-3 text-slate-500">Tüm materyaller medya kullanımı için ücretsiz sunulmaktadır.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Globe2,  title: 'Logo Paketi',        desc: 'SVG, PNG — açık ve koyu zemin', color: 'from-green-400 to-emerald-500' },
              { icon: Users,   title: 'Ekip Fotoğrafları',  desc: 'Yüksek çözünürlüklü JPG', color: 'from-blue-400 to-indigo-500' },
              { icon: Award,   title: 'Şirket Bilgileri',   desc: 'Hakkımızda PDF, bilanço özeti', color: 'from-amber-400 to-orange-500' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-start">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-extrabold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-xs mb-4 flex-1">{item.desc}</p>
                <a
                  href="mailto:basin@easyviza.com.tr"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 transition-colors"
                >
                  Talep et <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── İletişim ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-emerald-500">
        <div className="max-w-3xl mx-auto text-center">
          <TrendingUp className="w-10 h-10 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Basın soruları için
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Röportaj, haber talebi veya basın materyalleri için bize ulaşın.
          </p>
          <a
            href="mailto:basin@easyviza.com.tr"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-white/90 transition shadow-lg text-base"
          >
            <Mail className="w-5 h-5 text-green-600" />
            basin@easyviza.com.tr
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="mt-4 text-white/50 text-sm">Genellikle 4 saat içinde yanıt veriyoruz.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
