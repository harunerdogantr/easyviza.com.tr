import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Blog posts data
const blogPosts = [
  {
    id: 1,
    slug: 'japonya-sakura-festivali-vize',
    category: 'Seyahat & İlham',
    title: 'Japonya Sakura Festivali: Türk Vatandaşlarına Vize Var mı?',
    description: 'Japonya Sakura Festivali için vize gerekiyor mu? Türk vatandaşlarının Japonya\'ya vizesiz giriş hakkı ve bilinmesi gerekenler bu yazıda.',
    imageGradient: 'from-pink-400 via-pink-500 to-blue-500',
    imagePlaceholder: 'Sakura Festival',
  },
  {
    id: 2,
    slug: 'gece-turizmi-noctourism',
    category: 'Seyahat & İlham',
    title: 'Gece Turizmi Nedir? Noctourism ile Gece Seyahatinin Yeni Yüzü',
    description: 'Gece turizmi (Noctourism) nedir? Astro turizmden gece müzeciliğine uzanan bu yeni seyahat trendini keşfet, gece rotalarına Viza ile hazırlan!',
    imageGradient: 'from-slate-800 via-green-600 to-emerald-500',
    imagePlaceholder: 'Northern Lights',
  },
  {
    id: 3,
    slug: 'soguk-havada-tatil-rotalari',
    category: 'Seyahat & İlham',
    title: 'Soğuk Havada Tatil Yapmak İsteyenlere Özel Rotalar',
    description: 'Kışın seyahat edebileceğiniz ülkeler ve soğuk havalarda keşif yapmanın en güzel rotaları bu rehberde sizi bekliyor!',
    imageGradient: 'from-blue-300 via-blue-400 to-cyan-500',
    imagePlaceholder: 'Winter Adventure',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
      <Navbar />

      {/* Blog Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="text-sm font-medium text-green-500 mb-2 block">Blog</span>
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-3">
              Vizeye dair her şey
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl">
              Vize süreçleri, belgeler ve seyahat ipuçları hakkında en güncel bilgiler burada.
            </p>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-100"
              >
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                  <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/80 text-sm font-medium">{post.imagePlaceholder}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <span className="inline-block text-xs font-medium text-green-500 mb-3">
                    {post.category}
                  </span>

                  {/* Title with Icon */}
                  <div className="flex items-start gap-2 mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-green-600 transition-colors flex-1">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-green-500 transition-colors flex-shrink-0 mt-1" />
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}





