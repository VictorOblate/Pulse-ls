# 📰 NewsHub - Modern News Platform

A modern, fast news publishing platform built with Next.js 14, Sanity CMS, and Google AdSense integration.

## ✨ Features

### Core Features
- 🎨 Modern, responsive design with mobile-first approach
- 📱 Progressive Web App (PWA) ready
- 🚀 Server-Side Rendering (SSR) & Static Site Generation (SSG)
- 📝 Rich text editor with video embeds (YouTube, TikTok, Facebook, Instagram)
- 🔍 Full-text search functionality
- 📊 Google Analytics integration
- 💰 Google AdSense monetization (Header, In-article, Sidebar, Mobile sticky)
- 🏷️ Category-based navigation
- 🔖 Tag system for articles
- 👤 Author profiles with bio and social links
- 📤 Social sharing (Facebook, Twitter, LinkedIn, WhatsApp)
- 🔐 NextAuth authentication for admins and journalists
- 📈 SEO optimized with meta tags, Open Graph, and JSON-LD schema
- 🗺️ Dynamic sitemap and robots.txt

### Technical Features
- **Frontend**: Next.js 14 with App Router
- **CMS**: Sanity Studio (hosted at `/admin`)
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth with credentials provider
- **Styling**: Tailwind CSS with custom theme
- **Icons**: React Icons
- **Images**: Next.js Image optimization
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MySQL database
- Sanity account (free tier available)

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd news-platform

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/news_platform"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-xxxxxxxxxx"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Site URL (for production)
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

### 3. Sanity Setup

```bash
# Initialize Sanity project
npx sanity init

# Follow the prompts:
# - Create new project
# - Choose project name
# - Use default dataset configuration
# - Copy the Project ID to your .env file

# The Sanity Studio will be available at http://localhost:3000/admin
```

### 4. Database Setup

```bash
# Push the database schema
npm run db:push

# Seed the database with initial users
npm run db:seed

# This creates:
# Admin: admin@newshub.com / Admin@123
# Journalist: journalist@newshub.com / Journalist@123
```

### 5. Run Development Server

```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Sign In**: http://localhost:3000/auth/signin

## 📁 Project Structure

```
news-platform/
├── app/                        # Next.js App Router
│   ├── admin/                  # Sanity Studio route
│   ├── api/                    # API routes
│   │   └── auth/               # NextAuth API
│   ├── article/[slug]/         # Article detail pages
│   ├── category/[slug]/        # Category pages
│   ├── search/                 # Search page
│   ├── auth/                   # Authentication pages
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
├── components/                 # React components
│   ├── ads/                    # Ad components
│   ├── article/                # Article components
│   ├── layout/                 # Layout components
│   ├── ui/                     # UI components
│   └── video/                  # Video embed components
├── lib/                        # Utilities and configurations
│   ├── auth.ts                 # NextAuth config
│   ├── prisma.ts               # Prisma client
│   ├── sanity.ts               # Sanity client
│   ├── utils.ts                # Helper functions
│   └── videoEmbed.ts           # Video embed utilities
├── prisma/                     # Database schema
│   └── schema.prisma
├── sanity/                     # Sanity schemas
│   └── schemas/
│       ├── author.ts
│       ├── category.ts
│       ├── post.ts
│       └── videoEmbed.ts
├── scripts/                    # Utility scripts
│   ├── seed.js                 # Database seeding
│   └── sanity-init.js          # Sanity initialization
└── sanity.config.ts            # Sanity configuration
```

## 📝 Content Management

### Creating Content in Sanity Studio

1. **Go to Admin Panel**: http://localhost:3000/admin

2. **Create Categories**:
   - Click "Category" in the sidebar
   - Add categories like Politics, Business, Technology, etc.
   - Set colors for category badges

3. **Create Authors**:
   - Click "Author" in the sidebar
   - Add author details, bio, and social links
   - Upload author photo

4. **Create Posts**:
   - Click "Post" in the sidebar
   - Fill in title, excerpt, and cover image
   - Select category and author
   - Add rich content with text, images, and videos
   - Embed YouTube, TikTok, Facebook, or Instagram videos
   - Add tags for better discoverability
   - Toggle "Featured Post" for homepage spotlight
   - Configure SEO settings

### Video Embeds

The platform supports embedding videos from:
- **YouTube**: `https://www.youtube.com/watch?v=VIDEO_ID`
- **TikTok**: `https://www.tiktok.com/@user/video/VIDEO_ID`
- **Facebook**: `https://www.facebook.com/username/videos/VIDEO_ID`
- **Instagram**: `https://www.instagram.com/p/POST_ID` or `/reel/POST_ID`

