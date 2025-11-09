# 🚀 Deployment Guide

This guide covers deploying your Pulse LS platform to production using Vercel.

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Database ready (PlanetScale/Railway recommended)
- [ ] Sanity project created and configured
- [ ] AdSense and Analytics set up (if using)
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Custom domain ready (optional)

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/news-platform.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your Git repository
   - Select the repository

3. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Add Environment Variables**:
   Click "Environment Variables" and add:

   ```
   DATABASE_URL
   NEXTAUTH_URL
   NEXTAUTH_SECRET
   NEXT_PUBLIC_SANITY_PROJECT_ID
   NEXT_PUBLIC_SANITY_DATASET
   SANITY_API_TOKEN
   NEXT_PUBLIC_ADSENSE_CLIENT_ID
   NEXT_PUBLIC_GA_MEASUREMENT_ID
   NEXT_PUBLIC_SITE_URL
   ```

   **Important**: 
   - Set `NEXTAUTH_URL` to your Vercel URL (e.g., https://your-project.vercel.app)
   - Set `NEXT_PUBLIC_SITE_URL` to your Vercel URL
   - Use production database URL

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)

### Step 3: Configure Database

#### Using PlanetScale (Recommended)

1. **Create Database**:
   - Go to https://planetscale.com
   - Create new database
   - Region: Choose closest to your users

2. **Get Connection String**:
   - Click "Connect"
   - Select "Prisma" format
   - Copy connection string

3. **Update Vercel Environment**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Update `DATABASE_URL` with PlanetScale connection string
   - Redeploy

4. **Initialize Database**:
   ```bash
   # Install Vercel CLI locally
   npm install -g vercel

   # Link to your project
   vercel link

   # Run prisma commands
   vercel env pull .env.local
   npx prisma db push
   npx prisma db seed
   ```

#### Using Railway

1. **Create Database**:
   - Go to https://railway.app
   - New Project → Provision MySQL

2. **Get Connection String**:
   - Click database → Connect
   - Copy MySQL connection URL

3. **Update Vercel** (same as PlanetScale)

### Step 4: Configure Sanity

1. **Add Production URL to CORS**:
   - Go to https://www.sanity.io/manage
   - Select your project
   - API → CORS Origins
   - Add: `https://your-project.vercel.app`
   - Enable credentials

2. **Test Sanity Studio**:
   - Visit: `https://your-project.vercel.app/admin`
   - Should load without errors

### Step 5: Custom Domain (Optional)

1. **Add Domain in Vercel**:
   - Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **Update DNS**:
   - Add A record or CNAME as instructed
   - Wait for propagation (5-60 minutes)

3. **Update Environment Variables**:
   - Update `NEXTAUTH_URL` to custom domain
   - Update `NEXT_PUBLIC_SITE_URL` to custom domain
   - Redeploy

4. **Update Sanity CORS**:
   - Add custom domain to CORS origins

## Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts
# - Set up new project
# - Link to Git repository
# - Configure build settings
# - Add environment variables

# Production deployment
vercel --prod
```

## Post-Deployment Tasks

### 1. Verify Deployment

Test all functionality:

```bash
# Homepage
curl https://your-domain.com

# API Health
curl https://your-domain.com/api/auth/signin

# Sitemap
curl https://your-domain.com/sitemap.xml
```

### 2. Configure Monitoring

**Vercel Analytics**:
- Automatically enabled
- View in Vercel Dashboard → Analytics

**Google Analytics**:
- Verify tracking in GA4 dashboard
- Check real-time reports

### 3. SEO Setup

1. **Submit Sitemap**:
   - Google Search Console: https://search.google.com/search-console
   - Add property → Verify domain
   - Submit sitemap: `https://your-domain.com/sitemap.xml`

2. **Bing Webmaster**:
   - https://www.bing.com/webmasters
   - Add and verify site
   - Submit sitemap

### 4. Performance Optimization

1. **Enable Caching**:
   - Vercel automatically caches static assets
   - Configure cache headers if needed

2. **Image Optimization**:
   - Already configured with Next.js Image
   - Sanity CDN handles optimization

