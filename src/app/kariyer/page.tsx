import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  Briefcase, MapPin, Clock3, ArrowRight, Globe2,
  HeartHandshake, Rocket, Users, ShieldCheck, Sparkles,
  Coffee, Laptop, TrendingUp, Star
} from 'lucide-react'

const benefits = [
  { icon: Globe2,        title: 'Remote-first',         desc: 'İstediğin yerden çalış. Türkiye\'nin her noktasından veya yurt dışından.' },
  { icon: TrendingUp,    title: 'Hızlı kariyer',        desc: 'Büyüyen bir startup\'ta kısa sürede sorumluluk al, liderliğe yüksel.' },
  { icon: Laptop,        title: 'Ekipman desteği',      desc: 'MacBook ve ihtiyaç duyduğun tüm ekipmanlar şirket tarafından karşılanır.' },
  { icon: Coffee,        title: 'Esnek çalışma saatleri', desc: 'Çekirdek saatler dışında kendi ritmine göre çalış.' },
  { icon: HeartHandshake, title: 'Özel sağlık sigortası', desc: 'Ekibimizin tamamına kapsamlı özel sağlık sigortası sağlıyoruz.' },
  { icon: Star,          title: 'Performans primi',     desc: 'Katkıların doğrudan ödüllendirilen bir maaş + prim yapısı.' },
]

const openings = [
  {
    id: 1,
    title: 'Senior Frontend Geliştirici',
    department: 'Mühendislik',
    location: 'Remote (Türkiye)',
    type: 'Tam zamanlı',
    desc: 'Next.js, TypeScript ve Tailwind CSS ile kullanıcı deneyimini bir üst seviyeye taşıyacak geliştiriciler arıyoruz.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Vize Danışmanı',
    department: 'Müşteri Hizmetleri',
    location: 'İstanbul / Remote',
    type: 'Tam zamanlı',
    desc: 'Schengen, UK ve ABD vize süreçlerine hakim, müşterilerimizi en iyi şekilde yönlendirecek uzmanlar arıyoruz.',
    tags: ['Vize Süreçleri', 'Müşteri İletişimi', 'B2C'],
  },
  {
    id: 3,
    title: 'Ürün Müdürü (Product Manager)',
    department: 'Ürün',
    location: 'Remote (Türkiye)',
    type: 'Tam zamanlı',
    desc: 'Kullanıcı ihtiyaçlarını derinlemesine anlayan, veri odaklı ürün kararları alacak deneyimli bir PM arıyoruz.',
    tags: ['Product Management', 'Agile', 'Data'],
  },
  {
    id: 4,
    title: 'Dijital Pazarlama Uzmanı',
    department: 'Pazarlama',
    location: 'İstanbul / Remote',
    type: 'Tam zamanlı',
    desc: 'SEO, SEM ve sosyal medya stratejileriyle EasyViza\'nın büyümesini hızlandıracak bir pazarlama uzmanı arıyoruz.',
    tags: ['SEO', 'Google Ads', 'Meta Ads'],
  },
  {
    id: 5,
    title: 'Backend Geliştirici (Node.js)',
    department: 'Mühendislik',
    location: 'Remote (Türkiye)',
    type: 'Tam zamanlı',
    desc: 'Prisma, PostgreSQL ve Next.js server actions ile ölçeklenebilir backend sistemleri kuracak geliştiriciler arıyoruz.',
    tags: ['Node.js', 'PostgreSQL', 'Prisma'],
  },
  {
    id: 6,
    title: 'Stajyer — Yazılım Geliştirme',
    department: 'Mühendislik',
    location: 'Remote',
    type: 'Staj (3–6 ay)',
    desc: 'Gerçek bir üretim ortamında öğrenmek ve katkı sağlamak isteyen yazılım stajyerleri arıyoruz.',
    tags: ['React', 'JavaScript', 'Git'],
  },
]

