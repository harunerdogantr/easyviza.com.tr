'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Globe2, User, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, Clock3, Eye, EyeOff } from 'lucide-react'
import { registerUserWithData } from '@/lib/actions/auth.actions'

const perks = [
  { icon: CheckCircle2, text: 'Dakikalar içinde başvuru oluşturun' },
  { icon: ShieldCheck,  text: 'Belgeleriniz şifreli ve güvende' },
  { icon: Clock3,       text: '7/24 uzman destek ekibi' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await registerUserWithData(formData)
      if (!result.success) {
        setError(result.error)
        return
      }
      router.push('/login?registered=true')
    } catch {
      setError('Kayıt sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = (() => {
    const p = formData.password
    if (!p) return null
    if (p.length < 6) return { label: 'Çok kısa', color: 'bg-red-400', width: 'w-1/4' }
    if (p.length < 8) return { label: 'Zayıf', color: 'bg-orange-400', width: 'w-2/4' }
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Orta', color: 'bg-yellow-400', width: 'w-3/4' }
    return { label: 'Güçlü', color: 'bg-green-500', width: 'w-full' }
  })()

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-slate-900 overflow-hidden">
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
              Vize başvurunuzu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                birlikte halledelim.
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-10">
              Hesap oluşturmak ücretsiz ve 60 saniye sürer. Hemen başlayın.
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

          {/* Stat cards */}
          <div className="flex gap-4">
            {[
              { value: 'Ücretsiz', label: 'Hesap oluşturma' },
              { value: '4 adım',  label: 'Başvuru süreci' },
              { value: '10+',     label: 'Ülke seçeneği' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 flex-1 text-center">
                <p className="text-xl font-extrabold text-white">{s.value}</p>
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

          <h2 className="text-3xl font-extrabold text-slate-900 mb-1">Hesap oluşturun</h2>
          <p className="text-slate-500 mb-8">Ücretsiz kayıt olun, vize başvurunuza başlayın.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Ad Soyad <span className="text-slate-400 font-normal">(opsiyonel)</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="name" name="name" type="text" value={formData.name}
                  onChange={handleChange} placeholder="Adınız Soyadınız"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email" name="email" type="email" value={formData.email}
                  onChange={handleChange} required placeholder="ornek@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password" name="password" type={showPass ? 'text' : 'password'}
                  value={formData.password} onChange={handleChange} required minLength={6}
                  placeholder="En az 6 karakter"
                  className="w-full pl-10 pr-11 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm"
                />
                <button
                  type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {passwordStrength && (
                <div className="mt-2">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`} />
                  </div>
                  <p className={`text-xs mt-1 font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity shadow-lg shadow-green-200 text-sm"
            >
              {loading ? 'Hesap oluşturuluyor...' : (
                <><ArrowRight className="w-4 h-4" /> Ücretsiz Hesap Oluştur</>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
            Kayıt olarak{' '}
            <Link href="/terms" className="underline hover:text-slate-600">Kullanım Koşullarını</Link>
            {' '}ve{' '}
            <Link href="/privacy" className="underline hover:text-slate-600">Gizlilik Politikasını</Link>
            {' '}kabul etmiş olursunuz.
          </p>

          <p className="mt-5 text-center text-sm text-slate-500">
            Zaten hesabınız var mı?{' '}
            <Link href="/login" className="text-green-600 font-bold hover:text-green-700">
              Giriş Yap
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
