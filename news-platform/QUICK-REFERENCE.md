# ⚡ Quick Reference

Fast reference for common tasks and commands.

## 🚀 Quick Start

```bash
npm install                 # Install dependencies
cp .env.example .env       # Create environment file
npm run db:push            # Setup database
npm run db:seed            # Create default users
npm run dev                # Start development server
```

## 🔑 Default Credentials

After running `npm run db:seed`:

**Admin**
- URL: http://localhost:3000/auth/signin
- Email: `admin@newshub.com`
- Password: `Admin@123`

**Journalist**
- Email: `journalist@newshub.com`
- Password: `Journalist@123`

**⚠️ Change these passwords immediately!**

## 📝 Common Commands

### Development
```bash
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run start            # Run production build
npm run lint             # Check code quality
```

### Database
```bash
npm run db:push          # Apply schema changes
npm run db:seed          # Seed with default users
npm run db:studio        # Open Prisma Studio GUI
```

### Sanity
```bash
npm run sanity:init      # Show sample data structure
npx sanity login         # Login to Sanity
npx sanity deploy        # Deploy studio
```

## 🌐 Important URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Frontend |
| http://localhost:3000/admin | Sanity CMS |
| http://localhost:3000/auth/signin | Login |
| http://localhost:3000/api/auth/signin | Auth API |

## 📁 Project Structure Quick Map

```
news-platform/
├── app/                    # Pages & Routes
│   ├── page.tsx           # Homepage
│   ├── article/[slug]/    # Article pages
│   ├── category/[slug]/   # Category pages
│   ├── search/            # Search page
│   └── admin/             # CMS Admin
├── components/            # React Components
│   ├── ads/              # Ad components
│   ├── article/          # Article UI
│   └── layout/           # Header/Footer
├── lib/                   # Utilities
│   ├── sanity.ts         # CMS client
│   ├── auth.ts           # Auth config
│   └── prisma.ts         # Database
└── sanity/schemas/        # Content schemas
```

## 🎨 Customization Quick Tips

### Change Site Name
**File**: `components/layout/Navbar.tsx`
```tsx
<div className="text-2xl font-bold text-primary-600">
  YourSiteName  {/* Change this */}
</div>
```

### Change Primary Color
**File**: `tailwind.config.js`
```javascript
primary: {
  600: '#YOUR_COLOR',  // Main brand color
}
```

### Update SEO Metadata
**File**: `app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: 'Your Site Name',
  description: 'Your description',
}
```

## 🔧 Troubleshooting Quick Fixes

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Database Connection Failed
```bash
# Check MySQL is running
brew services list              # macOS
sudo systemctl status mysql     # Linux

# Test connection
mysql -u root -p
```

### Prisma Client Issues
```bash
npx prisma generate
npx prisma db push
```

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📊 Environment Variables Cheatsheet

### Required (Minimum to Run)
```env
DATABASE_URL="mysql://user:password@localhost:3306/news_platform"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-token"
```

### Optional (For Full Features)
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-xxxxxxxxxx"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 🎯 Content Creation Workflow

### 1. Create Category
1. Go to `/admin`
2. Click "Category"
3. Add title, slug, color
4. Publish

### 2. Create Author
1. Click "Author"
2. Add name, bio, image
3. Publish

### 3. Create Article
1. Click "Post"
2. Fill all required fields
3. Add content with images/videos
4. Toggle "Featured" for homepage
5. Publish

## 🔐 User Management Quick Guide

### View Users
```bash
npm run db:studio
# Click "User" table
```

### Create New User (Manual)
```bash
npm run db:studio
# Add new record in User table
# Password must be bcrypt hashed
```

### Hash Password (Node.js)
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('YourPassword', 10);
console.log(hash);
```

## 📱 Ad Slot IDs Quick Reference

Edit: `components/ads/AdPlacements.tsx`

```typescript
HeaderAd      - slot="1234567890"
SidebarAd     - slot="2345678901"
InArticleAd   - slot="3456789012"
AfterArticleAd - slot="4567890123"
MobileStickyAd - slot="5678901234"
```

Replace with your AdSense slot IDs.

## 🚀 Deployment Checklist

- [ ] Test locally: `npm run build && npm run start`
- [ ] Update environment variables for production
- [ ] Setup production database (PlanetScale/Railway)
- [ ] Push to GitHub
- [ ] Deploy on Vercel
- [ ] Configure Sanity CORS
- [ ] Add custom domain (optional)
- [ ] Test all features live
- [ ] Submit sitemap to Google

## 📞 Quick Support

**Error Messages**:
- Check console for details
- Review relevant documentation
- Check GitHub issues

**Performance Issues**:
- Run `npm run build` and check bundle size
- Use Lighthouse in Chrome DevTools
- Check Vercel Analytics

**Content Issues**:
- Verify Sanity project ID
- Check CORS settings
- Review schema in `/sanity/schemas`

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **Sanity**: https://www.sanity.io/docs
- **Tailwind**: https://tailwindcss.com/docs
- **Prisma**: https://www.prisma.io/docs

## 💡 Pro Tips

1. **Use TypeScript**: Type safety prevents bugs
2. **Test Locally First**: Always test before deploying
3. **Monitor Analytics**: Track what content works
4. **Optimize Images**: Use WebP format when possible
5. **Cache Strategically**: Configure ISR for better performance
6. **Security First**: Never commit `.env` to Git
7. **Regular Backups**: Export Sanity data monthly
8. **Update Dependencies**: Keep packages current

## 🔄 Update Workflow

```bash
# 1. Make changes
# 2. Test locally
npm run dev

# 3. Build and test
npm run build
npm run start

# 4. Commit and push
git add .
git commit -m "Description"
git push origin main

# 5. Auto-deploys on Vercel
```

---

Keep this guide handy for quick reference! 📚
