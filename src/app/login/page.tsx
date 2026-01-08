'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { User, Lock, Check } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Eğer kullanıcı zaten giriş yapmışsa countries sayfasına yönlendir
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/countries')
      router.refresh()
    }
  }, [status, session, router])

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Kayıt başarılı! Şimdi giriş yapabilirsiniz.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push('/countries')
        router.refresh()
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Promotional Section */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-green-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-900">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20 blur-sm"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold text-lime-400 lowercase tracking-tight">
                viza
              </span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="max-w-lg">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Hayallerinizdeki Ülkeye{' '}
              <span className="text-lime-400">Vize</span> Yolculuğu Burada Başlar.
            </h1>
            <p className="text-lg text-white/90 leading-relaxed mb-12">
              Kişisel vize asistanınız ile karmaşık süreçleri geride bırakın. Sizin için her adımı profesyonelce yönetiyoruz.
            </p>
          </div>

          {/* Features */}
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-lime-400" />
              <span className="text-white/90 font-medium">Hızlı Başvuru</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-lime-400" />
              <span className="text-white/90 font-medium">Güvenli Ödeme</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-lime-400" />
              <span className="text-white/90 font-medium">7/24 Destek</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-[40%] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Tekrar Hoş Geldiniz
          </h2>
          <p className="text-slate-600 mb-8">
            Devam etmek için hesabınıza giriş yapın.
          </p>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Username Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-900 mb-2"
              >
                E-posta veya Kullanıcı Adı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-400"
                  placeholder="Kullanıcı adınız..."
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-900"
                >
                  Şifre
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-slate-600 hover:text-green-600 transition-colors"
                >
                  Şifremi Unuttum
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm hover:shadow-md"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 mb-4">HESABINIZ YOK MU?</p>
            <Link
              href="/register"
              className="inline-block w-full px-6 py-3 border-2 border-slate-200 text-slate-900 rounded-xl hover:border-slate-300 transition-colors font-medium text-center"
            >
              Hemen Kayıt Ol
            </Link>
          </div>

          {/* Copyright */}
          <p className="mt-12 text-center text-xs text-slate-500">
            © 2026 GetViza.ai. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  )
}