Simply paste the URL in the video embed block in the article body.

## 💰 Monetization Setup

### Google AdSense

1. **Sign up for AdSense**: https://www.google.com/adsense
2. **Get your Publisher ID** (ca-pub-XXXXXXXX)
3. **Add to `.env`**:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-xxxxxxxxxx"
   ```
4. **Configure Ad Slots**:
   Edit `/components/ads/AdPlacements.tsx` and replace slot IDs with your own:
   - Header Ad: `slot="1234567890"`
   - Sidebar Ad: `slot="2345678901"`
   - In-Article Ad: `slot="3456789012"`
   - After Article Ad: `slot="4567890123"`
   - Mobile Sticky Ad: `slot="5678901234"`

### Ad Placements

Ads are automatically inserted:
- **Header**: Top of every page
- **In-Article**: Every 3 paragraphs
- **After Article**: End of article
- **Sidebar**: Desktop only (sticky)
- **Mobile Sticky**: Bottom of screen on mobile

## 📊 Analytics Setup

### Google Analytics

1. **Create GA4 Property**: https://analytics.google.com
2. **Get Measurement ID** (G-XXXXXXXXXX)
3. **Add to `.env`**:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
   ```

Analytics will automatically track:
- Page views
- User engagement
- Custom events

## 🔐 User Management

### Default Users (After Seeding)

**Admin**
- Email: `admin@newshub.com`
- Password: `Admin@123`
- Role: Full access to everything

**Journalist**
- Email: `journalist@newshub.com`
- Password: `Journalist@123`
- Role: Content creation and editing

### Creating New Users

Currently, users must be created via database or Prisma Studio:

```bash
npm run db:studio
```

### Changing Passwords

Use Prisma Studio or update directly in the database. Passwords are hashed with bcrypt.

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Import your repository
   - Configure environment variables (all from `.env`)

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Your site will be live at `your-project.vercel.app`

4. **Set up Domain** (optional):
   - Add custom domain in Vercel dashboard
   - Update `NEXT_PUBLIC_SITE_URL` in environment variables

### Database Setup for Production

Use a managed MySQL service:
- **PlanetScale** (recommended): https://planetscale.com
- **Railway**: https://railway.app
- **AWS RDS**: https://aws.amazon.com/rds/

Update `DATABASE_URL` in Vercel environment variables.

### Sanity Production Setup

1. **Deploy Sanity Studio**:
   - Already configured to run at `/admin`
   - Automatically deployed with your Next.js app

2. **Configure CORS**:
   - Go to https://www.sanity.io/manage
   - Add your production domain to CORS origins

## 🎨 Customization

### Branding

1. **Logo**: Update "NewsHub" in `/components/layout/Navbar.tsx`
2. **Colors**: Edit `/tailwind.config.js` theme colors
3. **Fonts**: Change in `/app/layout.tsx`

### Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your brand color
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  },
}
```

### Site Metadata

Update `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Site Name',
  description: 'Your description',
  // ...
}
```

## 🔧 Development

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Sanity
npm run sanity:init      # Show sample data structure
```

### Adding New Features

1. **New Page**: Create in `/app` directory
2. **New Component**: Add to `/components`
3. **New API Route**: Create in `/app/api`
4. **New Sanity Schema**: Add to `/sanity/schemas`

## 🐛 Troubleshooting

### Common Issues

**Issue**: Sanity Studio not loading at `/admin`
- **Solution**: Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly

**Issue**: Database connection errors
- **Solution**: Check `DATABASE_URL` format and MySQL server is running

**Issue**: Images not loading
- **Solution**: Verify Sanity image URLs are in `next.config.js` remote patterns

**Issue**: Authentication not working
- **Solution**: Ensure `NEXTAUTH_SECRET` is set and users exist in database

**Issue**: Ads not showing
- **Solution**: AdSense approval can take days; test with test mode first

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For issues and questions:
- Check the documentation above
- Review the code comments
- Open an issue on GitHub

## 🎯 Roadmap

Future enhancements:
- [ ] Newsletter integration
- [ ] Comment system
- [ ] Push notifications
- [ ] Cloudinary video hosting
- [ ] Advanced search with filters
- [ ] User registration for readers
- [ ] Bookmarking system
- [ ] Reading lists
- [ ] Dark mode

---

Built with ❤️ using Next.js, Sanity CMS, and modern web technologies.
