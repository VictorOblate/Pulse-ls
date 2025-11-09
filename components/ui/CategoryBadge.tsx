import Link from 'next/link'

interface CategoryBadgeProps {
  category?: {
    title?: string
    slug?: { current?: string } | null
    color?: string | null
  } | null
  size?: 'sm' | 'md' | 'lg'
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }

  const bgColor = category?.color || '#0ea5e9'

  if (!category) {
    return (
      <span
        className={`inline-block font-semibold uppercase tracking-wide rounded-full ${sizeClasses[size]}`}
        style={{ backgroundColor: bgColor, color: 'white' }}
      >
        Uncategorized
      </span>
    )
  }

  return (
    <Link
      href={`/category/${category.slug?.current || ''}`}
      className={`inline-block font-semibold uppercase tracking-wide rounded-full ${sizeClasses[size]} hover:opacity-90 transition`}
      style={{ backgroundColor: bgColor, color: 'white' }}
    >
      {category.title || 'Uncategorized'}
    </Link>
  )
}
