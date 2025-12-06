# 🚀 START HERE - Get Your Project Running

## ⚠️ Most Common Issue: Dependencies Not Installed

If the project isn't working, **the #1 reason is missing dependencies**.

### Fix It Now:

```bash
# 1. Install frontend dependencies
cd frontend
npm install

# 2. Install backend dependencies  
cd ../backend
npm install
```

## 📋 Complete Setup Checklist

Follow these steps in order:

### ✅ Step 1: Install Dependencies
```bash
cd frontend
npm install
cd ../backend
npm install
```

### ✅ Step 2: Create Environment Files

**Create `backend/.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-workspace
JWT_SECRET=change-this-to-a-random-string
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=development
```

**Create `frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

### ✅ Step 3: Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

**OR use MongoDB Atlas** (cloud - no installation needed):
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `MONGODB_URI` in `backend/.env`

### ✅ Step 4: Start Backend

Open Terminal 1:
```bash
cd backend
npm run dev
```

**Expected output:**
```
Connected to MongoDB
Server is running on port 5000
```

### ✅ Step 5: Start Frontend

Open Terminal 2:
```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

### ✅ Step 6: Open Browser

Go to: **http://localhost:3000**

## 🔍 Quick Diagnostics

### Check if dependencies are installed:
```bash
# Frontend
cd frontend
ls node_modules  # Should show many folders

# Backend
cd backend
ls node_modules  # Should show many folders
```

### Check if servers are running:
```bash
# Backend health check
curl http://localhost:5000/api/health

# Should return: {"status":"ok","message":"Study Workspace API is running"}
```

### Check for errors:
1. **Backend terminal** - Look for red error messages
2. **Frontend terminal** - Look for red error messages
3. **Browser console** (F12) - Look for red error messages

## 🐛 Common Problems

| Problem | Solution |
|---------|----------|
| `Cannot find module` | Run `npm install` in that directory |
| `Port 5000 already in use` | Kill the process or change PORT in `.env` |
| `MongoDB connection error` | Start MongoDB or check connection string |
| `JWT_SECRET is not defined` | Add `JWT_SECRET` to `backend/.env` |
| Frontend shows blank page | Check browser console (F12) for errors |
| Can't login/register | Check backend is running on port 5000 |

## 📚 More Help

- **Quick Start:** See `QUICK_START.md`
- **Troubleshooting:** See `TROUBLESHOOTING.md`
- **Full Setup:** See `SETUP.md`
- **Project Structure:** See `PROJECT_STRUCTURE.md`

## 🎯 Minimum Requirements to Run

1. ✅ Node.js 18+ installed
2. ✅ Dependencies installed (`npm install` in both folders)
3. ✅ MongoDB running (local or Atlas)
4. ✅ `backend/.env` file created
5. ✅ `frontend/.env` file created
6. ✅ Backend server running (`npm run dev` in backend)
7. ✅ Frontend server running (`npm run dev` in frontend)

## 💡 Pro Tips

- **Use MongoDB Atlas** (free) instead of local MongoDB - easier setup
- **Cloudinary has a free tier** - sign up for file uploads
- **Check both terminals** - errors show in the terminal where the server is running
- **Clear browser cache** if you see old errors: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## ✅ Success Indicators

You'll know it's working when:
- ✅ Backend shows "Connected to MongoDB" and "Server is running"
- ✅ Frontend shows "Local: http://localhost:3000/"
- ✅ Browser opens to login page (not blank/error)
- ✅ You can register a new account
- ✅ You can login and see the dashboard

---

**Still stuck?** Check `TROUBLESHOOTING.md` for detailed solutions!

