import Link from 'next/link'
import { Send, MapPin, Play, ArrowUpRight } from 'lucide-react'
import { FAQAccordion } from '@/components/faq/FAQAccordion'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Vize almanın{' '}
                <span className="relative inline-block">
                  kolay yolu
                  <svg
                    className="absolute -top-2 -right-8 w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      strokeDasharray="4,4"
                      d="M12 19l-4-4"
                    />
                  </svg>
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl">
                Viza, vize başvurunu kolaylaştıran ve her adımda sana rehberlik eden dijital platformdur. Kolayca randevu al, doğru belgelerle zamanında başvur!
              </p>

              {/* Email Input Area */}
              <div className="bg-slate-100 rounded-2xl p-6 max-w-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Başvurunuzu aldık</p>
                    <p className="text-xs text-slate-500">En kısa sürede sizinle iletişime geçeceğiz.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="flex-1 px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-slate-700 placeholder-slate-400"
                  />
                  <button className="px-6 py-3 bg-green-400 text-white rounded-xl hover:bg-green-500 transition-all font-medium">
                    Gönder
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Image Gallery with Dashed Lines */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 relative">
                {/* SVG Dashed Lines Container */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 1 }}
                >
                  {/* Dashed line from top-left to top-right */}
                  <line
                    x1="25%"
                    y1="20%"
                    x2="75%"
                    y2="20%"
                    stroke="#4ade80"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                    fill="none"
                  />
                  {/* Dashed line from top-right to middle-right */}
                  <line
                    x1="75%"
                    y1="20%"
                    x2="75%"
                    y2="50%"
                    stroke="#4ade80"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                    fill="none"
                  />
                  {/* Dashed line from middle-right to bottom-left */}
                  <line
                    x1="75%"
                    y1="50%"
                    x2="25%"
                    y2="80%"
                    stroke="#4ade80"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                    fill="none"
                  />
                  
                  {/* Airplane icons along the path */}
                  <g transform="translate(50%, 20%)">
                    <path
                      d="M-8 -4 L0 0 L-8 4 L-6 0 Z"
                      fill="#4ade80"
                      transform="rotate(0)"
                    />
                  </g>
                  <g transform="translate(75%, 35%)">
                    <path
                      d="M-8 -4 L0 0 L-8 4 L-6 0 Z"
                      fill="#4ade80"
                      transform="rotate(90)"
                    />
                  </g>
                  <g transform="translate(50%, 65%)">
                    <path
                      d="M-8 -4 L0 0 L-8 4 L-6 0 Z"
                      fill="#4ade80"
                      transform="rotate(-45)"
                    />
                  </g>
                </svg>

                {/* Image 1 - Big Ben (Top Left) */}
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-lg bg-slate-200">
                    <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                      <span className="text-slate-500 text-sm">Big Ben</span>
                    </div>
                  </div>
                </div>

                {/* Image 2 - London Eye (Top Right) */}
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-lg bg-slate-200 relative">
                    <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                      <span className="text-blue-600 text-sm">London Eye</span>
                    </div>
                    {/* Play button icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Image 3 - Cologne Cathedral (Middle Right) */}
                <div className="relative col-start-2">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-lg bg-slate-200">
                    <div className="w-full h-full bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center">
                      <span className="text-amber-700 text-sm">Cologne</span>
                    </div>
                  </div>
                </div>

                {/* Image 4 - Colosseum (Bottom Left) */}
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-lg bg-slate-200 relative">
                    <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center">
                      <span className="text-orange-700 text-sm">Colosseum</span>
                    </div>
                    {/* Location pin icon */}
                    <div className="absolute bottom-3 left-3 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                      <MapPin className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Vize almak artık çok kolay
            </h2>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
              Viza'yla süreçleri senin için sadeleştiriyoruz — belgeler, adımlar ve tüm rehberlik burada olacak.
            </p>
          </div>

          {/* Country Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country) => (
              <div
                key={country.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col"
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
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                    {country.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 flex-1">
                    {country.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/visa/${country.slug || country.name.toLowerCase()}`}
                      className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm text-center"
                    >
                      Turistik Vize
                    </Link>
                    <Link
                      href="/login"
                      className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm text-center"
                    >
                      Vize Al
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Viza nasıl çalışır?
            </h2>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
              Vize süreci artık dijital. Viza ile belgelerinizi yükleyin, başvurunuzu yönetin, sonucu takip edin — hepsi tek platformda.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hiker Image */}
            <div className="relative">
              <div className="relative transform rotate-[-2deg]">
                {/* Subtle shadow/background effect */}
                <div className="absolute inset-0 bg-blue-200/30 rounded-3xl blur-xl transform translate-x-4 translate-y-4"></div>
                
                {/* Main image container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-200 aspect-[4/5]">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-green-400 to-emerald-500 flex items-center justify-center">
                    {/* Placeholder for hiker image - you can replace this with an actual image */}
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-white/90 text-sm font-medium">Hiker Image</p>
                      <p className="text-white/70 text-xs mt-2">Placeholder - Replace with actual image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Steps */}
            <div className="space-y-4">
              {/* Step 01 */}
              <div className="bg-lime-400 rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-lime-600 text-lg">
                    01
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-semibold text-lg">
                      Gitmek istediğiniz ülkeyi seçin
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className="bg-green-500 rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-green-600 text-lg">
                    02
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-semibold text-lg">
                      Ödeme yapın
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 03 */}
              <div className="bg-green-300 rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-green-600 text-lg">
                    03
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-semibold text-lg">
                      Belgelerinizi yükleyin
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 04 */}
              <div className="bg-green-800 rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-green-800 text-lg">
                    04
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg mb-3">
                      Başvurunuzu tamamlayın
                    </p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      E-vize ile başvuru yapılabilen ülkelerde işlemleri sizin adınıza biz tamamlıyoruz. Parmak izi veya fiziki evrak teslimi gerektiren vizelerde ise tüm belgelerinizi eksiksiz kontrol edip size teslim ediyor, sonraki adımlarda yönlendirme sağlıyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span className="text-sm font-medium text-green-500 mb-2 block">Blog</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                Vizeye dair her şey
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl">
                Vize süreçleri, belgeler ve seyahat ipuçları hakkında en güncel bilgiler burada.
              </p>
            </div>
            <Link
              href="/blog"
              className="px-6 py-3 bg-lime-400 text-slate-900 rounded-full hover:bg-lime-500 transition-all shadow-sm hover:shadow-md font-medium text-sm whitespace-nowrap"
            >
              Tümünü Gör
            </Link>
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

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-green-900 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-green-400 mb-3 block">
              Destek
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-lg text-white/80">
              Viza ile ilgili merak ettiğiniz her şey.
            </p>
          </div>

          {/* FAQ Accordion */}
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// FAQ data
const faqItems = [
  {
    id: 1,
    question: 'Viza nedir?',
    answer: 'Viza, vize başvuru süreçlerinizi dijitalleştiren ve kolaylaştıran bir platformdur. Belgelerinizi yükleyebilir, başvurularınızı takip edebilir ve tüm süreç boyunca rehberlik alabilirsiniz.',
  },
  {
    id: 2,
    question: 'Neden başvuru yaparken Viza\'yı kullanmalıyım?',
    answer: 'Viza ile başvuru yapmak size zaman kazandırır, belgelerinizi eksiksiz hazırlamanızı sağlar ve tüm süreç boyunca profesyonel destek alırsınız. E-vize başvurularında işlemleri sizin adınıza tamamlarız.',
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
    question: 'Başvuru belgelerini sisteme yükledikten sonra ne olacak?',
    answer: 'Belgelerinizi yükledikten sonra, ekibimiz belgelerinizi kontrol eder ve eksiklik varsa size bildirir. E-vize başvurularında işlemleri sizin adınıza tamamlarız. Parmak izi veya fiziki evrak teslimi gerektiren vizelerde ise belgelerinizi eksiksiz kontrol edip size teslim eder, sonraki adımlarda yönlendirme sağlarız.',
  },
]

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

