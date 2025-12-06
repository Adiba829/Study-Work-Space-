# MongoDB Atlas Quick Setup Guide

## 🚀 Fast Setup (5 minutes)

### Step 1: Create Account & Cluster
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with email (free account)
3. Click **"Build a Database"**
4. Choose **"M0 FREE"** tier
5. Select region closest to you
6. Click **"Create"**
7. Wait 1-3 minutes for cluster to deploy

### Step 2: Create Database User
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. **Authentication Method:** Password
4. **Username:** `admin` (or any name)
5. **Password:** Create a strong password ⚠️ **SAVE THIS!**
6. **Database User Privileges:**** "Read and write to any database"
7. Click **"Add User"**

### Step 3: Configure Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your specific IP: `0.0.0.0/0`
4. Click **"Confirm"**

### Step 4: Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 5: Update backend/.env

Open `backend/.env` and update the `MONGODB_URI` line:

**Before:**
```env
MONGODB_URI=mongodb://localhost:27017/study-workspace
```

**After (replace with your values):**
```env
MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/study-workspace?retryWrites=true&w=majority
```

**Important:**
- Replace `admin` with your database username
- Replace `YourPassword123` with your database password
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- **Add `/study-workspace`** before the `?` (this is your database name)

### Step 6: Restart Backend

1. Stop backend server (Ctrl+C in backend terminal)
2. Start again:
   ```powershell
   cd backend
   npm run dev
   ```
3. Should see: **`Connected to MongoDB`** ✅

---

## 📝 Example Connection String

```
mongodb+srv://admin:mypassword123@cluster0.abc123.mongodb.net/study-workspace?retryWrites=true&w=majority
```

Breakdown:
- `admin` = your database username
- `mypassword123` = your database password
- `cluster0.abc123.mongodb.net` = your cluster URL
- `/study-workspace` = database name
- `?retryWrites=true&w=majority` = connection options

---

## ✅ Verification

After updating `.env` and restarting backend, you should see:

```
Connected to MongoDB
Server is running on port 5000
```

**If you still see connection error:**
- Double-check username and password in connection string
- Verify network access allows your IP
- Make sure you added `/study-workspace` before the `?`
- Check for typos in the connection string

---

## 🆘 Troubleshooting

### "Authentication failed"
- Check username and password are correct
- Make sure password doesn't have special characters that need URL encoding

### "Network access denied"
- Go to Network Access in Atlas
- Make sure "Allow Access from Anywhere" is enabled
- Or add your current IP address

### "Invalid connection string"
- Make sure format is: `mongodb+srv://username:password@cluster.net/database?options`
- Check for typos
- Ensure `/study-workspace` is included before `?`

---

## 🎯 Quick Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0)
- [ ] Created database user
- [ ] Allowed network access
- [ ] Copied connection string
- [ ] Updated `backend/.env` with connection string
- [ ] Restarted backend server
- [ ] See "Connected to MongoDB" message

**Once all checked ✅, your database is connected!**

