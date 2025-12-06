# Troubleshooting Guide

## Common Issues and Solutions

### 1. Dependencies Not Installed

**Problem:** `node_modules` folder is missing or incomplete.

**Solution:**
```bash
# Install all dependencies
cd frontend
npm install

cd ../backend
npm install
```

### 2. Frontend Won't Start

**Problem:** Vite dev server fails to start.

**Solutions:**
- Check Node.js version (need 18+): `node --version`
- Clear cache and reinstall:
  ```bash
  cd frontend
  rm -rf node_modules package-lock.json
  npm install
  ```
- Check for port conflicts (default port 3000)

### 3. Backend Won't Start

**Problem:** Express server fails to start.

**Solutions:**
- Check if MongoDB is running (if using local MongoDB)
- Verify `.env` file exists in `backend/` folder
- Check MongoDB connection string
- Ensure port 5000 is not in use

### 4. MongoDB Connection Error

**Problem:** `MongoDB connection error` in console.

**Solutions:**
- **Local MongoDB:** Ensure MongoDB service is running
  ```bash
  # Windows
  net start MongoDB
  
  # Mac/Linux
  sudo systemctl start mongod
  ```
- **MongoDB Atlas:** 
  - Verify connection string in `.env`
  - Check IP whitelist in Atlas dashboard
  - Verify database user credentials

### 5. Authentication Not Working

**Problem:** Can't login or register.

**Solutions:**
- Check backend is running on port 5000
- Verify `JWT_SECRET` is set in backend `.env`
- Check browser console for CORS errors
- Clear browser localStorage:
  ```javascript
  localStorage.clear()
  ```

### 6. File Upload Fails

**Problem:** Files won't upload.

**Solutions:**
- Verify Cloudinary credentials in backend `.env`:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Check file size (limit is 100MB)
- Verify backend is running

### 7. PDF Preview Not Working

**Problem:** PDFs don't display.

**Solutions:**
- Check browser console for PDF.js errors
- Verify PDF.js CDN is accessible
- Try a different PDF file
- Check CORS settings if using external PDFs

### 8. Editor Not Loading

**Problem:** Tiptap editor doesn't appear.

**Solutions:**
- Check browser console for errors
- Verify all Tiptap packages are installed:
  ```bash
  cd frontend
  npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-table @tiptap/extension-code-block
  ```

### 9. CORS Errors

**Problem:** `Access-Control-Allow-Origin` errors.

**Solutions:**
- Backend should have CORS enabled (already configured)
- If deploying, update CORS origin in `backend/server.js`:
  ```javascript
  app.use(cors({
    origin: 'https://your-frontend-url.com'
  }))
  ```

### 10. Environment Variables Not Loading

**Problem:** Variables from `.env` not working.

**Solutions:**
- **Backend:** Ensure `.env` is in `backend/` folder (not root)
- **Frontend:** Use `VITE_` prefix for variables
- Restart dev servers after changing `.env`

### 11. Zustand Persist Not Working

**Problem:** Auth state not persisting.

**Solutions:**
- Clear browser localStorage
- Check browser console for errors
- Verify zustand is installed: `npm list zustand`

### 12. Build Errors

**Problem:** `npm run build` fails.

**Solutions:**
- Check for TypeScript errors (if using TS)
- Verify all imports are correct
- Clear build cache:
  ```bash
  cd frontend
  rm -rf dist node_modules/.vite
  npm run build
  ```

## Quick Diagnostic Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check if MongoDB is running (local)
# Windows
net start MongoDB

# Check backend dependencies
cd backend
npm list --depth=0

# Check frontend dependencies
cd frontend
npm list --depth=0

# Test backend connection
curl http://localhost:5000/api/health

# Check for port conflicts
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

## Step-by-Step Fresh Start

If nothing works, try a complete fresh start:

1. **Clean everything:**
   ```bash
   # Delete node_modules
   rm -rf frontend/node_modules backend/node_modules
   rm -rf frontend/package-lock.json backend/package-lock.json
   ```

2. **Reinstall dependencies:**
   ```bash
   cd frontend
   npm install
   
   cd ../backend
   npm install
   ```

3. **Verify environment files:**
   - `backend/.env` exists with all variables
   - `frontend/.env` exists with `VITE_API_URL`

4. **Start MongoDB** (if local)

5. **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start frontend (new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Test:**
   - Open http://localhost:3000
   - Check browser console (F12)
   - Check backend terminal for errors

## Getting Help

If issues persist:
1. Check browser console (F12) for errors
2. Check backend terminal for errors
3. Verify all environment variables are set
4. Check MongoDB connection
5. Verify all dependencies are installed

## Common Error Messages

### "Cannot find module"
- Run `npm install` in the affected directory

### "Port already in use"
- Change port in config or kill the process using the port

### "MongoDB connection error"
- Check MongoDB is running
- Verify connection string

### "JWT_SECRET is not defined"
- Add `JWT_SECRET` to `backend/.env`

### "Cloudinary upload failed"
- Verify Cloudinary credentials in `backend/.env`

