import express from 'express'
import { authenticate } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

// Get storage info
router.get('/storage', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json({
      used: user.storageUsed || 0,
      limit: user.storageLimit || 10737418240, // 10GB
    })
  } catch (error) {
    console.error('Get storage error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router

