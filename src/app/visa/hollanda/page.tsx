import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Plane, Calendar, MapPin, XCircle } from 'lucide-react'
import { FAQAccordion } from '@/components/faq/FAQAccordion'

export default function HollandVisaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner Section */}
      <section className="relative h-[400px] md:h-[500px] -mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <p className="text-white/80 text-sm font-medium">Netherlands Cityscape</p>
              <p className="text-white/60 text-xs mt-2">Placeholder - Replace with actual image</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4">
            Hollanda Vizesi
          </h1>
        </div>
      </section>

      {/* Key Visa Information */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vize Türü */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-600 mb-2">Vize Türü:</p>
              <p className="text-lg font-bold text-slate-900">C-Tipi Turistik Vize</p>
            </div>

            {/* Vize Tipi */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-600 mb-2">Vize Tipi:</p>
              <p className="text-lg font-bold text-slate-900">Kısa Süreli Vize (90 Gün)</p>
            </div>

            {/* Giriş Durumu */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-600 mb-2">Giriş Durumu:</p>
              <p className="text-lg font-bold text-slate-900">Çoklu Giriş</p>
            </div>
          </div>
        </div>
      </section>

      {/* General Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Hollanda Vizesi Hakkında Genel Bilgiler
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Türk vatandaşlarından bordo (umumi) pasaport sahiplerinin Hollanda'ya turistik veya kısa süreli (90 günü aşmayan) ziyaretlerinde vize almaları gerekmektedir.
            </p>
            <p>
              Birden fazla Schengen ülkesini ziyaret edecekseniz, Hollanda'nın en uzun süre kalacağınız ülke olması veya eşit sürelerde kalacaksanız Schengen bölgesine ilk giriş yapacağınız ülke olması gerekmektedir.
            </p>
          </div>
        </div>
      </section>

      {/* Application Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-medium text-green-500 mb-3 block">
            Vize Başvuru Süreç Takvimi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Hollanda Vizesi Başvuru Adımları
          </h2>
          
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Başvuru Formunu Doldurun',
                description: 'Online başvuru formunu eksiksiz ve doğru bilgilerle doldurun. Tüm alanların doldurulması gerekmektedir.',
              },
              {
                step: '02',
                title: 'Gerekli Belgeleri Hazırlayın',
                description: 'Pasaport, fotoğraf, seyahat sigortası, uçak rezervasyonu ve konaklama belgelerinizi hazırlayın.',
              },
              {
                step: '03',
                title: 'Randevu Alın',
                description: 'Hollanda Konsolosluğu veya yetkili vize başvuru merkezinden randevu alın.',
              },
              {
                step: '04',
                title: 'Belgelerinizi Teslim Edin',
                description: 'Randevu gününde tüm belgelerinizi eksiksiz olarak teslim edin ve biyometrik verilerinizi verin.',
              },
              {
                step: '05',
                title: 'Başvuru Sonucunu Takip Edin',
                description: 'Başvurunuzun durumunu online olarak takip edebilirsiniz. Ortalama işlem süresi 15 iş günüdür.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{item.step}</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rejection Reasons */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <XCircle className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Hollanda Vizesi Red Nedenleri
            </h2>
          </div>
          
          <div className="space-y-4">
            {[
              'Eksik veya yanlış belgeler',
              'Yetersiz finansal durum kanıtı',
              'Seyahat amacının belirsiz olması',
              'Pasaport geçerlilik süresinin yetersiz olması',
              'Schengen bölgesinden dönmeme riski',
              'Seyahat sigortasının eksik olması',
              'Konaklama rezervasyonunun olmaması',
              'Uçak rezervasyonunun olmaması',
            ].map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-200 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                </div>
                <p className="text-lg text-slate-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-900 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-green-400 mb-3 block">
              Destek
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Hollanda Vizesi Hakkında Merak Edilenler
            </h2>
            <p className="text-lg text-white/80">
              Hollanda vizesi ile ilgili merak ettiğiniz her şey.
            </p>
          </div>

          {/* FAQ Accordion */}
          <FAQAccordion items={[
            {
              id: 1,
              question: 'Hollanda vizesi için başvuru süresi ne kadar?',
              answer: 'Hollanda vizesi başvuruları için önerilen süre, seyahat tarihinden en az 15 iş günü öncedir. Ancak yoğun dönemlerde bu süre 30 iş gününe kadar uzayabilir.',
            },
            {
              id: 2,
              question: 'Hollanda vizesi için seyahat sigortası zorunlu mu?',
              answer: 'Evet, Hollanda vizesi başvurusu için minimum 30.000 Euro teminatlı seyahat sigortası zorunludur. Sigorta tüm Schengen bölgesini kapsamalıdır.',
            },
            {
              id: 3,
              question: 'Hollanda vizesi ile hangi ülkelere gidebilirim?',
              answer: 'Hollanda vizesi Schengen vizesidir ve tüm Schengen ülkelerinde geçerlidir. Ancak ana seyahat amacınız Hollanda olmalıdır.',
            },
            {
              id: 4,
              question: 'Vize başvurusu için randevu nasıl alınır?',
              answer: 'Randevu, Hollanda Konsolosluğu veya yetkili vize başvuru merkezinin online sisteminden alınabilir. Randevu tarihleri genellikle 2-4 hafta içinde müsait olmaktadır.',
            },
            {
              id: 5,
              question: 'Hollanda vizesi reddedilirse ne yapmalıyım?',
              answer: 'Vize reddi durumunda, red gerekçelerini inceleyerek eksiklikleri tamamlayıp yeniden başvuru yapabilirsiniz. Ayrıca itiraz hakkınız da bulunmaktadır.',
            },
          ]} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

