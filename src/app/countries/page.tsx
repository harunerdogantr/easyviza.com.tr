'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthenticatedNavbar } from '@/components/layout/AuthenticatedNavbar'
import { Footer } from '@/components/layout/Footer'

// Countries data
const countries = [
  {
    id: 1,
    name: 'Almanya',
    slug: 'almanya',
    description: 'Almanya Schengen vizesi ile Avrupa kapılarını aralayın. Viza ile seyahatinizi kolayca planlayın ve tatilin keyfini çıkarın.',
    gradient: 'from-slate-500 to-slate-700',
    visaType: 'Schengen Visa',
  },
  {
    id: 2,
    name: 'Amerika Birleşik Devletleri',
    slug: 'amerika',
    description: 'ABD vizesi gözünüzü korkutmasın. Viza ile başvuru sürecinizi kolaylaştırın ve New York\'un ışıltılı sokaklarının keyfini çıkarın.',
    gradient: 'from-blue-500 to-blue-700',
    visaType: 'USA Visa',
  },
  {
    id: 3,
    name: 'Birleşik Krallık',
    slug: 'ingiltere',
    description: 'Birleşik Krallık seyahatinizi planlarken vize sürecinizi güvence altına alın ve unutulmaz bir deneyim için hazır olun.',
    gradient: 'from-indigo-500 to-indigo-700',
    visaType: 'UK Visa',
  },
  {
    id: 4,
    name: 'Hollanda',
    slug: 'hollanda',
    description: 'Randevular çabuk dolar, belgeler titizlik ister. Hollanda vizesine başvururken her adımda yanında olmak için buradayız.',
    gradient: 'from-blue-400 to-blue-600',
    visaType: 'Schengen Visa',
  },
  {
    id: 5,
    name: 'İtalya',
    slug: 'italya',
    description: 'Roma sokaklarında kaybolmadan önce, belgelerin eksiksiz olduğundan emin ol. Çünkü iyi bir seyahat, sorunsuz bir başvuruyla başlar.',
    gradient: 'from-amber-400 to-amber-600',
    visaType: 'Schengen Visa',
  },
  {
    id: 6,
    name: 'Fransa',
    slug: 'fransa',
    description: 'Şık sokaklar, tarihi yapılar ve leziz mutfağın ülkesi. Belgeler detaylı ama panik yok, hepsini adım adım açıklıyoruz.',
    gradient: 'from-indigo-400 to-indigo-600',
    visaType: 'Schengen Visa',
  },
  {
    id: 7,
    name: 'İspanya',
    slug: 'ispanya',
    description: 'Güneşli plajlar, canlı kültür ve lezzetli mutfak. İspanya vizesi için gerekli tüm belgeleri adım adım hazırlıyoruz.',
    gradient: 'from-orange-400 to-red-500',
    visaType: 'Schengen Visa',
  },
  {
    id: 8,
    name: 'Yunanistan',
    slug: 'yunanistan',
    description: 'Antik tarih ve muhteşem adaların buluştuğu Yunanistan\'a sorunsuz bir seyahat için vize başvurunuzu yönetiyoruz.',
    gradient: 'from-blue-500 to-cyan-500',
    visaType: 'Schengen Visa',
  },
  {
    id: 9,
    name: 'Portekiz',
    slug: 'portekiz',
    description: 'Atlantik kıyılarında unutulmaz bir deneyim için Portekiz vizesi başvuru sürecinizi hızlandırıyoruz.',
    gradient: 'from-green-500 to-emerald-600',
    visaType: 'Schengen Visa',
  },
]

export default function CountriesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Yükleniyor...</div>
      </div>
    )
  }

  // Eğer giriş yapılmamışsa hiçbir şey gösterme (yönlendirme yapılacak)
  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AuthenticatedNavbar />

      {/* Main Content */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Vize almak artık çok kolay
            </h1>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
              Viza'yla süreçleri senin için sadeleştiriyoruz — belgeler, adımlar ve tüm rehberlik burada olacak.
            </p>
          </div>

          {/* Country Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country) => (
              <div
                key={country.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                  <div className={`w-full h-full bg-gradient-to-br ${country.gradient}`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/80 text-sm font-medium">{country.name}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Country Name */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {country.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 flex-1">
                    {country.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/payment?country=${country.slug}&type=${encodeURIComponent(country.visaType)}`}
                      className="flex-1 px-4 py-2.5 bg-lime-100 text-green-700 rounded-lg hover:bg-lime-200 transition-colors font-medium text-sm text-center"
                    >
                      {country.visaType}
                    </Link>
                    <Link
                      href={`/payment?country=${country.slug}&type=${encodeURIComponent(country.visaType)}`}
                      className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm text-center"
                    >
                      Viza Al ile Sürecinizi Yönetin
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

