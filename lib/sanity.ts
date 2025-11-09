import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ query helpers
export const postFields = `
  _id,
  title,
  slug,
  excerpt,
  "coverImage": coalesce(mainImage.asset->url, coverImage.asset->url),
  "coverImageAlt": coalesce(mainImage.alt, coverImage.alt),
  "categories": categories[]->{
    _id,
    title,
    slug,
    color
  },
  "author": author->{
    _id,
    name,
    slug,
    "image": image.asset->url,
    bio
  },
  tags,
  featuredVideo,
  body,
  featured,
  publishedAt,
  seo
`

// Debug helper to log query, params, and results
export async function debugSanityQuery(query: string, params: any = {}) {
  console.log('Sanity Query:', query)
  console.log('Sanity Params:', params)
  const result = await client.fetch(query, params)
  console.log('Sanity Result:', JSON.stringify(result, null, 2))
  return result
}

// Helper to normalize post objects returned from Sanity so components can rely on shape
export function normalizePost(post: any) {
  if (!post || typeof post !== 'object') return null

  const blockToPlain = (blocks: any) => {
    if (!Array.isArray(blocks)) return typeof blocks === 'string' ? blocks : ''
    return blocks
      .map((block: any) => {
        if (block._type === 'block' && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || '').join('')
        }
        return ''
      })
      .join('\n\n')
  }

  const coverImage =
    typeof post.coverImage === 'string'
      ? post.coverImage
      : post.coverImage?.asset?.url || null

  const excerpt =
    typeof post.excerpt === 'string' ? post.excerpt : blockToPlain(post.excerpt)

  const author = {
    _id: post.author?._id || null,
    name: post.author?.name || null,
    image: post.author?.image || null,
    bio: post.author?.bio || null,
  }

  const firstCategory = Array.isArray(post.categories) && post.categories.length > 0
    ? post.categories[0]
    : null

  return {
    ...post,
    coverImage,
    excerpt,
    author,
    category: firstCategory,
    body: Array.isArray(post.body) ? post.body : [],
  }
}
