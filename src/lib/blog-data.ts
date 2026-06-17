export interface BlogPost {
  id: number
  slug: string
  category: string
  title: string
  description: string
  imageGradient: string
  imagePlaceholder: string
  readingTime: string
  date: string
  content: Section[]
}

export interface Section {
  type: 'paragraph' | 'heading' | 'list' | 'tip'
  text?: string
  items?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'japonya-sakura-festivali-vize',
    category: 'Seyahat & İlham',
    title: 'Japonya Sakura Festivali: Türk Vatandaşlarına Vize Var mı?',
    description:
      "Japonya Sakura Festivali için vize gerekiyor mu? Türk vatandaşlarının Japonya'ya vizesiz giriş hakkı ve bilinmesi gerekenler bu yazıda.",
    imageGradient: 'from-pink-400 via-pink-500 to-blue-500',
    imagePlaceholder: 'Sakura Festival',
    readingTime: '5 dk',
    date: '12 Mart 2025',
    content: [
      {
        type: 'paragraph',
        text: "Japonya'nın kiraz çiçeği (sakura) sezonu her yıl milyonlarca turist çekiyor. Türk vatandaşları olarak bu büyülü seyahati planlarken aklınıza gelen ilk soru: Japonya'ya vize gerekiyor mu?",
      },
      {
        type: 'heading',
        text: "Türk Vatandaşlarına Japonya Vizesi",
      },
      {
        type: 'paragraph',
        text: "Türk pasaportu sahipleri Japonya'ya seyahat etmek için vize almak zorundadır. Japonya, Türkiye ile karşılıklı vizesizlik anlaşması imzalamamıştır. Bu nedenle seyahat planınızı yaparken vize sürecini göz önünde bulundurmanız gerekir.",
      },
      {
        type: 'heading',
        text: 'Gerekli Belgeler',
      },
      {
        type: 'list',
        items: [
          'Geçerli pasaport (son geçerlilik tarihi seyahatten en az 6 ay sonra)',
          'Eksiksiz doldurulmuş vize başvuru formu',
          'Biyometrik fotoğraf (son 6 ay içinde çekilmiş)',
          'Uçak rezervasyonu (gidiş-dönüş)',
          'Konaklama belgesi (otel rezervasyonu veya davet mektubu)',
          'Banka hesap dökümü (son 3 aya ait)',
          'İş veya öğrenci belgesi',
          'Seyahat sigortası',
        ],
      },
      {
        type: 'heading',
        text: 'Sakura Sezonu Ne Zaman?',
      },
      {
        type: 'paragraph',
        text: 'Kiraz çiçeklerinin açış zamanı yıla ve konuma göre değişmekle birlikte genellikle mart sonu ile nisan başı arasındadır. Tokyo için tipik açılış tarihleri 20–30 Mart arası olup tam çiçeklenme 1–10 Nisan civarında gerçekleşir.',
      },
      {
        type: 'tip',
        text: "💡 İpucu: Sakura sezonu çok yoğun geçer. Vize başvurunuzu seyahatinizden en az 6–8 hafta önce yapmanızı, otel ve uçuş rezervasyonlarınızı ise mümkün olduğunca erken oluşturmanızı öneririz.",
      },
      {
        type: 'heading',
        text: 'Başvuru Süreci',
      },
      {
        type: 'paragraph',
        text: "Japonya vizesi için Ankara'daki Japonya Büyükelçiliği'ne veya İstanbul Başkonsolosluğu'na başvurabilirsiniz. Vize işlem süresi genellikle 5–7 iş günüdür. EasyViza olarak tüm belge hazırlık sürecinde yanınızdayız.",
      },
    ],
  },
  {
    id: 2,
    slug: 'gece-turizmi-noctourism',
    category: 'Seyahat & İlham',
    title: 'Gece Turizmi Nedir? Noctourism ile Gece Seyahatinin Yeni Yüzü',
    description:
      'Gece turizmi (Noctourism) nedir? Astro turizmden gece müzeciliğine uzanan bu yeni seyahat trendini keşfet, gece rotalarına Viza ile hazırlan!',
    imageGradient: 'from-slate-800 via-green-600 to-emerald-500',
    imagePlaceholder: 'Northern Lights',
    readingTime: '4 dk',
    date: '28 Şubat 2025',
    content: [
      {
        type: 'paragraph',
        text: "Gündüzlerin turistik yerlerde koşturmak yerine geceyi deneyimlemeyi tercih eden gezginlerin sayısı giderek artıyor. Noctourism (gece turizmi) olarak adlandırılan bu trend, seyahat dünyasında hızla yükselen bir akım haline geldi.",
      },
      {
        type: 'heading',
        text: 'Noctourism Nedir?',
      },
      {
        type: 'paragraph',
        text: 'Noctourism; gece manzaralarını, yıldız gözlemini, gece müzelerini, ışık festivallerini ve karanlıkta deneyimlenen kültürel etkinlikleri kapsayan bir seyahat biçimidir. Hem doğa hem şehir bazlı rotaları içerir.',
      },
      {
        type: 'heading',
        text: 'Popüler Noctourism Deneyimleri',
      },
      {
        type: 'list',
        items: [
          'Kuzey Işıkları (Aurora Borealis) — Norveç, Finlandiya, İzlanda',
          'Çöl gökyüzü gözlemi — Ürdün (Wadi Rum), Namibya',
          'Gece müzeciliği — Louvre\'un gece turları (Paris)',
          'Biolüminesans körfezi — Puerto Rico, Maldivler',
          'Işık festivalleri — Amsterdam Light Festival, Japonya Lantern Festivali',
          'Karanlık gökyüzü parkları — İspanya (Teide), İngiltere (Exmoor)',
        ],
      },
      {
        type: 'heading',
        text: 'Vize Planlaması',
      },
      {
        type: 'paragraph',
        text: 'Gece turizmi destinasyonlarının önemli bir kısmı Schengen bölgesinde yer almaktadır. Türk vatandaşları için bu ülkelere vize zorunludur. Aurora izlemek için Norveç, Finlandiya veya İsveç planı yapıyorsanız Schengen vizesi başvurusunu en az 8 hafta önceden yapmanız önerilir.',
      },
      {
        type: 'tip',
        text: '💡 İpucu: Kuzey Işıkları sezonu Eylül–Mart arasıdır. En iyi gözlem için ay olmayan ve bulutların az olduğu geceleri tercih edin.',
      },
      {
        type: 'heading',
        text: 'EasyViza ile Kolayca Başvurun',
      },
      {
        type: 'paragraph',
        text: 'Hangi destinasyonu seçerseniz seçin, EasyViza olarak vize başvurunuzun her adımında yanınızdayız. Belgelerinizi hazırlayın, bizim aracılığımızla eksiksiz başvurun.',
      },
    ],
  },
  {
    id: 3,
    slug: 'soguk-havada-tatil-rotalari',
    category: 'Seyahat & İlham',
    title: 'Soğuk Havada Tatil Yapmak İsteyenlere Özel Rotalar',
    description:
      'Kışın seyahat edebileceğiniz ülkeler ve soğuk havalarda keşif yapmanın en güzel rotaları bu rehberde sizi bekliyor!',
    imageGradient: 'from-blue-300 via-blue-400 to-cyan-500',
    imagePlaceholder: 'Winter Adventure',
    readingTime: '6 dk',
    date: '15 Ocak 2025',
    content: [
      {
        type: 'paragraph',
        text: 'Kış aylarında seyahat etmek, yaz kalabalığından kaçmak ve destinasyonları bambaşka bir atmosferde deneyimlemek için mükemmel bir fırsat sunar. Karlı manzaralar, ısınan çorbalar ve daha az kuyruğun tadını çıkarın.',
      },
      {
        type: 'heading',
        text: 'Kış Tatili İçin En İyi Rotalar',
      },
      {
        type: 'list',
        items: [
          'Prag (Çekya) — Kar altında Orta Çağ büyüsü, sıcak şarap festivalleri',
          'Viyana (Avusturya) — Yılbaşı pazarları ve klasik müzik konserleri',
          'Reykjavik (İzlanda) — Kuzey Işıkları ve jeotermal havuzlar',
          'Kopenhag (Danimarka) — Hygge kültürü, Tivoli kış parkı',
          'Sapporo (Japonya) — Dünyaca ünlü kar festivali (Şubat)',
          'Quebec Şehri (Kanada) — Kuzey Amerika\'nın en büyük kış karnavalı',
          'Tromsø (Norveç) — Aurora gözlemi ve kutup gecesi',
        ],
      },
      {
        type: 'heading',
        text: 'Kış Seyahatinin Avantajları',
      },
      {
        type: 'paragraph',
        text: 'Kış sezonunda uçak biletleri ve otel fiyatları yaz dönemine kıyasla %30–50 daha uygun olabilir. Popüler turistik mekânlar çok daha az kalabalıktır; böylece müzeler, restoranlar ve tarihi alanları daha sakin bir şekilde keşfedebilirsiniz.',
      },
      {
        type: 'heading',
        text: 'Kış Seyahatinde Dikkat Edilmesi Gerekenler',
      },
      {
        type: 'list',
        items: [
          'Su geçirmez ve katmanlı kıyafetler tercih edin',
          'Kar kayması veya dondurucu soğuk için ekipmanlarınızı hazırlayın',
          'Uçuş iptali ihtimaline karşı esnek bilet alın',
          'Kapsamlı seyahat sigortası yaptırın (kar fırtınası, iptaller)',
          'Gece erken çöktüğünden günlük planınızı buna göre yapın',
        ],
      },
      {
        type: 'heading',
        text: 'Vize Gereksinimleri',
      },
      {
        type: 'paragraph',
        text: 'Listedeki Avrupa destinasyonlarının büyük çoğunluğu Schengen bölgesindedir. Türk vatandaşları için Schengen vizesi zorunludur. İzlanda ve Norveç Schengen üyesi olmakla birlikte AB üyesi değildir; ancak Schengen vizesiyle giriş yapılabilir.',
      },
      {
        type: 'tip',
        text: "💡 İpucu: Kış seyahat planlaması için en uygun dönem Ekim–Kasım aylarıdır. Bu sayede hem vize başvurunuzu zamanında yapabilir hem de erken rezervasyon indirimlerinden yararlanabilirsiniz.",
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
