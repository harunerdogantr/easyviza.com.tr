'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Globe2, ArrowUpRight, BadgeCheck, Clock3, Sparkles, Filter } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const countries = [
  { id: 1,  name: 'Almanya',                  slug: 'almanya',     flag: '🇩🇪', visaType: 'Schengen',  duration: '5–10 gün', fee: '₺4.500', gradient: 'from-slate-500 to-slate-700',    description: 'Modern şehirler, zengin tarih ve güçlü ekonominin ülkesi. Almanya vizesi için tüm süreci kolaylaştırıyoruz.' },
  { id: 2,  name: 'Fransa',                   slug: 'fransa',      flag: '🇫🇷', visaType: 'Schengen',  duration: '7–15 gün', fee: '₺4.500', gradient: 'from-indigo-500 to-indigo-700',   description: 'Şık sokaklar, Eiffel Kulesi ve dünyaca ünlü mutfağıyla Fransa\'ya kolay başvuru.' },
  { id: 3,  name: 'Hollanda',                 slug: 'hollanda',    flag: '🇳🇱', visaType: 'Schengen',  duration: '5–10 gün', fee: '₺4.500', gradient: 'from-blue-400 to-blue-600',      description: 'Kanallar, lale tarlaları ve bisikletlerin şehri Amsterdam sizi bekliyor.' },
  { id: 4,  name: 'İtalya',                   slug: 'italya',      flag: '🇮🇹', visaType: 'Schengen',  duration: '7–15 gün', fee: '₺4.500', gradient: 'from-amber-400 to-amber-600',    description: 'Roma, Venedik, Floransa... İtalya vizesini eksiksiz belgelerle hazırlıyoruz.' },
  { id: 5,  name: 'İspanya',                  slug: 'ispanya',     flag: '🇪🇸', visaType: 'Schengen',  duration: '7–15 gün', fee: '₺4.500', gradient: 'from-orange-400 to-red-500',     description: 'Güneşli plajlar, flamenko ve lezzetli tapas. İspanya vizesi için yanınızdayız.' },
  { id: 6,  name: 'Avusturya',                slug: 'avusturya',   flag: '🇦🇹', visaType: 'Schengen',  duration: '5–10 gün', fee: '₺4.500', gradient: 'from-red-500 to-pink-500',       description: 'Alp dağları ve klasik müziğin ülkesi Avusturya vizesini hızlı tamamlıyoruz.' },
  { id: 7,  name: 'Belçika',                  slug: 'belcika',     flag: '🇧🇪', visaType: 'Schengen',  duration: '5–10 gün', fee: '₺4.500', gradient: 'from-yellow-400 to-orange-500',  description: 'Çikolata, waffle ve Avrupa Birliği\'nin kalbi Brüksel sizi bekliyor.' },
  { id: 8,  name: 'İsviçre',                  slug: 'isvicre',     flag: '🇨🇭', visaType: 'Schengen',  duration: '5–10 gün', fee: '₺5.500', gradient: 'from-red-400 to-red-600',       description: 'Alp manzaraları, lüks saatler ve sonsuz doğa. İsviçre vizesi için profesyonel destek.' },
  { id: 9,  name: 'Norveç',                   slug: 'norvec',      flag: '🇳🇴', visaType: 'Schengen',  duration: '7–15 gün', fee: '₺5.000', gradient: 'from-teal-400 to-cyan-500',      description: 'Kuzey Işıkları ve fiyortların ülkesine vizesiz gidin, biz halledelim.' },
  { id: 10, name: 'İsveç',                    slug: 'isvec',       flag: '🇸🇪', visaType: 'Schengen',  duration: '7–15 gün', fee: '₺4.500', gradient: 'from-yellow-500 to-amber-600',   description: 'IKEA\'nın, Spotify\'ın ve eşsiz doğanın ülkesine sorunsuz seyahat.' },
  { id: 11, name: 'Danimarka',                slug: 'danimarka',   flag: '🇩🇰', visaType: 'Schengen',  duration: '7–15 gün', fee: '₺4.500', gradient: 'from-red-500 to-red-700',       description: 'Mutluluk ülkesi Danimarka\'ya Kopenhag turu için vize başvurunuzu kolaylaştırıyoruz.' },
  { id: 12, name: 'Finlandiya',               slug: 'finlandiya',  flag: '🇫🇮', visaType: 'Schengen',  duration: '7–15 gün', fee: '₺4.500', gradient: 'from-blue-600 to-indigo-700',    description: 'Beyaz geceler ve aurora borealis için Finlandiya vizesi başvurusu.' },
  { id: 13, name: 'Polonya',                  slug: 'polonya',     flag: '🇵🇱', visaType: 'Schengen',  duration: '5–10 gün', fee: '₺3.500', gradient: 'from-red-400 to-red-600',       description: 'Orta Avrupa\'nın incisi Varşova ve Krakow için Polonya vizesi.' },
  { id: 14, name: 'Portekiz',                 slug: 'portekiz',    flag: '🇵🇹', visaType: 'Schengen',  duration: '7–15 gün', fee: '₺4.500', gradient: 'from-green-500 to-emerald-600',  description: 'Lizbon sokaklarında kaybolmak için Portekiz vizesini birlikte hazırlayalım.' },
  { id: 15, name: 'Yunanistan',               slug: 'yunanistan',  flag: '🇬🇷', visaType: 'Schengen',  duration: '5–10 gün', fee: '₺4.500', gradient: 'from-blue-500 to-cyan-500',      description: 'Santorini, Atina ve Ege adaları için Yunanistan Schengen vizesi.' },
  { id: 16, name: 'Çekya',                    slug: 'cekya',       flag: '🇨🇿', visaType: 'Schengen',  duration: '5–10 gün', fee: '₺3.500', gradient: 'from-blue-500 to-blue-700',      description: 'Prag\'ın büyülü sokaklarını keşfetmek için Çekya vizesi başvurusu.' },
  { id: 17, name: 'Birleşik Krallık',         slug: 'ingiltere',   flag: '🇬🇧', visaType: 'UK Vizesi', duration: '15–30 gün', fee: '₺8.000', gradient: 'from-blue-700 to-blue-900',     description: 'Londra\'dan İskoçya\'ya uzanan eşsiz kültür için UK vize başvurusu.' },
  { id: 18, name: 'Amerika Birleşik Devletleri', slug: 'abd',      flag: '🇺🇸', visaType: 'ABD Vizesi', duration: '30–60 gün', fee: '₺12.000', gradient: 'from-blue-600 to-indigo-700',  description: 'New York, Los Angeles, Miami... ABD vizesi için kapsamlı destek alın.' },
]

