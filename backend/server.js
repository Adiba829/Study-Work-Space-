import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import fileRoutes from './routes/files.js'
import notebookRoutes from './routes/notebooks.js'
import dashboardRoutes from './routes/dashboard.js'
import searchRoutes from './routes/search.js'
import settingsRoutes from './routes/settings.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean)
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', { ...req.body, password: req.body.password ? '***' : undefined })
  }
  next()
})

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/study-workspace')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    console.error('\n MongoDB is not running or connection string is incorrect.')
    console.error('Options:')
    console.error('1. Start local MongoDB: net start MongoDB (Windows) or sudo systemctl start mongod (Linux/Mac)')
    console.error('2. Use MongoDB Atlas: Update MONGODB_URI in backend/.env with your Atlas connection string')
    console.error('   Example: mongodb+srv://username:password@cluster.mongodb.net/study-workspace')

    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
  })

app.use('/api/auth', authRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/notebooks', notebookRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/settings', settingsRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Study Workspace API is running' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!', error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})