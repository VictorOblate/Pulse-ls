import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Fetch all posts
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug,
      publishedAt
    }
  `)

  // Fetch all categories
  const categories = await client.fetch(`
    *[_type == "category"] {
      slug
    }
  `)

  // Generate post URLs
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/article/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Generate category URLs
  const categoryUrls = categories.map((category: any) => ({
    url: `${baseUrl}/category/${category.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ]

  return [...staticUrls, ...categoryUrls, ...postUrls]
}
