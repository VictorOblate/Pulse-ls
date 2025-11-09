"use client"

import Link from 'next/link'
import Image from 'next/image'
import { formatDate, formatRelativeDate } from '@/lib/utils'
import { FiClock, FiUser } from 'react-icons/fi'

interface ArticleCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    coverImage: string
    coverImageAlt?: string
    category?: {
      title?: string
      slug?: { current?: string } | null
      color?: string | null
    } | null
    author: {
      name: string
      image?: string
    }
    publishedAt: string
  }
  featured?: boolean
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const categoryColor = post.category?.color || '#0ea5e9'
  const articlePath = `/article/${post.slug.current}`

  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
        <Link href={articlePath} className="block relative h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gray-100">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Geometric Accent */}
            <div className="absolute inset-0 opacity-40 mix-blend-soft-light">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
            </div>
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            {post.category?.slug?.current ? (
              <Link
                href={`/category/${post.category.slug.current}`}
                className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full mb-4 backdrop-blur-md bg-white/10 border border-white/20 transition-all hover:bg-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                {post.category.title || 'Uncategorized'}
              </Link>
            ) : (
              <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full mb-4 backdrop-blur-md bg-white/10 border border-white/20">
                {post.category?.title || 'Uncategorized'}
              </span>
            )}
            
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 line-clamp-3 group-hover:text-primary-300 transition">
              {post.title}
            </h2>
            
            {post.excerpt && (
              <p className="text-gray-200 mb-4 line-clamp-2 text-sm lg:text-base backdrop-blur-sm bg-black/20 p-4 rounded-lg">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-gray-300 backdrop-blur-sm bg-black/20 p-3 rounded-lg inline-flex">
              <div className="flex items-center space-x-2">
                <FiUser className="w-4 h-4" />
                <span>{post.author?.name || 'Author'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiClock className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {formatRelativeDate(post.publishedAt)}
                </time>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 relative">
      <Link href={articlePath} className="block">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
          
          {/* Geometric Accent */}
          <div className="absolute inset-0 opacity-30 mix-blend-soft-light">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-500/20 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
          </div>
        </div>
        
        <div className="p-5 relative">
          {post.category?.slug?.current ? (
            <Link
              href={`/category/${post.category.slug.current}`}
              className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full mb-3 text-white transition-all hover:shadow-md"
              style={{ backgroundColor: categoryColor }}
              onClick={(e) => e.stopPropagation()}
            >
              {post.category.title || 'Uncategorized'}
            </Link>
          ) : (
            <span
              className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full mb-3 text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {post.category?.title || 'Uncategorized'}
            </span>
          )}
          
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary-600 transition">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
            <span className="flex items-center space-x-1">
              <FiUser className="w-3 h-3" />
              <span>{post.author?.name || 'Author'}</span>
            </span>
            <time dateTime={post.publishedAt} className="text-gray-400">
              {formatRelativeDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  )
}
