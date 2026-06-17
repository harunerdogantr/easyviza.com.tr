'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MapPin, Phone, Clock3, MessageCircle, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const contactCards = [
  {
    icon: Mail,
    title: 'E-posta',
    value: 'destek@easyviza.com.tr',
    sub: '24 saat içinde yanıt',
    href: 'mailto:destek@easyviza.com.tr',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Phone,
    title: 'Telefon',
    value: '+90 850 123 45 67',
    sub: 'Pzt–Cum, 09:00–18:00',
    href: 'tel:+908501234567',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: MapPin,
    title: 'Adres',
    value: 'Maslak Mah. Büyükdere Cad. No:255',
    sub: 'Sarıyer / İstanbul',
    href: 'https://maps.google.com',
    color: 'from-teal-400 to-cyan-500',
  },
  {
    icon: Clock3,
    title: 'Çalışma Saatleri',
    value: 'Pzt – Cum: 09:00 – 18:00',
    sub: 'Hafta sonu: Kapalı',
    href: null,
    color: 'from-lime-400 to-green-500',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', privacy: false })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-lime-300/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-1.5 shadow-sm mb-8">
            <MessageCircle className="w-3.5 h-3.5 text-green-500" />
            <span className="text-sm font-medium text-slate-700">İletişim</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-5">
            Size nasıl{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              yardımcı olabiliriz?
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Vize sürecinizin her adımında yanınızdayız. Formdan mesaj gönderin ya da doğrudan bize ulaşın.
          </p>
        </div>
      </section>

      {/* ── Contact cards ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card) => {
            const inner = (
              <div key={card.title} className="group flex flex-col items-start p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{card.title}</p>
                <p className="text-slate-900 font-semibold text-sm leading-snug">{card.value}</p>
                <p className="text-slate-400 text-xs mt-0.5">{card.sub}</p>
                {card.href && (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-green-600 font-semibold group-hover:gap-1.5 transition-all">
                    Git <ArrowUpRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            )
            return card.href ? (
              <a key={card.title} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={card.title}>{inner}</div>
            )
          })}
        </div>
      </section>

      {/* ── Form + info ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Left info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Neden Biz?
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                Hızlı, güvenli ve{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">insan odaklı</span>
              </h2>
            </div>

            <ul className="space-y-5">
              {[
                { title: '24 Saatte Yanıt', desc: 'Mesajınızı aldıktan sonra 24 saat içinde dönüş yapıyoruz.' },
                { title: 'Uzman Ekip', desc: 'Her ülke için deneyimli vize danışmanlarımız mevcuttur.' },
                { title: 'Güvenli İletişim', desc: 'Verileriniz KVKK kapsamında korunur, üçüncü taraflarla paylaşılmaz.' },
                { title: '7/24 Destek', desc: 'Acil durumlar için e-posta veya telefon ile her an ulaşabilirsiniz.' },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                    <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Sosyal Medya</p>
              <div className="flex gap-3">
                {['Twitter', 'Instagram', 'LinkedIn'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-green-300 hover:text-green-700 transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center bg-green-50 border border-green-100 rounded-3xl p-12 gap-5">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Mesajınız iletildi!</h3>
                  <p className="text-slate-600">En geç 24 saat içinde e-posta adresinize dönüş yapacağız.</p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Yeni mesaj gönder
                </button>
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-8 md:p-10">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Mesaj Gönderin</h3>
                <p className="text-slate-500 text-sm mb-8">Tüm alanları doldurarak formu gönderin.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">İsim Soyisim</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Adınız Soyadınız"
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-posta</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ornek@email.com"
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Konu</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm bg-white transition"
                    >
                      <option value="">Konu seçin...</option>
                      <option value="vize-bilgi">Vize başvurusu hakkında bilgi</option>
                      <option value="teknik">Teknik sorun</option>
                      <option value="odeme">Ödeme ve fiyatlandırma</option>
                      <option value="iptal">İptal ve iade</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mesajınız</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mesajınızı buraya yazın..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm resize-none transition"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-4 h-4 accent-green-600 rounded"
                    />
                    <label htmlFor="privacy" className="text-sm text-slate-600 leading-relaxed">
                      <Link href="/kvkk" className="text-green-600 font-semibold hover:underline">Aydınlatma Metnini</Link>{' '}
                      okudum ve kişisel verilerimin işlenmesine onay veriyorum.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-2xl hover:opacity-90 disabled:opacity-60 transition-opacity shadow-md shadow-green-200 text-base"
                  >
                    {loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
