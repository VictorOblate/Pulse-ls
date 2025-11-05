import { client, postFields } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/article/ArticleCard'
import { HeaderAd, SidebarAd } from '@/components/ads/AdPlacements'
import Breadcrumb from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

async function getCategory(slug: string) {
  try {
    const category = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        color
      }`,
      { slug },
      { next: { revalidate: 60 } }
    )
    return category
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

async function getCategoryPosts(categorySlug: string) {
  try {
    const posts = await client.fetch(
      `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
        ${postFields}
      }`,
      { categorySlug },
      { next: { revalidate: 60 } }
    )
    return posts
  } catch (error) {
    console.error('Error fetching category posts:', error)
    return []
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategory(params.slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} News`,
    description: category.description || `Read the latest ${category.title.toLowerCase()} news and updates`,
    openGraph: {
      title: `${category.title} News | NewsHub`,
      description: category.description || `Read the latest ${category.title.toLowerCase()} news and updates`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, posts] = await Promise.all([
    getCategory(params.slug),
    getCategoryPosts(params.slug),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderAd />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: category.title }]} />

        {/* Category Header */}
        <header className="mb-8">
          <div
            className="inline-block px-4 py-2 rounded-lg mb-4"
            style={{ backgroundColor: category.color || '#0ea5e9', color: 'white' }}
          >
            <h1 className="text-3xl font-bold">{category.title}</h1>
          </div>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-3xl">{category.description}</p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No articles found in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post: any) => (
                  <ArticleCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SidebarAd />
          </aside>
        </div>
      </div>
    </div>
  )
}
