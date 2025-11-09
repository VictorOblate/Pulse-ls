// Script to check post categories
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function checkPostCategories() {
  const query = `*[_type == "post"] {
    _id,
    title,
    "slug": slug.current,
    categories->,
    category->
  }`

  try {
    const posts = await client.fetch(query)
    console.log('Posts with their categories:')
    posts.forEach(post => {
      console.log('\nPost:', post.title)
      console.log('Slug:', post.slug)
      console.log('Categories field:', post.categories)
      console.log('Category field:', post.category)
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

checkPostCategories()