3. **Monitor Core Web Vitals**:
   - Check Vercel Analytics
   - Use PageSpeed Insights: https://pagespeed.web.dev

## Environment Variables Reference

### Required Variables

```env
# Database - Production MySQL connection
DATABASE_URL="mysql://user:pass@host:3306/db?sslaccept=strict"

# NextAuth - Use strong secret for production
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="use-strong-random-secret"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="abc123"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-sanity-token"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

### Optional Variables

```env
# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-xxxxxxxxxx"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

## Continuous Deployment

Vercel automatically deploys on Git push:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to production
# 4. Updates live site
```

### Preview Deployments

Every branch push creates a preview:
- Separate URL for testing
- Full environment
- Shareable with team

## Rollback Strategy

### Quick Rollback

1. **Via Dashboard**:
   - Go to Deployments
   - Find previous working deployment
   - Click "..." → "Promote to Production"

2. **Via Git**:
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   ```

## Troubleshooting

### Build Failures

**Check Build Logs**:
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. View logs for errors

**Common Issues**:
- Missing environment variables
- TypeScript errors
- Dependency issues

**Solutions**:
```bash
# Test build locally
npm run build

# Fix errors, then push
git add .
git commit -m "Fix build errors"
git push
```

### Runtime Errors

**Check Function Logs**:
- Vercel Dashboard → Logs
- Real-time error tracking

**Common Issues**:
- Database connection errors
- API route failures
- Sanity connection issues

### Database Connection Issues

**Error**: `Can't reach database`

**Solutions**:
1. Verify `DATABASE_URL` format
2. Check database is running
3. Verify IP whitelist (if applicable)
4. Test connection locally with production URL

### Sanity Studio Issues

**Error**: Studio not loading at `/admin`

**Solutions**:
1. Check CORS configuration
2. Verify project ID in environment
3. Clear browser cache
4. Check Sanity service status

## Performance Monitoring

### Vercel Analytics

Automatically tracks:
- Page views
- User sessions
- Core Web Vitals
- Load times

**Access**: Vercel Dashboard → Analytics

### Google Analytics

Track:
- User behavior
- Traffic sources
- Conversion rates
- Custom events

**Access**: https://analytics.google.com

### PageSpeed Insights

Monitor performance:
1. Go to https://pagespeed.web.dev
2. Enter your URL
3. View scores and recommendations

**Target Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Security Best Practices

### 1. Environment Variables

✅ **Do**:
- Use strong secrets
- Rotate secrets regularly
- Use different secrets for staging/production

❌ **Don't**:
- Commit secrets to Git
- Share secrets publicly
- Use weak passwords

### 2. Database Security

✅ **Do**:
- Use SSL connections
- Whitelist IPs if possible
- Regular backups
- Monitor access logs

### 3. API Security

✅ **Do**:
- Rate limit API routes
- Validate all inputs
- Use HTTPS only
- Implement CSRF protection

## Backup Strategy

### Database Backups

**PlanetScale**:
- Automatic daily backups
- Manual backups available
- Point-in-time recovery

**Railway**:
- Automatic backups
- Export via dashboard

### Content Backups

**Sanity**:
- Automatic versioning
- Export datasets
- Document history

```bash
# Export Sanity dataset
sanity dataset export production backup.tar.gz
```

## Scaling Considerations

### Traffic Growth

Vercel automatically scales:
- Serverless functions auto-scale
- CDN caching worldwide
- No configuration needed

### Database Scaling

**PlanetScale**:
- Upgrade plan as needed
- Horizontal scaling built-in
- Read replicas available

### Monitoring Costs

**Track Usage**:
- Vercel: Function invocations, bandwidth
- Database: Connections, storage
- Sanity: API requests, bandwidth

## Support Resources

**Vercel**:
- Docs: https://vercel.com/docs
- Support: support@vercel.com
- Community: https://github.com/vercel/next.js/discussions

**Sanity**:
- Docs: https://www.sanity.io/docs
- Slack: https://slack.sanity.io
- Support: support@sanity.io

**Next.js**:
- Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js

---

🎉 Your news platform is now live and ready for the world!
