import { client, postFields } from '@/lib/sanity'
import ArticleCard from '@/components/article/ArticleCard'
import { HeaderAd } from '@/components/ads/AdPlacements'
import { FiSearch } from 'react-icons/fi'
import type { Metadata } from 'next'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

async function searchPosts(query: string) {
  if (!query || query.trim() === '') {
    return []
  }

  try {
    const posts = await client.fetch(
      `*[_type == "post" && (
        title match $query + "*" ||
        excerpt match $query + "*" ||
        pt::text(body) match $query + "*"
      )] | order(publishedAt desc) [0...20] {
        ${postFields}
      }`,
      { query },
      { next: { revalidate: 0 } }
    )
    return posts
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || ''
  
  return {
    title: query ? `Search results for "${query}"` : 'Search',
    description: query ? `Find articles about ${query}` : 'Search for news articles',
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const posts = query ? await searchPosts(query) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderAd />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FiSearch className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          </div>
          
          {query && (
            <p className="text-gray-600">
              {posts.length > 0 
                ? `Found ${posts.length} article${posts.length === 1 ? '' : 's'} for "${query}"`
                : `No results found for "${query}"`
              }
            </p>
          )}

          {!query && (
            <p className="text-gray-600">
              Enter a search term to find articles
            </p>
          )}
        </div>

        {/* Search Results */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        ) : query ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h2>
            <p className="text-gray-600">
              Try different keywords or browse our categories
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
