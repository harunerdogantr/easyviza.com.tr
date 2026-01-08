import Link from 'next/link'
import { Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-lime-400 overflow-hidden">
      {/* Wave/Blob transition from dark green */}
      <div className="absolute top-0 left-0 right-0 h-24 -translate-y-24">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 105C96 90 192 60 288 50C384 40 480 50 576 55C672 60 768 60 864 65C960 70 1056 80 1152 85C1248 90 1344 90 1392 90L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#A3E635"
          />
        </svg>
      </div>

      {/* Decorative blobs */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-300/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-lime-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left - Logo */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-slate-900 lowercase tracking-tight">
                viza
              </span>
            </Link>
          </div>

          {/* Middle - Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link
              href="/about"
              className="text-slate-900 hover:text-slate-700 transition-colors font-medium text-sm"
            >
              Hakkımızda
            </Link>
            <Link
              href="/#how-it-works"
              className="text-slate-900 hover:text-slate-700 transition-colors font-medium text-sm"
            >
              Nasıl Çalışır
            </Link>
            <Link
              href="/blog"
              className="text-slate-900 hover:text-slate-700 transition-colors font-medium text-sm"
            >
              Blog
            </Link>
            <Link
              href="/#faq"
              className="text-slate-900 hover:text-slate-700 transition-colors font-medium text-sm"
            >
              SSS
            </Link>
          </div>

          {/* Right - Social Media Icons */}
          <div className="flex items-center justify-end gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-700">
              <Link
                href="/kvkk"
                className="hover:text-slate-900 transition-colors"
              >
                KVKK Aydınlatma Metni
              </Link>
              <Link
                href="/terms"
                className="hover:text-slate-900 transition-colors"
              >
                Kullanım Koşulları
              </Link>
              <Link
                href="/privacy"
                className="hover:text-slate-900 transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/cookies"
                className="hover:text-slate-900 transition-colors"
              >
                Çerez Politikası
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-xs text-slate-700">
              © 2025 Viza Yazılım A.Ş. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