const visaTypes = ['Tümü', 'Schengen', 'UK Vizesi', 'ABD Vizesi']

export default function CountriesPage() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('Tümü')

  const filtered = countries.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchType = activeType === 'Tümü' || c.visaType === activeType
    return matchSearch && matchType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-lime-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-1.5 shadow-sm mb-7">
            <Sparkles className="w-3.5 h-3.5 text-green-500" />
            <span className="text-sm font-medium text-slate-700">{countries.length} ülkede vize desteği</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-5">
            Hangi ülkeye{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              gitmek istiyorsun?
            </span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto mb-10">
            Schengen'den ABD'ye, İngiltere'den Japonya'ya — doğru belge, uzman rehberlik ve hızlı başvuru tek platformda.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Ülke ara... (örn: Almanya, Fransa)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-base"
            />
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
              <Filter className="w-4 h-4" /> Vize tipi:
            </span>
            {visaTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  activeType === type
                    ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-green-300 hover:text-green-700'
                }`}
              >
                {type}
              </button>
            ))}
            <span className="ml-auto text-sm text-slate-500 font-medium">{filtered.length} ülke listelendi</span>
          </div>

          {/* Cards grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((country) => (
                <div
                  key={country.id}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Banner */}
                  <div className={`h-36 bg-gradient-to-br ${country.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-6xl drop-shadow-md">{country.flag}</span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    {/* Visa type badge */}
                    <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
                      {country.visaType}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">{country.name}</h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 transition-colors flex-shrink-0 mt-0.5" />
                    </div>

                    <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                      {country.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock3 className="w-3.5 h-3.5 text-slate-400" /> {country.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5 text-green-500" /> {country.fee}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/visa/${country.slug}`}
                        className="flex-1 text-center px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
                      >
                        Detaylar
                      </Link>
                      <Link
                        href={`/payment?country=${country.slug}&type=${encodeURIComponent(country.visaType)}`}
                        className="flex-1 text-center px-3 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
                      >
                        Vize Al
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Sonuç bulunamadı</h3>
              <p className="text-slate-500 text-sm">"{search}" için bir ülke bulunamadı. Farklı bir arama deneyin.</p>
              <button onClick={() => { setSearch(''); setActiveType('Tümü') }} className="mt-6 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Info banner ── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Globe2, title: `${countries.length}+ Ülke`, desc: 'Sürekli genişleyen destinasyon listesi' },
              { icon: BadgeCheck, title: '%98 Onay', desc: 'Yüksek başvuru başarı oranı' },
              { icon: Clock3, title: '24s Yanıt', desc: '7/24 uzman destek ekibi' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-extrabold text-white">{title}</p>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
