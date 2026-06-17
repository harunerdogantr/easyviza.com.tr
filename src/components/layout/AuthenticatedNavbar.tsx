'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Globe2, LayoutDashboard, FileText, LogOut, User, Menu, X, ChevronDown } from 'lucide-react'

export function AuthenticatedNavbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false) }, [pathname])

  const navLinks = [
    { label: 'Ülkeler', href: '/countries' },
    { label: 'Başvurularım', href: '/dashboard/applications' },
    { label: 'Belgelerim', href: '/dashboard/documents' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-white/90 backdrop-blur-sm border-b border-green-100/40'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5">

          {/* Logo */}
          <Link href="/countries" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
              <Globe2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Easy<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Viza</span>
            </span>
            <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full leading-none">BETA</span>
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === l.href ? 'text-green-700 bg-green-50' : 'text-slate-600 hover:text-green-700 hover:bg-green-50'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right — user menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                  {session?.user?.name?.[0]?.toUpperCase() ?? session?.user?.email?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <span className="font-medium text-slate-700 max-w-[120px] truncate">
                  {session?.user?.name ?? session?.user?.email}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 z-50">
                  <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    <LayoutDashboard className="w-4 h-4 text-slate-400" /> Hesabım
                  </Link>
                  <Link href="/dashboard/applications" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    <FileText className="w-4 h-4 text-slate-400" /> Başvurularım
                  </Link>
                  <div className="my-1 border-t border-slate-100" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${pathname === l.href ? 'text-green-700 bg-green-50' : 'text-slate-700 hover:bg-slate-50'}`}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
