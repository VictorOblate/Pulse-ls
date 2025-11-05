# 🚀 Detailed Setup Guide

This guide walks you through setting up the NewsHub platform from scratch.

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MySQL database (local or cloud)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Sanity account (free at https://www.sanity.io)
- [ ] Google AdSense account (optional, for monetization)
- [ ] Google Analytics account (optional, for tracking)

## Step-by-Step Setup

### 1. Project Setup

```bash
# Navigate to your projects folder
cd ~/projects

# Clone or download the project
# If you have the code as a zip, extract it here
cd news-platform

# Install dependencies
npm install
```

**Expected output**: Successful installation of all packages

### 2. MySQL Database Setup

#### Option A: Local MySQL

```bash
# Install MySQL (if not installed)
# macOS:
brew install mysql
brew services start mysql

# Linux:
sudo apt install mysql-server
sudo systemctl start mysql

# Create database
mysql -u root -p
CREATE DATABASE news_platform;
exit;
```

#### Option B: Cloud Database (Recommended for Production)

**PlanetScale (Free Tier)**:
1. Go to https://planetscale.com
2. Create account and new database
3. Copy connection string

**Railway**:
1. Go to https://railway.app
2. Create new project → Add MySQL
3. Copy connection string

### 3. Environment Configuration

Create `.env` file in project root:

```bash
# Copy example file
cp .env.example .env

# Edit with your values
nano .env  # or use your editor
```

Fill in the values:

```env
# Database - Update with your credentials
DATABASE_URL="mysql://user:password@localhost:3306/news_platform"

# NextAuth - Generate secret
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-command-below"

# Sanity - Add after step 4
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN=""

# Google AdSense - Add after approval
NEXT_PUBLIC_ADSENSE_CLIENT_ID=""

# Google Analytics - Optional
NEXT_PUBLIC_GA_MEASUREMENT_ID=""

# Site URL - Update for production
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Generate NextAuth Secret**:
```bash
openssl rand -base64 32
```
Copy the output to `NEXTAUTH_SECRET`

### 4. Sanity CMS Setup

```bash
# Login to Sanity
npx sanity login

# Initialize Sanity project
npx sanity init

# Follow prompts:
# ✓ Create new project
# ✓ Project name: NewsHub (or your choice)
# ✓ Use default dataset: Yes
# ✓ Output path: Already configured
# ✓ Project template: Clean project

# Copy the Project ID shown
# Add to .env file: NEXT_PUBLIC_SANITY_PROJECT_ID
```

**Create API Token**:
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Create new token with "Editor" permissions
5. Copy token to `.env` as `SANITY_API_TOKEN`

### 5. Database Initialization

```bash
# Push database schema
npm run db:push

# Expected output: "Your database is now in sync with your schema"

# Seed with default users
npm run db:seed

# Expected output:
# ✅ Admin user created: admin@newshub.com / Admin@123
# ✅ Journalist user created: journalist@newshub.com / Journalist@123
```

### 6. Start Development Server

```bash
npm run dev
```

**Expected output**:
```
▲ Next.js 14.2.0
- Local: http://localhost:3000
✓ Ready in 2.1s
```

### 7. Initial Content Setup

#### Access Sanity Studio

1. Open http://localhost:3000/admin
2. Log in with your Sanity account

#### Create Categories

1. Click "Category" in sidebar
2. Create these categories:

```
Politics - Color: #dc2626 (red)
Business - Color: #059669 (green)
Technology - Color: #2563eb (blue)
Sports - Color: #ea580c (orange)
Entertainment - Color: #9333ea (purple)
World - Color: #0891b2 (cyan)
```

#### Create Author

1. Click "Author" in sidebar
2. Create author profile:
   - Name: Your name
   - Slug: your-name
   - Upload a profile image
   - Add bio
   - Add email

#### Create First Article

1. Click "Post" in sidebar
2. Fill in:
   - **Title**: "Welcome to NewsHub"
   - **Slug**: Click "Generate" from title
   - **Excerpt**: Brief summary
   - **Cover Image**: Upload an image (required)
   - **Category**: Select one
   - **Author**: Select author
   - **Tags**: Add relevant tags
   - **Featured Post**: Toggle ON for homepage
   - **Body**: Write article content

3. **Publish**: Click "Publish" button

### 8. Verify Installation

Check these URLs:

- [ ] Homepage: http://localhost:3000
- [ ] Admin: http://localhost:3000/admin
- [ ] Sign In: http://localhost:3000/auth/signin
- [ ] Article: http://localhost:3000/article/welcome-to-newshub
- [ ] Category: http://localhost:3000/category/technology
- [ ] Search: http://localhost:3000/search?q=test

## Optional: Google AdSense Setup

### 1. Create AdSense Account

1. Go to https://www.google.com/adsense
2. Sign up / Sign in with Google account
3. Add your website (can use localhost for testing)
4. Submit application

**Note**: Approval can take 24-48 hours

### 2. Get Publisher ID

1. Once approved, go to AdSense dashboard
2. Account → Settings
3. Copy Publisher ID (ca-pub-XXXXXXXX)
4. Add to `.env`:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXX"
   ```

### 3. Create Ad Units

1. AdSense → Ads → By ad unit
2. Create 5 ad units:
   - Header Banner (728x90 or responsive)
   - Sidebar (300x600)
   - In-Article (responsive)
   - After Article (336x280)
   - Mobile Sticky (320x50)

3. Copy each Ad Slot ID

### 4. Update Ad Components

Edit `/components/ads/AdPlacements.tsx`:

```typescript
// Replace these slot IDs with your own:
export function HeaderAd() {
  return (
    <AdBlock slot="YOUR_HEADER_SLOT_ID" ... />
  )
}
// Repeat for all ad components
```

## Optional: Google Analytics Setup

### 1. Create GA4 Property

1. Go to https://analytics.google.com
2. Admin → Create Property
3. Property name: NewsHub
4. Set timezone and currency
5. Create property

### 2. Get Measurement ID

1. Admin → Data Streams
2. Add stream → Web
3. Enter URL
4. Copy Measurement ID (G-XXXXXXXXXX)
5. Add to `.env`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
   ```

### 3. Verify Tracking

1. Go to Reports → Realtime
2. Visit your site
3. Should see active user in dashboard

## Production Deployment

### 1. Prepare for Deployment

```bash
# Test production build locally
npm run build
npm run start

# Check for errors
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts
# Set up environment variables when prompted
```

**Or use Vercel Dashboard**:
1. Go to https://vercel.com
2. Import Git Repository
3. Add environment variables
4. Deploy

### 3. Post-Deployment

1. **Update Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL`: Your actual domain
   - `NEXTAUTH_URL`: Your actual domain

2. **Configure Sanity CORS**:
   - Go to https://www.sanity.io/manage
   - Select project → API → CORS Origins
   - Add your Vercel domain

3. **Test Everything**:
   - [ ] Homepage loads
   - [ ] Articles display
   - [ ] Admin panel works
   - [ ] Authentication works
   - [ ] Images load correctly

## Troubleshooting

### Database Connection Issues

**Error**: `Can't reach database server`

**Solutions**:
1. Check MySQL is running:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mysql
   ```

2. Verify credentials in `.env`
3. Test connection:
   ```bash
   mysql -u USER -p -h HOST DATABASE
   ```

### Sanity Studio Not Loading

**Error**: Blank screen at `/admin`

**Solutions**:
1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env`
2. Check browser console for errors
3. Clear browser cache
4. Restart dev server

### Images Not Displaying

**Error**: Images show as broken

**Solutions**:
1. Check Sanity CDN in `next.config.js`:
   ```javascript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'cdn.sanity.io',
       },
     ],
   }
   ```

2. Verify images are uploaded in Sanity
3. Check browser network tab for 404s

### Build Errors

**Error**: Type errors or build fails

**Solutions**:
1. Delete `.next` folder:
   ```bash
   rm -rf .next
   npm run build
   ```

2. Check TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

3. Update dependencies:
   ```bash
   npm update
   ```

## Next Steps

Now that your platform is running:

1. **Customize Branding**:
   - Update site name in navbar
   - Change color scheme in `tailwind.config.js`
   - Add your logo

2. **Create Content**:
   - Write more articles
   - Add more authors
   - Create diverse categories

3. **SEO Optimization**:
   - Fill in SEO fields for each article
   - Add meta descriptions
   - Use relevant keywords

4. **Monitor Performance**:
   - Check Google Analytics
   - Monitor Core Web Vitals
   - Test on different devices

5. **Engage Audience**:
   - Set up newsletter (future feature)
   - Share on social media
   - Encourage comments

## Support

If you encounter issues:
1. Check this guide
2. Review README.md
3. Check code comments
4. Search online documentation
5. Open GitHub issue

---

🎉 Congratulations! Your news platform is ready to go!
