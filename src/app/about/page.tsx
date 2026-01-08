import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="text-sm font-medium text-green-500 mb-3 block">
              Hakkımızda
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 mb-6 max-w-4xl">
              Sınırları kaldırmak mümkün değil, ama süreci kolaylaştırmak mümkün.
            </h1>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl">
              Vize başvuru sürecini sizin için daha hızlı, anlaşılır ve kolay hale getiriyoruz.
            </p>
          </div>

          {/* Image Section */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-full h-[600px] bg-gradient-to-br from-slate-200 via-blue-200 to-emerald-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-sm font-medium">Waterfall Adventure Image</p>
                <p className="text-slate-500 text-xs mt-2">Placeholder - Replace with actual image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}





