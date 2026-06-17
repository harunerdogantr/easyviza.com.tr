import Link from 'next/link'
import { ArrowUpRight, Globe2, ShieldCheck, Clock3, BadgeCheck, Users, Sparkles, Target } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda — EasyViza',
  description: 'EasyViza ekibi, misyonu ve vizyonu hakkında her şey.',
}

const stats = [
  { value: '10+', label: 'Desteklenen Ülke', icon: Globe2 },
  { value: '1.500+', label: 'Tamamlanan Başvuru', icon: BadgeCheck },
  { value: '%98', label: 'Onay Oranı', icon: ShieldCheck },
  { value: '24s', label: 'Ortalama Yanıt', icon: Clock3 },
]

const values = [
  {
    icon: Target,
    title: 'Şeffaflık',
    desc: 'Her adımı açık ve anlaşılır tutarız. Gizli ücret ya da sürpriz yoktur — başvuru öncesinde tüm maliyetleri net olarak gösteriyoruz.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: ShieldCheck,
    title: 'Güvenlik',
    desc: 'Belgeleriniz uçtan uca şifrelenerek saklanır. Kişisel verilerinizi asla üçüncü taraflarla paylaşmıyoruz.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Clock3,
    title: 'Hız',
    desc: 'AI destekli belge kontrolümüz sayesinde eksiklikleri anında tespit eder, sürecinizi geciktirmeden ilerletiriz.',
    color: 'from-teal-400 to-cyan-500',
  },
  {
    icon: Users,
    title: 'İnsan Odaklılık',
    desc: '7/24 destek ekibimiz her sorunuzu yanıtlar. Teknolojiyi araç olarak kullanır, asıl gücü insana veririz.',
    color: 'from-lime-400 to-green-500',
  },
]

const team = [
  { name: 'Ahmet Yılmaz', role: 'Kurucu & CEO', initials: 'AY', gradient: 'from-green-400 to-emerald-500' },
  { name: 'Elif Kaya', role: 'CPO — Ürün', initials: 'EK', gradient: 'from-emerald-400 to-teal-500' },
  { name: 'Murat Demir', role: 'CTO — Teknoloji', initials: 'MD', gradient: 'from-teal-400 to-cyan-500' },
  { name: 'Selin Arslan', role: 'Müşteri Deneyimi', initials: 'SA', gradient: 'from-lime-400 to-green-500' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-lime-300/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-1.5 shadow-sm mb-8">
            <Sparkles className="w-3.5 h-3.5 text-green-500" />
            <span className="text-sm font-medium text-slate-700">Hakkımızda</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Sınırları kaldırmak mümkün değil,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              süreci kolaylaştırmak mümkün.
            </span>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            EasyViza olarak vize başvuru sürecini daha hızlı, şeffaf ve anlaşılır hale getirmek için çalışıyoruz. 2023'ten bu yana 1.500'den fazla kişinin hayalindeki seyahate kavuşmasına yardım ettik.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-green-200"
          >
            Bizimle İletişime Geç <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center group">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center p-10 shadow-2xl shadow-green-200">
              <div className="text-center text-white space-y-6">
                <Globe2 className="w-20 h-20 mx-auto opacity-90" />
                <div>
                  <p className="text-4xl font-extrabold">10+</p>
                  <p className="text-white/80 mt-1">ülkeye vize desteği</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/15 rounded-xl py-3 px-4">
                    <p className="font-bold text-xl">%98</p>
                    <p className="text-white/70 text-xs mt-0.5">Onay oranı</p>
                  </div>
                  <div className="bg-white/15 rounded-xl py-3 px-4">
                    <p className="font-bold text-xl">24s</p>
                    <p className="text-white/70 text-xs mt-0.5">Yanıt süresi</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 max-w-md mx-auto lg:mx-0 rounded-3xl border-2 border-dashed border-green-200 scale-[1.05] rotate-2 -z-10" />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest">
              <Target className="w-3.5 h-3.5" /> Misyonumuz
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Herkes için{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                erişilebilir seyahat
              </span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Vize süreçlerinin karmaşıklığı pek çok insanın hayalindeki seyahati ertelemesine neden oluyor. Biz bu engeli ortadan kaldırmak için yola çıktık.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              AI destekli belge kontrolü, uzman danışmanlık ve 7/24 destek ile başvurunuzu eksiksiz, hızlı ve güvenli şekilde tamamlamanızı sağlıyoruz.
            </p>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors group"
            >
              Ülkeleri keşfet
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-400 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Değerlerimiz
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Ne için{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">duruyoruz?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
              <Users className="w-3.5 h-3.5" /> Ekibimiz
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Arkamızdaki{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">insanlar</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              Vize danışmanlığı, yazılım ve müşteri deneyimi alanlarında uzman bir ekiple çalışıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                  <span className="text-white font-extrabold text-xl">{member.initials}</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-12 relative overflow-hidden shadow-2xl shadow-green-200">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Vize başvurunuza bugün başlayın
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Sorularınız mı var? Ekibimiz size yardımcı olmaktan memnuniyet duyar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="px-7 py-3.5 bg-white text-green-700 font-bold rounded-2xl hover:bg-lime-50 transition-colors shadow-lg">
                  Ücretsiz Başla
                </Link>
                <Link href="/contact" className="px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/10 transition-colors">
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
