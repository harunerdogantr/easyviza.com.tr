import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-green-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold text-green-500 lowercase tracking-tight">
              viza
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/about" className="text-slate-700 hover:text-green-600 transition-colors font-medium text-sm">
              Hakkımızda
            </Link>
            <Link href="/#how-it-works" className="text-slate-700 hover:text-green-600 transition-colors font-medium text-sm">
              Nasıl Çalışır
            </Link>
            <Link href="/blog" className="text-slate-700 hover:text-green-600 transition-colors font-medium text-sm">
              Blog
            </Link>
            <Link href="/#faq" className="text-slate-700 hover:text-green-600 transition-colors font-medium text-sm">
              SSS
            </Link>
          </div>

          {/* Right CTA Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-green-400 text-white rounded-full hover:bg-green-500 transition-all shadow-sm hover:shadow-md font-medium text-sm"
            >
              Bize Ulaşın
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

