import { client, postFields, normalizePost, debugSanityQuery } from '@/lib/sanity'
import ArticleCard from '@/components/article/ArticleCard'
import { HeaderAd, SidebarAd } from '@/components/ads/AdPlacements'
import { Suspense } from 'react'
import { ArticleListSkeleton, FeaturedArticleSkeleton } from '@/components/ui/Skeletons'

async function getFeaturedPost() {
  try {
    const query = `*[_type == "post" && featured == true] | order(publishedAt desc)[0] {
      ${postFields}
    }`
    const post = await debugSanityQuery(query, {})
    return normalizePost(post)
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return null
  }
}

async function getLatestPosts(limit: number = 9) {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
      ${postFields}
    }`
    const posts = await debugSanityQuery(query, {})
    return (posts || []).map((p: any) => normalizePost(p)).filter(Boolean)
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return []
  }
}

async function getCategoryPosts(categorySlug: string, limit: number = 4) {
  try {
    const posts = await client.fetch(
      `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc)[0...${limit}] {
        ${postFields}
      }`,
      { categorySlug },
      { next: { revalidate: 60 } }
    )
    return (posts || []).map((p: any) => normalizePost(p)).filter(Boolean)
  } catch (error) {
    console.error('Error fetching category posts:', error)
    return []
  }
}

export default async function HomePage() {
  const [featuredPost, latestPosts] = await Promise.all([
    getFeaturedPost(),
    getLatestPosts(9),
  ])

  return (
    <div className="min-h-screen">
      {/* Header Ad */}
      <HeaderAd />

      <div className="container mx-auto px-4 py-8">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-12">
            <Suspense fallback={<FeaturedArticleSkeleton />}>
              <ArticleCard post={featuredPost} featured />
            </Suspense>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Latest News Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
              </div>
              
              <Suspense fallback={<ArticleListSkeleton count={6} />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestPosts.slice(0, 6).map((post: any) => (
                    <ArticleCard key={post._id} post={post} />
                  ))}
                </div>
              </Suspense>
            </section>

            {/* More Articles */}
            {latestPosts.length > 6 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">More Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestPosts.slice(6, 9).map((post: any) => (
                    <ArticleCard key={post._id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <SidebarAd />
            
            {/* Trending/Popular Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4 border-b pb-3">Trending Now</h3>
              <div className="space-y-4">
                {latestPosts.slice(0, 5).map((post: any, index: number) => (
                  <a
                    key={post._id}
                    href={`/article/${post.slug.current}`}
                    className="flex space-x-3 group"
                  >
                    <span className="text-2xl font-bold text-primary-600 flex-shrink-0">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-sm mb-4 text-primary-100">
                Get the latest news delivered to your inbox
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-primary-600 font-semibold py-2 rounded hover:bg-gray-100 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