const departmentColors: Record<string, string> = {
  'Mühendislik':      'bg-blue-100 text-blue-700',
  'Müşteri Hizmetleri': 'bg-green-100 text-green-700',
  'Ürün':             'bg-purple-100 text-purple-700',
  'Pazarlama':        'bg-orange-100 text-orange-700',
}

export default function KariyerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <Rocket className="w-3.5 h-3.5 text-green-400" />
            <span className="text-sm font-medium text-white/90">Kariyer</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            EasyViza ailesine{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              katılın
            </span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            Türkiye\'nin en hızlı büyüyen vize teknoloji şirketinde dünyayı daha erişilebilir kılmak için birlikte çalışalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#acik-pozisyonlar"
              className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl hover:opacity-90 transition text-base shadow-lg shadow-green-900/40"
            >
              Açık Pozisyonlar <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/20 text-white/90 font-semibold rounded-2xl hover:bg-white/10 transition text-base"
            >
              Spontane Başvuru
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { value: '18+', label: 'Ülke' },
              { value: '5.000+', label: 'Mutlu müşteri' },
              { value: '12', label: 'Ekip üyesi' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-white/50 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Neden EasyViza? ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
              <HeartHandshake className="w-3.5 h-3.5" /> Neden EasyViza?
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Sadece bir iş değil,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                bir misyon
              </span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              Her gün milyonlarca insanın dünyanın farklı köşelerine açılan kapısını kolaylaştırıyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-extrabold text-slate-900 mb-1.5">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Açık Pozisyonlar ── */}
      <section id="acik-pozisyonlar" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
              <Briefcase className="w-3.5 h-3.5" /> Açık Pozisyonlar
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Hangi roldeydin{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                seni bekliyoruz?
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.id}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${departmentColors[job.department] ?? 'bg-slate-100 text-slate-600'}`}>
                        {job.department}
                      </span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Clock3 className="w-3 h-3" /> {job.type}
                      </span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">{job.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{job.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`mailto:kariyer@easyviza.com.tr?subject=${encodeURIComponent(job.title + ' - Başvuru')}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-bold rounded-xl hover:opacity-90 transition shadow-md shadow-green-200 whitespace-nowrap"
                  >
                    Başvur <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Spontane */}
          <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-2">Aradığın pozisyonu bulamadın mı?</h3>
            <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
              Spontane başvuruna her zaman açığız. CV\'ni ve kısa bir tanıtım notunu bize gönder.
            </p>
            <a
              href="mailto:kariyer@easyviza.com.tr"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-white/90 transition text-sm"
            >
              kariyer@easyviza.com.tr <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Kültür ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
                <Users className="w-3.5 h-3.5" /> Ekip Kültürü
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-5">
                Birlikte büyüyen,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  birbirine güvenen
                </span>{' '}
                bir ekip
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                EasyViza\'da hiyerarşi yok — fikirler, unvanlardan daha önemli. Her ekip üyesi şirketin yönüne doğrudan katkı sağlar.
              </p>
              <ul className="space-y-3">
                {[
                  'Haftalık tüm-ekip toplantıları',
                  'Aylık şeffaf metrik paylaşımı',
                  'Yılda 2 kez ekip etkinliği',
                  'Kitap ve kurs bütçesi (kişi başı ₺6.000/yıl)',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-3 h-3 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mosaic cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: '🌍', title: 'Global Bakış Açısı', desc: '18 ülkede aktif' },
                { emoji: '🚀', title: 'Hızlı Büyüme', desc: '6 ayda 10x kullanıcı' },
                { emoji: '🤝', title: 'Güven', desc: 'Ekip önce' },
                { emoji: '🎯', title: 'Odak', desc: 'Sonuca giden en kısa yol' },
              ].map((c) => (
                <div key={c.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div className="text-3xl mb-3">{c.emoji}</div>
                  <p className="font-extrabold text-slate-900 text-sm">{c.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
