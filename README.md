# Swasthya by Shrinu - Healthcare Solution

A comprehensive healthcare solution that provides doctor appointments, emergency services, and health monitoring features.

## Features

- Book doctor appointments
- Emergency services
- Medicine reminders
- AI-powered health assistant
- Health monitoring
- Health-focused games
- Progressive Web App (PWA)

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase Authentication
- Radix UI Components
- PWA Support

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- Firebase account
- Required API keys (see .env.example)

## Development Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd swasthya
```

2. Install dependencies:
```bash
npm install
```

3. Copy .env.example to .env and fill in your values:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

## Deployment Guide

### 1. Environment Setup

1. Create a production environment file:
```bash
cp .env.example .env.production
```

2. Update the production environment variables with your production values:
- VITE_SENTRY_DSN: For error tracking
- API keys for various services
- Production API endpoints

### 2. Build for Production

1. Run the production build:
```bash
npm run build
```

This will create an optimized build in the `dist` directory.

### 3. Deployment Options

#### Option 1: Static Hosting (Vercel/Netlify)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

OR

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy to Netlify:
```bash
netlify deploy
```

#### Option 2: Manual Deployment

1. Compress the dist folder:
```bash
cd dist
zip -r ../dist.zip .
```

2. Upload the dist.zip to your hosting provider

### 4. Post-Deployment Steps

1. Configure your hosting provider:
   - Enable HTTPS
   - Set up custom domain (if applicable)
   - Configure caching headers
   - Enable compression

2. Verify PWA functionality:
   - Check service worker registration
   - Test offline functionality
   - Verify app installation

3. Monitor application:
   - Set up error tracking with Sentry
   - Configure performance monitoring
   - Set up uptime monitoring

## Production Checklist

- [ ] Update meta tags and SEO information
- [ ] Configure proper caching strategies
- [ ] Enable GZIP/Brotli compression
- [ ] Set up SSL/TLS
- [ ] Configure proper CORS headers
- [ ] Set up proper CSP headers
- [ ] Enable rate limiting
- [ ] Configure proper error pages
- [ ] Set up monitoring and analytics
- [ ] Test PWA functionality
- [ ] Verify all API endpoints
- [ ] Check performance metrics
- [ ] Test on multiple devices/browsers

## Performance Optimizations

The build is optimized for production with:
- Code splitting
- Tree shaking
- Minification
- Compression
- Caching strategies
- Lazy loading
- Image optimization

## Security Considerations

- All API keys are stored in environment variables
- Authentication is handled securely through Firebase
- HTTPS is enforced
- Proper CSP headers are configured
- Input validation is implemented
- Rate limiting is enabled

## Support

For support, email [your-email] or join our Slack channel.

## License

[Your License] - see LICENSE.md for details