# 📁 Project Structure Explained

Visual guide to understand the codebase organization.

## 🗂️ Complete Directory Tree

```
news-platform/
│
├── 📱 app/                          # Next.js App Router (Pages & Routes)
│   ├── layout.tsx                   # Root layout with navigation
│   ├── page.tsx                     # Homepage (/)
│   ├── globals.css                  # Global styles
│   ├── loading.tsx                  # Loading state
│   ├── not-found.tsx                # 404 page
│   ├── sitemap.ts                   # SEO sitemap
│   ├── robots.ts                    # Search engine rules
│   │
│   ├── 📰 article/[slug]/           # Dynamic article pages
│   │   └── page.tsx                 # Article detail (/article/my-post)
│   │
│   ├── 🏷️ category/[slug]/          # Dynamic category pages
│   │   └── page.tsx                 # Category list (/category/tech)
│   │
│   ├── 🔍 search/                   # Search functionality
│   │   └── page.tsx                 # Search results (/search?q=term)
│   │
│   ├── 🔐 auth/                     # Authentication pages
│   │   └── signin/
│   │       └── page.tsx             # Sign in page
│   │
│   ├── 🎛️ admin/[[...index]]/       # CMS Admin Panel
│   │   └── page.tsx                 # Sanity Studio (/admin)
│   │
│   └── 🔌 api/                      # API Routes
│       └── auth/[...nextauth]/
│           └── route.ts             # NextAuth endpoints
│
├── 🧩 components/                   # React Components
│   │
│   ├── 💰 ads/                      # Advertisement Components
│   │   ├── AdBlock.tsx              # Reusable ad component
│   │   └── AdPlacements.tsx         # Specific ad placements
│   │
│   ├── 📄 article/                  # Article Components
│   │   ├── ArticleCard.tsx          # Article preview card
│   │   ├── PortableTextContent.tsx  # Rich text renderer
│   │   └── ShareButtons.tsx         # Social sharing
│   │
│   ├── 🎨 layout/                   # Layout Components
│   │   ├── Navbar.tsx               # Header navigation
│   │   └── Footer.tsx               # Footer
│   │
│   ├── 🎬 video/                    # Video Components
│   │   └── VideoEmbed.tsx           # YouTube/TikTok/etc embed
│   │
│   ├── 🎭 ui/                       # UI Components
│   │   ├── Skeletons.tsx            # Loading skeletons
│   │   ├── Breadcrumb.tsx           # Breadcrumb navigation
│   │   └── CategoryBadge.tsx        # Category badge
│   │
│   └── 🔧 providers/                # Context Providers
│       └── SessionProvider.tsx      # Auth session provider
│
├── 📚 lib/                          # Utility Functions & Configs
│   ├── auth.ts                      # NextAuth configuration
│   ├── prisma.ts                    # Database client
│   ├── sanity.ts                    # Sanity CMS client & queries
│   ├── utils.ts                     # Helper functions (dates, SEO)
│   └── videoEmbed.ts                # Video URL parsing
│
├── 🗄️ prisma/                       # Database
│   └── schema.prisma                # Database schema (Users, Sessions)
│
├── 📝 sanity/                       # Sanity CMS Configuration
│   └── schemas/                     # Content Schemas
│       ├── post.ts                  # Article schema
│       ├── category.ts              # Category schema
│       ├── author.ts                # Author schema
│       ├── videoEmbed.ts            # Video embed schema
│       └── index.ts                 # Schema exports
│
├── 🔤 types/                        # TypeScript Type Definitions
│   └── next-auth.d.ts               # NextAuth type extensions
│
├── 🛠️ scripts/                      # Utility Scripts
│   ├── seed.js                      # Database seeding
│   └── sanity-init.js               # Sanity sample data
│
├── ⚙️ Configuration Files
│   ├── next.config.js               # Next.js config
│   ├── tailwind.config.js           # Tailwind theme
│   ├── tsconfig.json                # TypeScript config
│   ├── postcss.config.js            # PostCSS config
│   ├── sanity.config.ts             # Sanity Studio config
│   ├── package.json                 # Dependencies & scripts
│   └── .env.example                 # Environment template
│
└── 📖 Documentation
    ├── README.md                    # Main documentation
    ├── SETUP.md                     # Setup guide
    ├── DEPLOYMENT.md                # Deployment guide
    ├── QUICK-REFERENCE.md           # Quick reference
    └── PROJECT-SUMMARY.md           # Feature checklist
```

## 🎯 Key Areas Explained

### 1. App Directory (`app/`)
**Purpose**: All pages and routes
- Each folder = a route
- `page.tsx` = the page content
- `[slug]` = dynamic route parameter

**Example Flow**:
```
User visits: /article/breaking-news
↓
Loads: app/article/[slug]/page.tsx
↓
Fetches data for slug="breaking-news"
↓
Renders article
```

### 2. Components (`components/`)
**Purpose**: Reusable UI pieces
- Organized by feature/type
- Import and use in multiple pages
- Keep UI consistent

**Example**:
```tsx
// In any page
import ArticleCard from '@/components/article/ArticleCard'

<ArticleCard post={article} />
```

### 3. Library (`lib/`)
**Purpose**: Shared logic and configurations
- Database connections
- API clients
- Helper functions
- Configurations

