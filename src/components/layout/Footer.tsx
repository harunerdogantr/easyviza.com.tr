import Link from 'next/link'
import { Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

const navLinks = {
  platform: [
    { label: 'Ülkeler', href: '/countries' },
    { label: 'Nasıl Çalışır', href: '/#how-it-works' },
    { label: 'Fiyatlandırma', href: '/payment' },
    { label: 'Blog', href: '/blog' },
    { label: 'SSS', href: '/#faq' },
  ],
  company: [
    { label: 'Hakkımızda', href: '/about' },
    { label: 'İletişim', href: '/contact' },
    { label: 'Kariyer', href: '/about' },
    { label: 'Basın', href: '/about' },
  ],
  legal: [
    { label: 'KVKK Aydınlatma Metni', href: '/kvkk' },
    { label: 'Kullanım Koşulları', href: '/terms' },
    { label: 'Gizlilik Politikası', href: '/privacy' },
    { label: 'Çerez Politikası', href: '/cookies' },
  ],
}

const socials = [
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
]

const countries = ['🇩🇪 Almanya', '🇫🇷 Fransa', '🇳🇱 Hollanda', '🇮🇹 İtalya', '🇪🇸 İspanya', '🇦🇹 Avusturya', '🇧🇪 Belçika', '🇨🇭 İsviçre']

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      {/* Top band — newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Vize haberlerini kaçırma</h3>
              <p className="text-slate-400 text-sm">Yeni ülkeler, kampanyalar ve duyurular doğrudan gelen kutuna gelsin.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand column — 2 cols wide */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Easy<span className="text-green-400">Viza</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Türkiye'nin dijital vize platformu. 10'dan fazla ülkeye kolay, hızlı ve güvenli vize başvurusu yapın.
            </p>

            {/* Contact info */}
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="mailto:destek@easyviza.com.tr" className="hover:text-white transition-colors">
                  destek@easyviza.com.tr
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="tel:+908501234567" className="hover:text-white transition-colors">
                  +90 850 123 45 67
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Maslak Mah. Büyükdere Cad. No:255<br />Sarıyer / İstanbul</span>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex gap-3 pt-1">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-green-500 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">Platform</h4>
            <ul className="space-y-3">
              {navLinks.platform.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                    {l.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">Şirket</h4>
            <ul className="space-y-3">
              {navLinks.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                    {l.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">Yasal</h4>
            <ul className="space-y-3">
              {navLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Countries row */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Desteklenen Ülkeler</p>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs"
              >
                {c}
              </span>
            ))}
            <Link
              href="/countries"
              className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs hover:bg-green-500/30 transition-colors"
            >
              +10 daha →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © 2026 EasyViza Yazılım A.Ş. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-slate-500 text-xs">Tüm sistemler çalışıyor</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
