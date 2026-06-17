import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getBlogPost, blogPosts, type Section } from '@/lib/blog-data'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — EasyViza Blog`,
    description: post.description,
  }
}

function renderSection(section: Section, index: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 key={index} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          {section.text}
        </h2>
      )
    case 'paragraph':
      return (
        <p key={index} className="text-slate-700 leading-relaxed mb-5">
          {section.text}
        </p>
      )
    case 'list':
      return (
        <ul key={index} className="mb-6 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700">
              <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-green-500" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'tip':
      return (
        <div
          key={index}
          className="my-6 bg-green-50 border-l-4 border-green-400 rounded-r-xl p-5 text-slate-700 leading-relaxed"
        >
          {section.text}
        </div>
      )
    default:
      return null
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-72 md:h-96">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${post.imageGradient}`}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 pb-10 pt-28">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/20 rounded-full px-3 py-1 mb-4 w-fit">
            <Tag className="w-3.5 h-3.5" />
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-white/80 text-sm">
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} okuma
            </span>
          </div>
        </div>
      </section>

      {/* Article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-green-600 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Blog'a Dön
        </Link>

        {/* Content */}
        <div className="prose-like">
          {post.content.map((section, i) => renderSection(section, i))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Vize başvurunuzu kolaylaştıralım</h3>
          <p className="text-white/85 mb-6 max-w-md mx-auto">
            EasyViza ile belgelerinizi hazırlayın, başvurunuzu takip edin.
            Her adımda profesyonel destek.
          </p>
          <Link
            href="/register"
            className="inline-block px-7 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-lime-100 transition-colors shadow-md"
          >
            Ücretsiz Başlayın
          </Link>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6">İlgili Yazılar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-green-300 hover:shadow-md rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <div className={`h-36 bg-gradient-to-br ${rel.imageGradient} group-hover:scale-[1.02] transition-transform duration-300`} />
                  <div className="p-5">
                    <span className="text-xs font-medium text-green-500">{rel.category}</span>
                    <h4 className="text-base font-bold text-slate-800 mt-1 group-hover:text-green-700 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
