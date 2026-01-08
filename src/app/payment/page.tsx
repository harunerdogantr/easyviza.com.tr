'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, Lock, Info, ArrowLeft, Tag, AlertTriangle } from 'lucide-react'
import { AuthenticatedNavbar } from '@/components/layout/AuthenticatedNavbar'

export default function PaymentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    promoCode: '',
  })
  const [loading, setLoading] = useState(false)

  // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-lime-50 flex items-center justify-center">
        <div className="text-slate-600">Yükleniyor...</div>
      </div>
    )
  }

  // Eğer giriş yapılmamışsa hiçbir şey gösterme (yönlendirme yapılacak)
  if (status === 'unauthenticated') {
    return null
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData({ ...formData, cardNumber: formatted })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    setFormData({ ...formData, expiryDate: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Payment processing logic here
    setTimeout(() => {
      setLoading(false)
      router.push('/dashboard/apply')
    }, 2000)
  }


  return (
    <div className="min-h-screen bg-lime-50">
      <AuthenticatedNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Payment Details */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Ödeme Bilgileri
            </h2>
            <p className="text-slate-600 mb-6">Kart Bilgileri</p>

            {/* Credit Card Visual */}
            <div className="relative mb-8 h-48 bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white overflow-hidden">
              {/* Wave Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/30 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-400/20 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-10 bg-orange-500 rounded flex items-center justify-center">
                    <div className="w-8 h-6 bg-orange-400 rounded-sm"></div>
                  </div>
                  <span className="text-xl font-bold">viza</span>
                </div>

                {/* Card Number */}
                <div className="text-2xl font-mono tracking-wider">
                  {formData.cardNumber || '0000 0000 0000 0000'}
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/70 mb-1">AD SOYAD</p>
                    <p className="text-sm font-medium">
                      {formData.cardName || 'AD SOYAD'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/70 mb-1">AA/YY</p>
                    <p className="text-sm font-medium">
                      {formData.expiryDate || 'AA/YY'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Kart Numarası
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                  required
                />
              </div>

              {/* Card Name */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Kart Üzerindeki İsim
                </label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => setFormData({ ...formData, cardName: e.target.value.toUpperCase() })}
                  placeholder="AD SOYAD"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                  required
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Son Kullanma
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="AA/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                    placeholder="..."
                    maxLength={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Security Message */}
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Check className="w-5 h-5" />
                <span>Kart bilgileriniz 256-bit SSL ile güvenli şekilde şifrelenir</span>
              </div>
            </form>
          </div>

          {/* Right Panel - Payment Summary */}
          <div className="bg-lime-100 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Ödeme Özeti
            </h2>

            {/* Amount Display */}
            <div className="bg-green-600 rounded-xl p-6 mb-6 text-white">
              <div className="text-5xl font-bold mb-2">€200</div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Info className="w-4 h-4" />
                <span>TCMB kuru ile TL tahsil edilir</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4 mb-6 pb-6 border-b border-slate-300">
              <div className="flex justify-between text-slate-700">
                <span>Hizmet Ücreti:</span>
                <span className="font-medium">€200</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-lg">
                <span>Toplam:</span>
                <span>€200</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-slate-600" />
                <label className="text-sm font-medium text-slate-900">
                  Promosyon Kodu
                </label>
              </div>
              <input
                type="text"
                value={formData.promoCode}
                onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                placeholder="Kod giriniz"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 placeholder-slate-400"
              />
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Konsolosluk vize harcı ayrıca ödenir.
                </p>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg mb-4 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              {loading ? 'İşleniyor...' : 'Güvenli Ödeme Yap'}
            </button>

            {/* Security Feature */}
            <div className="flex items-center gap-2 text-sm text-green-700 mb-6">
              <Check className="w-5 h-5" />
              <span>3D Secure ile korunan ödeme</span>
            </div>

            {/* Additional Links */}
            <div className="space-y-3">
              <Link
                href="/terms"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>Hizmet kapsamını görüntüle</span>
              </Link>
              <Link
                href="/countries"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri Dön</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

