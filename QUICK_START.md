# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ MongoDB running (local) OR MongoDB Atlas account

## Step 1: Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Step 2: Set Up Environment Variables

### Backend Environment (`backend/.env`)

Create a file named `.env` in the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-workspace
JWT_SECRET=your-super-secret-jwt-key-change-this
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=development
```

**For MongoDB Atlas:**
- Get connection string from MongoDB Atlas dashboard
- Replace `MONGODB_URI` with your Atlas connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/study-workspace`

**For Cloudinary:**
- Sign up at https://cloudinary.com (free tier available)
- Get credentials from dashboard
- Fill in the three Cloudinary variables

**For local testing without Cloudinary:**
- You can temporarily use dummy values, but file uploads won't work

### Frontend Environment (`frontend/.env`)

Create a file named `.env` in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Start MongoDB (If Using Local)

### Windows:
```bash
net start MongoDB
```

### Mac/Linux:
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

## Step 4: Start the Application

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

You should see:
```
Connected to MongoDB
Server is running on port 5000
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

## Step 5: Access the Application

1. Open your browser
2. Go to http://localhost:3000
3. Click "Create a new account"
4. Register with:
   - Name: Your name
   - Email: your@email.com
   - Password: (at least 6 characters)

## Troubleshooting

### Backend won't start:
- ✅ Check MongoDB is running
- ✅ Verify `.env` file exists in `backend/` folder
- ✅ Check port 5000 is not in use

### Frontend won't start:
- ✅ Check Node.js version (18+)
- ✅ Verify dependencies installed (`npm install`)
- ✅ Check port 3000 is not in use

### Can't connect to MongoDB:
- ✅ Verify MongoDB is running (local)
- ✅ Check connection string in `.env`
- ✅ For Atlas: Check IP whitelist and credentials

### Authentication fails:
- ✅ Check backend is running on port 5000
- ✅ Verify `JWT_SECRET` is set in `.env`
- ✅ Check browser console (F12) for errors

### File upload fails:
- ✅ Verify Cloudinary credentials in `.env`
- ✅ Check backend is running
- ✅ Verify file size is under 100MB

## Common Commands

```bash
# Install all dependencies
cd frontend && npm install
cd ../backend && npm install

# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev

# Build for production
cd frontend
npm run build

# Check if MongoDB is running (Windows)
net start MongoDB

# Check Node version
node --version
```

## Next Steps

Once everything is running:
1. ✅ Create your account
2. ✅ Upload some files
3. ✅ Create a notebook
4. ✅ Start taking notes!

For more help, see `TROUBLESHOOTING.md`