// Countries data
const countries = [
  {
    id: 1,
    name: 'Hollanda',
    slug: 'hollanda',
    description: 'Randevular çabuk dolar, belgeler titizlik ister. Hollanda vizesine başvururken her adımda yanında olmak için buradayız.',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 2,
    name: 'İtalya',
    description: 'Roma sokaklarında kaybolmadan önce, belgelerin eksiksiz olduğundan emin ol. Çünkü iyi bir seyahat, sorunsuz bir başvuruyla başlar.',
    gradient: 'from-amber-400 to-amber-600',
  },
  {
    id: 3,
    name: 'Fransa',
    description: 'Şık sokaklar, tarihi yapılar ve leziz mutfağın ülkesi. Belgeler detaylı ama panik yok, hepsini adım adım açıklıyoruz.',
    gradient: 'from-indigo-400 to-indigo-600',
  },
  {
    id: 4,
    name: 'Polonya',
    description: 'Orta Avrupa\'nın kalbinde, tarihi şehirler ve eşsiz kültürle dolu Polonya seni bekliyor. Hızlı ve hatasız başvuru için yanınızdayız.',
    gradient: 'from-red-400 to-red-600',
  },
  {
    id: 5,
    name: 'İsveç',
    description: 'Mimari ve doğanın iç içe geçtiği İsveç\'e sorunsuz bir seyahate var mısın? Viza ile seyahatini kolayca planlayabilirsin.',
    gradient: 'from-yellow-400 to-yellow-600',
  },
  {
    id: 6,
    name: 'Norveç',
    description: 'Kuzey Işıklarının nefes kesen manzaralarını keşfetmeniz için vize başvuru sürecinizi güvence altına alıyoruz.',
    gradient: 'from-teal-400 to-teal-600',
  },
  {
    id: 7,
    name: 'Almanya',
    description: 'Modern şehirler ve zengin tarihle dolu Almanya\'ya seyahat etmek için vize başvuru sürecinizi kolaylaştırıyoruz.',
    gradient: 'from-slate-500 to-slate-700',
  },
  {
    id: 8,
    name: 'İspanya',
    description: 'Güneşli plajlar, canlı kültür ve lezzetli mutfak. İspanya vizesi için gerekli tüm belgeleri adım adım hazırlıyoruz.',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    id: 9,
    name: 'Yunanistan',
    description: 'Antik tarih ve muhteşem adaların buluştuğu Yunanistan\'a sorunsuz bir seyahat için vize başvurunuzu yönetiyoruz.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 10,
    name: 'Portekiz',
    description: 'Atlantik kıyılarında unutulmaz bir deneyim için Portekiz vizesi başvuru sürecinizi hızlandırıyoruz.',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 11,
    name: 'Avusturya',
    description: 'Alp dağları ve klasik müziğin ülkesi Avusturya\'ya vize başvurunuzu kolay ve hızlı bir şekilde tamamlıyoruz.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    id: 12,
    name: 'Belçika',
    description: 'Çikolata, waffle ve gotik mimarinin merkezi Belçika için vize başvuru sürecinizi profesyonelce yönetiyoruz.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 13,
    name: 'İsviçre',
    description: 'Alp manzaraları ve lüks yaşamın simgesi İsviçre\'ye vize başvurunuzu eksiksiz belgelerle hazırlıyoruz.',
    gradient: 'from-red-400 to-red-600',
  },
  {
    id: 14,
    name: 'Danimarka',
    description: 'Mutluluk ve tasarımın başkenti Kopenhag\'a seyahat için Danimarka vizesi başvurunuzu kolaylaştırıyoruz.',
    gradient: 'from-red-500 to-red-700',
  },
  {
    id: 15,
    name: 'Finlandiya',
    description: 'Kuzeyin büyülü doğası ve modern şehirler. Finlandiya vizesi için tüm süreci sizin için yönetiyoruz.',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 16,
    name: 'Çekya',
    description: 'Orta Avrupa\'nın incisi Prag ve tarihi şehirler. Çekya vizesi başvurunuzu hızlı ve sorunsuz tamamlıyoruz.',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    id: 17,
    name: 'Macaristan',
    description: 'Tuna nehri kıyılarında Budapeşte\'nin büyüsü. Macaristan vizesi için gerekli tüm desteği sağlıyoruz.',
    gradient: 'from-green-600 to-green-800',
  },
  {
    id: 18,
    name: 'İngiltere',
    description: 'Tarih, kültür ve modern yaşamın buluştuğu İngiltere\'ye vize başvurunuzu profesyonel ekibimizle yönetiyoruz.',
    gradient: 'from-blue-700 to-blue-900',
  },
]
