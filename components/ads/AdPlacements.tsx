import AdBlock from './AdBlock'

export function HeaderAd() {
  return (
    <div className="w-full bg-gray-50 py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <AdBlock
            slot="1234567890"
            format="horizontal"
            className="max-w-6xl"
            style={{ minHeight: '90px' }}
          />
        </div>
      </div>
    </div>
  )
}

export function SidebarAd() {
  return (
    <div className="sticky top-4 hidden lg:block">
      <div className="bg-gray-50 p-4 rounded-lg">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          Advertisement
        </span>
        <AdBlock
          slot="2345678901"
          format="vertical"
          style={{ minHeight: '600px', width: '300px' }}
        />
      </div>
    </div>
  )
}

export function InArticleAd() {
  return (
    <div className="my-8 bg-gray-50 p-4 rounded-lg">
      <span className="text-xs text-gray-500 uppercase tracking-wide block mb-2">
        Advertisement
      </span>
      <AdBlock
        slot="3456789012"
        format="fluid"
        style={{ minHeight: '250px' }}
      />
    </div>
  )
}

export function AfterArticleAd() {
  return (
    <div className="mt-8 bg-gray-50 p-4 rounded-lg">
      <span className="text-xs text-gray-500 uppercase tracking-wide block mb-2">
        Advertisement
      </span>
      <AdBlock
        slot="4567890123"
        format="rectangle"
        style={{ minHeight: '250px' }}
      />
    </div>
  )
}

export function MobileStickyAd() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 lg:hidden">
      <div className="relative">
        <AdBlock
          slot="5678901234"
          format="horizontal"
          style={{ minHeight: '50px' }}
        />
      </div>
    </div>
  )
}
