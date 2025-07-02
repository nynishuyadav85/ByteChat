#!/bin/bash

echo "🚀 ByteChat Deployment Script"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - ByteChat application"
fi

echo "Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo ""
    echo "🎯 Deployment Options:"
    echo "1. Vercel (Recommended)"
    echo "2. Railway"
    echo "3. Netlify (Frontend only)"
    echo ""
    
    echo "To deploy with Vercel:"
    echo "1. Run: vercel login"
    echo "2. Run: vercel --prod"
    echo "3. Add environment variables in Vercel dashboard"
    echo ""
    
    echo "To deploy with Railway:"
    echo "1. Run: railway login"
    echo "2. Run: railway up"
    echo ""
    
    echo "📋 Environment variables to add:"
    echo "NODE_ENV=production"
    echo "PORT=5001"
    echo "MONGODB_URI=mongodb+srv://nynishuyadav85:nyTaznCjwbNizgiZ@cluster0.pen64.mongodb.net/byte_chat?retryWrites=true&w=majority&appName=Cluster0"
    echo "JWT_KEY=your_secret_jwt_key_change_this"
    echo "CLOUDINARY_CLOUD_NAME=djdgw8fkf"
    echo "CLOUDINARY_API_KEY=149186732464386"
    echo "CLOUDINARY_SECRET=elL3A_FbraFvYzVZCA1gy4ckOd0"
    
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi