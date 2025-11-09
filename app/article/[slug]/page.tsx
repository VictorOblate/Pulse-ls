import { client, postFields, normalizePost, debugSanityQuery } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatDate, generateMetaTags, readingTime } from '@/lib/utils'
import PortableTextContent from '@/components/article/PortableTextContent'
import ShareButtons from '@/components/article/ShareButtons'
import VideoEmbed from '@/components/video/VideoEmbed'
import { AfterArticleAd, SidebarAd } from '@/components/ads/AdPlacements'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ArticleCard from '@/components/article/ArticleCard'
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      ${postFields}
    }`
    const post = await debugSanityQuery(query, { slug })
    return normalizePost(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getRelatedPosts(categoryId: string, currentPostId: string) {
  try {
    const posts = await client.fetch(
      `*[_type == "post" && $categoryId in categories[]._ref && _id != $currentPostId] | order(publishedAt desc)[0...3] {
        ${postFields}
      }`,
      { categoryId, currentPostId },
      { next: { revalidate: 60 } }
    )
    return (posts || []).map((p: any) => normalizePost(p)).filter(Boolean)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  const metaTitle = post.seo?.metaTitle || post.title
  const metaDescription = post.seo?.metaDescription || post.excerpt || post.title

  return generateMetaTags({
    title: metaTitle,
    description: metaDescription,
    image: post.coverImage,
    url: `/article/${params.slug}`,
    type: 'article',
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = post?.category?._id
    ? await getRelatedPosts(post.category._id, post._id)
    : []

  // Calculate reading time
  const bodyText = post.body
    .filter((block: any) => block._type === 'block')
    .map((block: any) => block.children?.map((child: any) => child.text).join(''))
    .join(' ')
  const estimatedReadingTime = readingTime(bodyText)

  // JSON-LD Schema for SEO
    const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Author',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pulse LS',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    description: post.excerpt || post.title,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: post.category?.title || 'Uncategorized', href: post.category?.slug?.current ? `/category/${post.category.slug.current}` : undefined },
              { label: post.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article Content */}
            <div className="lg:col-span-2">
              {/* Article Header */}
              <header className="mb-8">
                <CategoryBadge category={post.category} size="md" />
                
                <h1 className="text-4xl lg:text-5xl font-bold mt-4 mb-4 text-gray-900 leading-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b">
                  <div className="flex items-center space-x-2">
                      {post.author?.image ? (
                        <Image
                          src={post.author.image}
                          alt={post.author?.name || 'Author'}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                      )}
                    <div>
                      <div className="flex items-center space-x-1 font-medium text-gray-900">
                        <FiUser className="w-4 h-4" />
                        <span>{post.author?.name || 'Author'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <FiCalendar className="w-4 h-4" />
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <FiClock className="w-4 h-4" />
                    <span>{estimatedReadingTime} min read</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-6">
                  <ShareButtons
                    url={`/article/${params.slug}`}
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>
              </header>

              {/* Featured Image */}
              <figure className="mb-8 rounded-xl overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                )}
              </figure>

              {/* Featured Video */}
              {post.featuredVideo && (
                <VideoEmbed url={post.featuredVideo} />
              )}

              {/* Article Body */}
              <div className="prose prose-lg max-w-none article-content font-serif">
                <PortableTextContent value={post.body} insertAds />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* After Article Ad */}
              <AfterArticleAd />

              {/* Author Bio */}
              {post.author.bio && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    {post.author?.image ? (
                      <Image
                        src={post.author.image}
                        alt={post.author?.name || 'Author'}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold mb-2">{post.author?.name || 'Author'}</h3>
                      <div className="text-gray-600">
                        <PortableTextContent value={post.author?.bio} insertAds={false} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost: any) => (
                      <ArticleCard key={relatedPost._id} post={relatedPost} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <SidebarAd />
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