**Example**:
```tsx
import { client } from '@/lib/sanity'
const posts = await client.fetch(query)
```

### 4. Sanity Schemas (`sanity/schemas/`)
**Purpose**: Define content structure
- Like a database schema for CMS
- Defines fields and types
- Controls what authors can edit

**Example**:
```typescript
// Defines what a "post" contains
- title (required)
- body (rich text)
- images
- videos
```

### 5. Prisma (`prisma/`)
**Purpose**: Database management
- Schema defines tables
- Type-safe database queries
- Handles migrations

**Tables Created**:
- User (authentication)
- Session (login sessions)
- Account (OAuth data)

## 🔄 Data Flow

### Article Display Flow:
```
1. User visits /article/my-post
   ↓
2. app/article/[slug]/page.tsx runs
   ↓
3. Fetches from Sanity using lib/sanity.ts
   ↓
4. Renders with components/article/*
   ↓
5. Shows ads via components/ads/*
   ↓
6. User sees complete article
```

### Content Creation Flow:
```
1. Admin visits /admin
   ↓
2. Loads Sanity Studio
   ↓
3. Uses schemas from sanity/schemas/
   ↓
4. Creates/edits content
   ↓
5. Publishes
   ↓
6. Appears on frontend immediately
```

## 🎨 Styling Architecture

```
Global Styles (app/globals.css)
    ↓
Tailwind Config (tailwind.config.js)
    ↓
Component Classes
    ↓
Final Rendered CSS
```

**Customization Points**:
- `tailwind.config.js` - Colors, fonts
- `app/globals.css` - Custom CSS
- Component files - Inline Tailwind

## 🔐 Authentication Flow

```
1. User goes to /auth/signin
   ↓
2. Submits credentials
   ↓
3. app/api/auth/[...nextauth]/route.ts processes
   ↓
4. lib/auth.ts validates against database
   ↓
5. Creates session in database
   ↓
6. Redirects to /admin or requested page
```

## 📊 Ad System Architecture

```
AdBlock Component (base)
    ↓
AdPlacements Components (specific locations)
    ↓
Used in:
- Layout (header, mobile sticky)
- Article pages (in-article, after)
- Sidebar (desktop)
```

## 🎬 Video Embed Flow

```
1. Author pastes video URL in Sanity
   ↓
2. Saved as videoEmbed schema
   ↓
3. PortableTextContent renders body
   ↓
4. Detects videoEmbed block
   ↓
5. VideoEmbed component processes URL
   ↓
6. lib/videoEmbed.ts converts to embed code
   ↓
7. Responsive iframe shown
```

## 📝 Content Structure

```
Category
    ↓
    ├── Post 1
    │   ├── Author
    │   ├── Images
    │   ├── Videos
    │   └── Tags
    │
    ├── Post 2
    └── Post 3
```

## 🚀 Build & Deploy Flow

```
Development:
npm run dev → Next.js dev server → Hot reload

Production Build:
npm run build
    ↓
    ├── Compile TypeScript
    ├── Optimize images
    ├── Generate static pages
    ├── Bundle JavaScript
    └── Create .next/ folder

Deploy:
Vercel reads .next/
    ↓
    ├── Serverless functions
    ├── Static assets on CDN
    └── Edge network
```

## 💡 How to Navigate

### To Add a New Page:
```
1. Create folder in app/
2. Add page.tsx
3. Export default component
4. Done! Auto-routed
```

### To Add a New Component:
```
1. Create file in components/[category]/
2. Export component
3. Import where needed
```

### To Modify Content Structure:
```
1. Edit sanity/schemas/
2. Add/modify fields
3. Restart dev server
4. Changes reflect in /admin
```

### To Change Styling:
```
1. Colors: tailwind.config.js
2. Global CSS: app/globals.css
3. Component: inline Tailwind classes
```

## 📖 File Naming Conventions

```
Pages:         page.tsx
Layouts:       layout.tsx
Components:    ComponentName.tsx
Utils:         functionName.ts
Types:         types.d.ts
Configs:       name.config.js
```

## 🎯 Important Entry Points

**Frontend**:
- `app/page.tsx` - Homepage
- `app/layout.tsx` - Site wrapper
- `components/layout/Navbar.tsx` - Navigation

**Backend**:
- `lib/sanity.ts` - CMS queries
- `lib/auth.ts` - Authentication
- `app/api/` - API routes

**Configuration**:
- `.env` - Environment variables
- `sanity.config.ts` - CMS setup
- `tailwind.config.js` - Styling

## 🔍 Where to Find Things

**Need to change...**

| What | Where |
|------|-------|
| Site name | `components/layout/Navbar.tsx` |
| Colors | `tailwind.config.js` |
| Homepage layout | `app/page.tsx` |
| Article template | `app/article/[slug]/page.tsx` |
| Ad placements | `components/ads/AdPlacements.tsx` |
| Navigation | `components/layout/Navbar.tsx` |
| Footer | `components/layout/Footer.tsx` |
| Meta tags | `app/layout.tsx` |
| Content structure | `sanity/schemas/` |
| User schema | `prisma/schema.prisma` |

---

**Understanding this structure will help you customize and extend the platform easily!**
