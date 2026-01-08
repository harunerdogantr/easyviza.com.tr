'use client'

import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    privacy: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Information */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
                Bize Ulaşın
              </h1>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Vize sürecinizin her adımında yanınızdayız.
              </p>
              <p className="text-lg text-slate-700 mb-12 leading-relaxed">
                Ekibimize ulaşmak için yandaki formu doldurabilir ya da doğrudan e-posta gönderebilirsiniz.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-medium">E-posta</p>
                    <a
                      href="mailto:hello@getviza.ai"
                      className="text-slate-700 hover:text-green-600 transition-colors"
                    >
                      hello@getviza.ai
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-medium">Adres</p>
                    <p className="text-slate-700">
                      Şehit Muhtar Mah. Mis Sk. No:24, Kat 5, İç Kapı No:28<br />
                      Beyoğlu/İstanbul
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="İsminizi yazınız"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-slate-900 placeholder-slate-400"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-posta adresinizi yazınız"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-slate-900 placeholder-slate-400"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mesajınızı yazınız.."
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-slate-900 placeholder-slate-400 resize-y"
                    required
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-400"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-slate-700">
                    Verilerinizi önemsiyoruz.{' '}
                    <a
                      href="/kvkk"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      Aydınlatma Metnini
                    </a>{' '}
                    okudum, kabul ediyorum.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-green-400 text-white rounded-xl hover:bg-green-500 transition-all font-medium text-lg shadow-sm hover:shadow-md"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}





