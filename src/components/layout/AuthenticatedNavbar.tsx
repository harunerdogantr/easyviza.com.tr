'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User, Bell, LogOut } from 'lucide-react'

export function AuthenticatedNavbar() {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with BETA badge */}
          <Link href="/countries" className="flex items-center relative">
            <span className="text-2xl font-bold text-green-400 lowercase tracking-tight">
              viza
            </span>
            <span className="absolute -top-1 left-[3.5rem] px-1.5 py-0.5 bg-green-100 text-green-500 text-[10px] font-semibold rounded leading-none">
              BETA
            </span>
          </Link>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Profile Icon - Inactive */}
            <button
              className="p-2 text-slate-400 cursor-not-allowed"
              disabled
              aria-label="Profil"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Notification Icon - Inactive */}
            <button
              className="p-2 text-slate-400 cursor-not-allowed"
              disabled
              aria-label="Bildirimler"
            >
              <Bell className="w-5 h-5" />
            </button>

            {/* Logout Icon - Active */}
            <button
              onClick={handleSignOut}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Çıkış Yap"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

