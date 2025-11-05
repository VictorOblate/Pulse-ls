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
    category: {
      title: string
      slug: { current: string }
      color?: string
    }
    author: {
      name: string
      image?: string
    }
    publishedAt: string
  }
  featured?: boolean
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const categoryColor = post.category.color || '#0ea5e9'

  if (featured) {
    return (
      <Link href={`/article/${post.slug.current}`}>
        <article className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative h-96 lg:h-[500px] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
              <Link
                href={`/category/${post.category.slug.current}`}
                className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full mb-3"
                style={{ backgroundColor: categoryColor }}
                onClick={(e) => e.stopPropagation()}
              >
                {post.category.title}
              </Link>
              
              <h2 className="text-2xl lg:text-4xl font-bold mb-3 line-clamp-3 group-hover:text-primary-400 transition">
                {post.title}
              </h2>
              
              {post.excerpt && (
                <p className="text-gray-200 mb-4 line-clamp-2 text-sm lg:text-base">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <FiUser className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiClock className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>
                    {formatRelativeDate(post.publishedAt)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/article/${post.slug.current}`}>
      <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-5">
          <Link
            href={`/category/${post.category.slug.current}`}
            className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded mb-2"
            style={{ backgroundColor: categoryColor, color: 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            {post.category.title}
          </Link>
          
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary-600 transition">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <FiUser className="w-3 h-3" />
              <span>{post.author.name}</span>
            </span>
            <time dateTime={post.publishedAt}>
              {formatRelativeDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  )
}
