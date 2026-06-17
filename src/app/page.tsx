import Link from 'next/link'
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Globe2,
  ShieldCheck,
  FileText,
  CreditCard,
  Upload,
  BadgeCheck,
  Sparkles,
  MessageCircle,
} from 'lucide-react'
import { FAQAccordion } from '@/components/faq/FAQAccordion'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { blogPosts } from '@/lib/blog-data'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
      <Navbar />

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-green-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-lime-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-1.5 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-700">Türkiye'nin dijital vize platformu</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight">
                Vize almanın{' '}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                    kolay yolu
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                    <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-[480px]">
                EasyViza, vize başvurunu kolaylaştıran ve her adımda sana rehberlik eden dijital platformdur. Doğru belgelerle, zamanında başvur.
              </p>

              <div className="max-w-[480px]">
                <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2 shadow-md border border-slate-100">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="flex-1 px-4 py-3 text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none text-base"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap">
                    Başvuru Başlat
                  </button>
                </div>
                <p className="mt-2.5 text-xs text-slate-500 pl-1">
                  En kısa sürede sizinle iletişime geçeceğiz. Spam göndermiyoruz.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                {[
                  { icon: Globe2, label: '10+ Ülke' },
                  { icon: CheckCircle2, label: '%98 Onay Oranı' },
                  { icon: Clock3, label: '7/24 Destek' },
                  { icon: ShieldCheck, label: 'Güvenli Ödeme' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-slate-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Dashboard mockup */}
            <div className="relative hidden lg:block">
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-10">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Başvuru Durumu</p>
                    <p className="text-xl font-bold text-slate-900 mt-0.5">Schengen Vizesi</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    İncelemede
                  </span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Tamamlanma</span>
                    <span className="font-semibold text-green-600">75%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                  </div>
                </div>
                {[
                  { label: 'Belge yükleme', done: true },
                  { label: 'Kimlik doğrulama', done: true },
                  { label: 'Uzman incelemesi', done: true },
                  { label: 'Büyükelçilik onayı', done: false },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-green-500' : 'bg-slate-100'}`}>
                      {step.done ? (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                      )}
                    </div>
                    <span className={`text-sm ${step.done ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-8 -left-10 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-3 z-20 w-64">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Başvurunuz alındı!</p>
                  <p className="text-xs text-slate-500">2 iş günü içinde dönüş yapılır.</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-4 flex flex-col gap-2 z-20">
                {['🇩🇪 Almanya', '🇫🇷 Fransa', '🇳🇱 Hollanda'].map((c) => (
                  <div key={c} className="bg-white rounded-full shadow-md border border-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700">{c}</div>
                ))}
              </div>
              <div className="absolute inset-0 -z-10 rounded-3xl scale-[1.04] border-2 border-dashed border-green-200 rotate-2" />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          COUNTRIES
      ═══════════════════════════════════ */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Popüler Destinasyonlar
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Vize almak artık{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">çok kolay</span>
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-xl">
                10'dan fazla ülkeye vize başvurusunu belgeler, rehberlik ve uzman desteğiyle kolaylaştırıyoruz.
              </p>
            </div>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-full hover:border-green-400 hover:text-green-700 transition-all font-semibold text-sm whitespace-nowrap group"
            >
              Tüm ülkeler
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Grid — top 6 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.slice(0, 6).map((country) => (
              <div
                key={country.id}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Gradient banner */}
                <div className={`h-40 bg-gradient-to-br ${country.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-6xl">{country.flag}</span>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{country.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">{country.description}</p>
                  <div className="flex gap-3">
                    <Link
                      href={`/visa/${country.slug || country.name.toLowerCase()}`}
                      className="flex-1 text-center px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Detaylar
                    </Link>
                    <Link
                      href="/login"
                      className="flex-1 text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                    >
                      Vize Al
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-green-200"
            >
              <Globe2 className="w-5 h-5" />
              Tüm {countries.length} ülkeyi görüntüle
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════ */}
      <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-950 to-slate-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-400 uppercase tracking-widest mb-4">
              <BadgeCheck className="w-3.5 h-3.5" /> Nasıl Çalışır?
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
              4 adımda vize{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">başvurusu</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Vize süreci artık dijital. Belgelerinizi yükleyin, başvurunuzu yönetin, sonucu takip edin — hepsi tek platformda.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: '01',
                icon: Globe2,
                title: 'Ülke Seçin',
                desc: 'Gitmek istediğiniz ülkeyi ve vize tipini seçin. Size özel gereksinimler anında gösterilir.',
                color: 'from-green-400 to-emerald-500',
                light: 'bg-green-400/10 border-green-400/20',
              },
              {
                num: '02',
                icon: CreditCard,
                title: 'Ödeme Yapın',
                desc: 'Güvenli ödeme altyapısıyla işleminizi tamamlayın. Kredi kartı ve havale ile ödeme kabul edilir.',
                color: 'from-emerald-400 to-teal-500',
                light: 'bg-emerald-400/10 border-emerald-400/20',
              },
              {
                num: '03',
                icon: Upload,
                title: 'Belge Yükleyin',
                desc: 'AI destekli sistemimiz belgelerinizi anında kontrol eder ve eksiklikleri bildirir.',
                color: 'from-teal-400 to-cyan-500',
                light: 'bg-teal-400/10 border-teal-400/20',
              },
              {
                num: '04',
                icon: BadgeCheck,
                title: 'Başvurun Hazır',
                desc: 'E-vizede tüm işlemleri sizin adınıza biz tamamlarız. Fiziki vizelerde eksiksiz belge teslimiyle yönlendiririz.',
                color: 'from-lime-400 to-green-500',
                light: 'bg-lime-400/10 border-lime-400/20',
              },
            ].map((step) => (
              <div
                key={step.num}
                className={`relative rounded-2xl border ${step.light} p-6 flex flex-col gap-5 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Number */}
                <span className="text-5xl font-black text-white/5 absolute top-4 right-5 select-none">{step.num}</span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* Connector arrow (hidden on last) */}
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 last:hidden">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10+', label: 'Desteklenen Ülke' },
              { value: '1.500+', label: 'Tamamlanan Başvuru' },
              { value: '%98', label: 'Onay Oranı' },
              { value: '24s', label: 'Ortalama Yanıt Süresi' },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/5 border border-white/10 rounded-2xl py-6 px-4">
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">{stat.value}</p>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          BLOG
      ═══════════════════════════════════ */}
      <section id="blog" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-lime-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
                <FileText className="w-3.5 h-3.5" /> Blog
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Vizeye dair{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">her şey</span>
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-xl">
                Vize süreçleri, belgeler ve seyahat ipuçları hakkında en güncel bilgiler burada.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full hover:opacity-90 transition-opacity font-semibold text-sm whitespace-nowrap shadow-md shadow-green-100"
            >
              Tümünü Gör <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col bg-white ${i === 0 ? 'md:col-span-1' : ''}`}
              >
                {/* Banner */}
                <div className={`h-52 bg-gradient-to-br ${post.imageGradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  <span className="absolute top-4 left-4 text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    {post.category}
                  </span>
                  <span className="absolute bottom-4 right-4 text-xs text-white/70 bg-black/20 rounded-full px-2.5 py-1">
                    {post.readingTime} okuma
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-2 mb-3 flex-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors leading-snug flex-1">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-green-500 transition-colors flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.description}</p>
                  <p className="text-xs text-slate-400">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            {/* decorative circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Hemen Başlayın
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Vize başvurunuzu bugün başlatın
              </h2>
              <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
                Uzman ekibimiz ve AI destekli sistemimiz ile vize başvurunuzu hızlı, güvenli ve eksiksiz tamamlayın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-white text-green-700 font-bold rounded-2xl hover:bg-lime-50 transition-colors shadow-lg text-base"
                >
                  Ücretsiz Kayıt Ol
                </Link>
                <Link
                  href="/countries"
                  className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/10 transition-colors text-base"
                >
                  Ülkeleri İncele
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FAQ
      ═══════════════════════════════════ */}
      <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-50 rounded-full blur-3xl opacity-80 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
              <MessageCircle className="w-3.5 h-3.5" /> Destek
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Sıkça Sorulan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Sorular</span>
            </h2>
            <p className="text-lg text-slate-500">
              EasyViza ile ilgili merak ettiğiniz her şeyin cevabı burada.
            </p>
          </div>

          <FAQAccordion items={faqItems} />

          {/* Bottom help row */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5">
            <div>
              <p className="text-slate-800 font-semibold">Aradığınızı bulamadınız mı?</p>
              <p className="text-slate-500 text-sm mt-0.5">7/24 destek ekibimize ulaşın.</p>
            </div>
            <Link
              href="mailto:destek@easyviza.com.tr"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" /> Bize Yazın
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ─── Static data ─── */

const faqItems = [
  {
    id: 1,
    question: 'EasyViza nedir?',
    answer: 'EasyViza, vize başvuru süreçlerinizi dijitalleştiren ve kolaylaştıran bir platformdur. Belgelerinizi yükleyebilir, başvurularınızı takip edebilir ve tüm süreç boyunca rehberlik alabilirsiniz.',
  },
  {
    id: 2,
    question: 'Neden EasyViza\'yı kullanmalıyım?',
    answer: 'EasyViza ile başvuru yapmak size zaman kazandırır, belgelerinizi eksiksiz hazırlamanızı sağlar ve tüm süreç boyunca profesyonel destek alırsınız. E-vize başvurularında işlemleri sizin adınıza tamamlarız.',
  },
  {
    id: 3,
    question: 'Pasaportumun geçerlilik süresi ne kadar olmalı?',
    answer: 'Pasaportunuzun, seyahat tarihinizden itibaren en az 6 ay geçerli olması gerekmektedir. Bazı ülkeler için bu süre daha uzun olabilir. Detaylı bilgi için başvuru yapmak istediğiniz ülkeyi seçtiğinizde size özel gereksinimler gösterilir.',
  },
  {
    id: 4,
    question: 'Vize başvurusu için hangi belgeler gerekiyor?',
    answer: 'Gerekli belgeler, başvuru yapmak istediğiniz ülkeye ve vize tipine göre değişiklik gösterir. Genel olarak pasaport, fotoğraf, seyahat sigortası, uçak rezervasyonu ve konaklama belgeleri istenir. Başvuru formunda size özel belge listesi gösterilir.',
  },
  {
    id: 5,
    question: 'Belgelerimi yükledikten sonra ne olacak?',
    answer: 'Belgelerinizi yükledikten sonra ekibimiz belgelerinizi kontrol eder ve eksiklik varsa size bildirir. E-vize başvurularında işlemleri sizin adınıza tamamlarız. Fiziki evrak gerektiren vizelerde ise belgelerinizi eksiksiz kontrol edip size teslim eder, sonraki adımlarda yönlendirme sağlarız.',
  },
]

const countries = [
  {
    id: 1, name: 'Hollanda', slug: 'hollanda', flag: '🇳🇱',
    description: 'Randevular çabuk dolar, belgeler titizlik ister. Hollanda vizesine başvururken her adımda yanındayız.',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 2, name: 'İtalya', slug: 'italya', flag: '🇮🇹',
    description: 'Roma sokaklarında kaybolmadan önce belgelerin eksiksiz olduğundan emin ol. İyi bir seyahat, sorunsuz başvuruyla başlar.',
    gradient: 'from-amber-400 to-amber-600',
  },
  {
    id: 3, name: 'Fransa', slug: 'fransa', flag: '🇫🇷',
    description: 'Şık sokaklar, tarihi yapılar ve leziz mutfağın ülkesi. Belgeleri adım adım hazırlıyoruz.',
    gradient: 'from-indigo-400 to-indigo-600',
  },
  {
    id: 4, name: 'Polonya', slug: 'polonya', flag: '🇵🇱',
    description: 'Orta Avrupa\'nın kalbinde tarihi şehirler ve eşsiz kültür. Hızlı ve hatasız başvuru için yanınızdayız.',
    gradient: 'from-red-400 to-red-600',
  },
  {
    id: 5, name: 'İsveç', slug: 'isvec', flag: '🇸🇪',
    description: 'Mimari ve doğanın iç içe geçtiği İsveç\'e sorunsuz bir seyahate var mısın?',
    gradient: 'from-yellow-400 to-yellow-600',
  },
  {
    id: 6, name: 'Norveç', slug: 'norvec', flag: '🇳🇴',
    description: 'Kuzey Işıklarının nefes kesen manzaralarını keşfetmeniz için vize başvuru sürecinizi güvence altına alıyoruz.',
    gradient: 'from-teal-400 to-teal-600',
  },
  {
    id: 7, name: 'Almanya', slug: 'almanya', flag: '🇩🇪',
    description: 'Modern şehirler ve zengin tarihle dolu Almanya\'ya seyahat için vize sürecinizi kolaylaştırıyoruz.',
    gradient: 'from-slate-500 to-slate-700',
  },
  {
    id: 8, name: 'İspanya', slug: 'ispanya', flag: '🇪🇸',
    description: 'Güneşli plajlar, canlı kültür ve lezzetli mutfak. İspanya vizesi için tüm belgeleri hazırlıyoruz.',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    id: 9, name: 'Yunanistan', slug: 'yunanistan', flag: '🇬🇷',
    description: 'Antik tarih ve muhteşem adaların buluştuğu Yunanistan\'a sorunsuz seyahat için yanınızdayız.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 10, name: 'Portekiz', slug: 'portekiz', flag: '🇵🇹',
    description: 'Atlantik kıyılarında unutulmaz bir deneyim için Portekiz vizesi başvurunuzu hızlandırıyoruz.',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 11, name: 'Avusturya', slug: 'avusturya', flag: '🇦🇹',
    description: 'Alp dağları ve klasik müziğin ülkesi Avusturya\'ya vize başvurunuzu hızlı tamamlıyoruz.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    id: 12, name: 'Belçika', slug: 'belcika', flag: '🇧🇪',
    description: 'Çikolata, waffle ve gotik mimarinin merkezi Belçika için başvurunuzu profesyonelce yönetiyoruz.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 13, name: 'İsviçre', slug: 'isvicre', flag: '🇨🇭',
    description: 'Alp manzaraları ve lüks yaşamın simgesi İsviçre\'ye vize başvurunuzu eksiksiz hazırlıyoruz.',
    gradient: 'from-red-400 to-red-600',
  },
  {
    id: 14, name: 'Danimarka', slug: 'danimarka', flag: '🇩🇰',
    description: 'Mutluluk ve tasarımın başkenti Kopenhag\'a seyahat için Danimarka vizesini kolaylaştırıyoruz.',
    gradient: 'from-red-500 to-red-700',
  },
  {
    id: 15, name: 'Finlandiya', slug: 'finlandiya', flag: '🇫🇮',
    description: 'Kuzeyin büyülü doğası ve modern şehirler. Finlandiya vizesi için tüm süreci yönetiyoruz.',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 16, name: 'Çekya', slug: 'cekya', flag: '🇨🇿',
    description: 'Orta Avrupa\'nın incisi Prag ve tarihi şehirler. Çekya vizesini hızlı ve sorunsuz tamamlıyoruz.',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    id: 17, name: 'Macaristan', slug: 'macaristan', flag: '🇭🇺',
    description: 'Tuna nehri kıyılarında Budapeşte\'nin büyüsü. Macaristan vizesi için gerekli tüm desteği sağlıyoruz.',
    gradient: 'from-green-600 to-green-800',
  },
  {
    id: 18, name: 'İngiltere', slug: 'ingiltere', flag: '🇬🇧',
    description: 'Tarih, kültür ve modern yaşamın buluştuğu İngiltere\'ye vize başvurunuzu profesyonel ekibimizle yönetiyoruz.',
    gradient: 'from-blue-700 to-blue-900',
  },
]
