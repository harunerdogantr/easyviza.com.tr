import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { blogPosts } from '@/lib/blog-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — EasyViza',
  description: 'Vize süreçleri, belgeler ve seyahat ipuçları hakkında en güncel bilgiler.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <span className="text-sm font-semibold text-green-500 mb-3 block tracking-wide uppercase">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Vizeye dair her şey
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Vize süreçleri, belgeler ve seyahat ipuçları hakkında en güncel bilgiler burada.
            </p>
          </div>

          {/* Featured Post */}
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="group block mb-12 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div
                className={`h-64 lg:h-auto bg-gradient-to-br ${blogPosts[0].imageGradient} group-hover:scale-[1.02] transition-transform duration-500`}
              />
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block text-xs font-semibold text-green-500 mb-4 uppercase tracking-wide">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-green-700 transition-colors mb-4 leading-snug">
                  {blogPosts[0].title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {blogPosts[0].description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span>{blogPosts[0].date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blogPosts[0].readingTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Oku <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-100"
              >
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${post.imageGradient} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-green-500 uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 mb-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors flex-1 leading-snug">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-green-500 transition-colors flex-shrink-0 mt-0.5" />
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  <p className="mt-4 text-xs text-slate-400">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
