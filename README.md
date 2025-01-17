# Swasthya by Shrinu

A comprehensive healthcare platform built with React, TypeScript, and Vite, optimized for both web and mobile.

## Features

- Emergency Services Locator with Real-time GPS
- Health AI Assistant
- Doctor Consultations
- Medicine Search
- Emergency Support
- Health Records Management
- Offline Support (PWA)
- Mobile-Optimized Interface

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- For mobile development: Android Studio / Xcode

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd healthcare
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Mobile Development

### Android App

1. Install Android Studio and required SDKs

2. Install Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/android
   npx cap init
   ```

3. Build the web app:
   ```bash
   npm run build
   ```

4. Add Android platform:
   ```bash
   npx cap add android
   ```

5. Update Android project:
   ```bash
   npx cap sync
   ```

6. Open in Android Studio:
   ```bash
   npx cap open android
   ```

### iOS App

1. Install Xcode (Mac only)

2. Install Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/ios
   npx cap init
   ```

3. Build the web app:
   ```bash
   npm run build
   ```

4. Add iOS platform:
   ```bash
   npx cap add ios
   ```

5. Update iOS project:
   ```bash
   npx cap sync
   ```

6. Open in Xcode:
   ```bash
   npx cap open ios
   ```

## Web Deployment

### Production Build

1. Create production build:
   ```bash
   npm run build
   ```

2. Test production build locally:
   ```bash
   npm run preview
   ```

### Deployment Options

1. **Vercel (Recommended)**
   - Connect your GitHub repository
   - Import project in Vercel
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

2. **Netlify**
   - Connect your GitHub repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Publish Directory: `dist`

3. **AWS S3 + CloudFront**
   - Create S3 bucket
   - Enable static website hosting
   - Configure CloudFront distribution
   - Upload build files:
     ```bash
     aws s3 sync dist/ s3://your-bucket-name
     ```

4. **Docker Deployment**
   - Build Docker image:
     ```bash
     docker build -t swasthyacare .
     ```
   - Run container:
     ```bash
     docker run -p 80:80 swasthyacare
     ```

## Mobile-Specific Features

- Responsive design for all screen sizes
- Touch-optimized interface
- Native-like gestures
- Offline support via Service Workers
- Push notifications
- GPS integration
- Camera access for prescriptions
- Biometric authentication

## Performance Optimizations

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Minification
- Compression
- Tree shaking

## Security Features

- HTTPS enforcement
- Content Security Policy
- XSS protection
- CORS configuration
- Input sanitization
- API rate limiting
- Secure storage

## Monitoring and Analytics

- Error tracking
- Performance monitoring
- User analytics
- Crash reporting
- Usage metrics

## Support

For support, email support@swasthyacare.com or join our Slack channel.

## License

This project is licensed under the MIT License - see the LICENSE file for details.