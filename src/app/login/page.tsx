'use client'

import { Suspense, useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Globe2, Lock, Mail, ArrowRight, CheckCircle2, ShieldCheck, Clock3 } from 'lucide-react'

const perks = [
  { icon: CheckCircle2, text: '10\'dan fazla ülkede vize desteği' },
  { icon: ShieldCheck,  text: 'Belgeleriniz güvenle saklanır' },
  { icon: Clock3,       text: '7/24 uzman destek' },
]

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/countries')
    }
  }, [status, router])

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Hesabınız oluşturuldu! Şimdi giriş yapabilirsiniz.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) {
        setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.')
      } else {
        router.replace('/countries')
      }
    } catch {
      setError('Giriş yapılırken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  // Oturum yüklenirken veya zaten giriş yapılmışsa boş ekran göster
  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 via-white to-emerald-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg animate-pulse">
            <Globe2 className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-500 text-sm">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-slate-900 overflow-hidden">
        {/* blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Easy<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Viza</span>
            </span>
          </Link>

          {/* Headline */}
          <div className="max-w-lg">
            <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-6">
              Hayalinizdeki seyahate{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                vize engeli olmadan
              </span>{' '}
              ulaşın.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-10">
              Türkiye'nin en hızlı dijital vize platformuna hoş geldiniz. Başvurunuzu dakikalar içinde oluşturun.
            </p>

            <ul className="space-y-4">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Floating stat cards */}
          <div className="flex gap-4">
            {[
              { value: '1.500+', label: 'Tamamlanan Başvuru' },
              { value: '%98',    label: 'Onay Oranı' },
              { value: '10+',   label: 'Ülke' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 flex-1 text-center">
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-gradient-to-br from-lime-50 via-white to-emerald-50">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Globe2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900">
              Easy<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Viza</span>
            </span>
          </Link>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-1">Tekrar hoş geldiniz</h2>
          <p className="text-slate-500 mb-8">Hesabınıza giriş yapın.</p>

          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} required
                  placeholder="ornek@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">Şifre</label>
                <Link href="/forgot-password" className="text-xs text-green-600 hover:text-green-700 font-medium">
                  Şifremi Unuttum
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity shadow-lg shadow-green-200 text-sm"
            >
              {loading ? 'Giriş yapılıyor...' : (
                <><ArrowRight className="w-4 h-4" /> Giriş Yap</>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Hesabınız yok mu?{' '}
            <Link href="/register" className="text-green-600 font-bold hover:text-green-700">
              Ücretsiz Kayıt Ol
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-slate-400">
            © 2026 EasyViza Yazılım A.Ş. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
