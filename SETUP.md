# Study Workspace - Setup Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB (local or MongoDB Atlas account)
- Cloudinary account (for file storage) or AWS S3 credentials
- Git

## Step 1: Clone and Install

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Step 2: MongoDB Setup

### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/study-workspace`

### Option B: MongoDB Atlas (Recommended for production)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Add your IP to whitelist
5. Create a database user

## Step 3: Cloudinary Setup

1. Create account at https://cloudinary.com
2. Get your:
   - Cloud Name
   - API Key
   - API Secret

## Step 4: Environment Variables

### Backend (`backend/.env`)
Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key-change-this-in-production
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=development
```

### Frontend (`frontend/.env`)
Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

## Step 5: Run the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Step 6: First User

1. Open http://localhost:3000
2. Click "Create a new account"
3. Register with your email and password
4. Start using the application!

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL` (your backend URL)

### Frontend (Netlify)

1. Push code to GitHub
2. Import project in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_URL` (your backend URL)

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service in Render
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add all environment variables from `.env`

### Backend (Railway)

1. Push code to GitHub
2. Create new project in Railway
3. Deploy from GitHub
4. Add all environment variables from `.env`
5. Railway will auto-detect Node.js

### Database (MongoDB Atlas)

1. Create free cluster at MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in backend environment variables

## Features

✅ User authentication (JWT)
✅ File upload and management
✅ Folder organization
✅ PDF and image preview
✅ Notebooks with sections and pages
✅ Rich text editor (Tiptap)
✅ Global search
✅ Tags system
✅ Dark/Light theme
✅ Storage tracking
✅ Responsive design

## Optional Features (To Implement)

- AI summaries
- OCR for images
- Collaboration (sharing)
- Analytics dashboard
- Export notebooks (PDF, Markdown)
- Import from other platforms

## Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running
- Verify connection string
- Check firewall/network settings

### File Upload Issues
- Verify Cloudinary credentials
- Check file size limits (100MB default)
- Ensure CORS is configured

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET is set
- Verify token expiration

## Support

For issues or questions, please check the documentation or create an issue in the repository.

