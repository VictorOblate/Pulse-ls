const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function run() {
  try {
    console.log('Checking posts for category presence...')
    const missing = await client.fetch(`*[_type == "post" && !defined(category)]{_id, title, "slug": slug.current}`)
    const withCat = await client.fetch(`*[_type == "post" && defined(category)]{_id, title, "slug": slug.current, "category": category->{_id, title}}`)

    console.log(`Posts with category: ${withCat.length}`)
    console.log(`Posts without category: ${missing.length}`)

    if (missing.length) {
      console.log('\nList of posts missing category:')
      missing.forEach((p) => console.log(`- ${p.title} (slug: ${p.slug || p._id})`))
    }
  } catch (err) {
    console.error('Error querying Sanity:', err)
    process.exit(1)
  }
}

run()
