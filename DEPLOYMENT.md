# ByteChat Deployment Guide

Your chat application is now ready for deployment! Here are multiple free hosting options:

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended for beginners)
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Add environment variables in Vercel dashboard

### Option 2: Railway (Great for full-stack)
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`

### Option 3: Render
1. Connect your GitHub repo to Render
2. Use the `Backend/render.yaml` configuration
3. Add environment variables in Render dashboard

## 🔧 Environment Variables Needed

Add these in your hosting platform's environment variables section:

```
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://nynishuyadav85:nyTaznCjwbNizgiZ@cluster0.pen64.mongodb.net/byte_chat?retryWrites=true&w=majority&appName=Cluster0
JWT_KEY=your_secret_jwt_key_change_this
CLOUDINARY_CLOUD_NAME=djdgw8fkf
CLOUDINARY_API_KEY=149186732464386
CLOUDINARY_SECRET=elL3A_FbraFvYzVZCA1gy4ckOd0
```

## 📝 Post-Deployment Steps

1. **Update CORS origins** in `Backend/src/index.js`:
   ```javascript
   const allowedOrigins = [
       "http://localhost:5173",
       "https://your-actual-domain.vercel.app", // Replace with your domain
   ];
   ```

2. **Test your deployment**:
   - Check if the frontend loads
   - Try registering/logging in
   - Test real-time messaging

## 🛠️ Local Development

```bash
# Install dependencies
npm run install:all

# Run backend (Terminal 1)
npm run dev:backend

# Run frontend (Terminal 2) 
npm run dev:frontend
```

## 🔍 Troubleshooting

- **CORS errors**: Update the `allowedOrigins` array with your production URL
- **Database connection**: Ensure MongoDB Atlas whitelist includes 0.0.0.0/0
- **Socket.io issues**: Check that your frontend connects to the correct backend URL

## 📱 Free Hosting Alternatives

- **Frontend**: Netlify, GitHub Pages, Surge.sh
- **Backend**: Cyclic, Fly.io, Heroku (limited free tier)
- **Database**: MongoDB Atlas (512MB free), PlanetScale, Supabase

Your app is production-ready! 🎉