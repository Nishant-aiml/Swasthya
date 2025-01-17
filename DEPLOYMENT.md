# Deployment Guide for Swasthya by Shrinu

## Quick Deployment Steps

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Login to Vercel (first time only)
   vercel login

   # Deploy to production
   vercel deploy --prod
   ```

3. **Set Custom Domain**
   ```bash
   vercel domains add shrinuswasthya.com
   ```

## Deployment Options

### Option 1: Direct Terminal Deployment (Recommended)

1. **Initial Setup**
   ```bash
   # Install Vercel CLI globally
   npm install -g vercel

   # Login to Vercel
   vercel login
   ```

2. **Deploy the Project**
   ```bash
   # Deploy to production
   npm run deploy
   ```

### Option 2: Manual Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy Using Vercel CLI**
   ```bash
   vercel deploy
   ```

3. **Promote to Production**
   ```bash
   vercel promote
   ```

## Domain Configuration

1. **Add Custom Domain**
   ```bash
   vercel domains add shrinuswasthya.com
   ```

2. **Configure DNS**
   - Add these records to your domain provider:
     ```
     A     @   76.76.21.21
     CNAME www shrinuswasthya.com
     ```

## Mobile App Generation

1. **Generate Android App**
   ```bash
   vercel build --platform=android
   ```

2. **Generate iOS App**
   ```bash
   vercel build --platform=ios
   ```

## Environment Variables

Required environment variables:
```env
VITE_APP_VERSION=1.0.0
```

## Post-Deployment Checks

1. **Verify PWA Installation**
   - Visit the deployed site
   - Check if "Add to Home Screen" prompt appears
   - Test offline functionality

2. **Test Custom Domain**
   - Visit https://shrinuswasthya.com
   - Verify SSL certificate
   - Check www redirect

3. **Verify Mobile App**
   - Test app installation
   - Verify push notifications
   - Check offline functionality

## Troubleshooting

1. **Build Issues**
   ```bash
   # Clear cache and rebuild
   vercel build --clear-cache
   ```

2. **Domain Issues**
   ```bash
   # Check domain status
   vercel domains ls
   ```

3. **SSL Issues**
   ```bash
   # Force SSL renewal
   vercel certs renew shrinuswasthya.com
   ```

## Monitoring

- View deployment status: `vercel list`
- Check logs: `vercel logs`
- View analytics: `vercel analytics`

## Support

For deployment issues:
1. Check Vercel status: https://status.vercel.com
2. Contact support: support@shrinuswasthya.com
