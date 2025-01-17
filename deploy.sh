#!/bin/bash

# Exit on error
set -e

# Check if required tools are installed
command -v npm >/dev/null 2>&1 || { echo "npm is required but not installed. Aborting." >&2; exit 1; }

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf dist dist.zip

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Create dist.zip file
echo "Creating distribution archive..."
if command -v zip >/dev/null 2>&1; then
    cd dist
    zip -r ../dist.zip .
    cd ..
else
    echo "Warning: zip command not found. Skipping archive creation."
fi

# Verify build
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "The distribution files are ready in the dist folder"
    if [ -f "dist.zip" ]; then
        echo "A compressed archive is available at dist.zip"
    fi
else
    echo "❌ Build failed!"
    exit 1
fi

# Print deployment instructions
echo "
Deployment Instructions:
1. Update .env.production with your production values
2. Upload the dist folder or dist.zip to your server
3. If using dist.zip, unzip it on your server
4. Configure your web server (nginx/apache) according to README.md
"