# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

**Why Atlas?** No installation needed, free tier available, works immediately.

### Step-by-Step Setup:

1. **Sign Up**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create Free Cluster**
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a cloud provider and region (closest to you)
   - Click "Create"
   - Wait 1-3 minutes for cluster to deploy

3. **Create Database User**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Authentication Method: Password
   - Username: `admin` (or any name you want)
   - Password: Create a strong password (SAVE THIS!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

6. **Update Your .env File**
   - Open `backend/.env`
   - Replace the connection string:
     ```env
     MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/study-workspace?retryWrites=true&w=majority
     ```
   - Replace:
     - `admin` with your database username
     - `YourPassword123` with your database password
     - `cluster0.xxxxx.mongodb.net` with your cluster URL
     - Add `/study-workspace` before the `?` (this is your database name)

7. **Test Connection**
   - Restart your backend server
   - You should see: `Connected to MongoDB`

### Example Connection String:
```
mongodb+srv://admin:mypassword123@cluster0.abc123.mongodb.net/study-workspace?retryWrites=true&w=majority
```

---

## Option 2: Install MongoDB Locally (Windows)

If you prefer local MongoDB:

### Installation Steps:

1. **Download MongoDB Community Server**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download and run installer

2. **Installation Options**
   - Choose "Complete" installation
   - Install as Windows Service: ✅ Yes
   - Install MongoDB Compass: ✅ Yes (optional GUI tool)
   - Click "Install"

3. **Start MongoDB Service**
   ```powershell
   net start MongoDB
   ```

4. **Verify Installation**
   - MongoDB should start automatically
   - Check service status:
     ```powershell
     Get-Service MongoDB
     ```

5. **Update .env**
   - Your `backend/.env` should already have:
     ```env
     MONGODB_URI=mongodb://localhost:27017/study-workspace
     ```

### Troubleshooting Local MongoDB:

**Service won't start:**
```powershell
# Check if service exists
Get-Service | Where-Object {$_.Name -like "*mongo*"}

# Try starting with full service name
net start "MongoDB Server"
```

**MongoDB not in PATH:**
- Default installation path: `C:\Program Files\MongoDB\Server\<version>\bin\`
- Add to PATH or use full path

**Port already in use:**
- Check what's using port 27017:
  ```powershell
  netstat -ano | findstr :27017
  ```

---

## Option 3: Use Docker (Advanced)

If you have Docker installed:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then use: `mongodb://localhost:27017/study-workspace`

---

## Quick Comparison

| Option | Pros | Cons |
|--------|------|------|
| **MongoDB Atlas** | ✅ No installation<br>✅ Free tier<br>✅ Works immediately<br>✅ Automatic backups | ⚠️ Requires internet<br>⚠️ 512MB storage limit (free) |
| **Local MongoDB** | ✅ Full control<br>✅ No internet needed<br>✅ Unlimited storage | ❌ Requires installation<br>❌ Manual setup<br>❌ Manual backups |
| **Docker** | ✅ Easy to start/stop<br>✅ Isolated environment | ❌ Requires Docker<br>❌ Manual setup |

---

## Recommendation

**For beginners:** Use MongoDB Atlas - it's the fastest way to get started.

**For production:** Use MongoDB Atlas or managed MongoDB service.

**For development:** Local MongoDB or Docker if you prefer.

---

## After Setup

Once MongoDB is connected, restart your backend:

```bash
cd backend
npm run dev
```

You should see:
```
Connected to MongoDB
Server is running on port 5000
```

If you see connection errors, double-check:
- ✅ Connection string is correct
- ✅ Database user password is correct
- ✅ Network access allows your IP
- ✅ Database name is included in connection string

