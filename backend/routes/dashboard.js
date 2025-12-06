import express from 'express'
import { authenticate } from '../middleware/auth.js'
import File from '../models/File.js'
import Notebook from '../models/Notebook.js'

const router = express.Router()

// Get dashboard stats
router.get('/stats', authenticate, async (req, res) => {
  try {
    const [filesCount, notebooksCount, notebooks] = await Promise.all([
      File.countDocuments({ user: req.user._id }),
      Notebook.countDocuments({ user: req.user._id }),
      Notebook.find({ user: req.user._id }),
    ])

    let pagesCount = 0
    notebooks.forEach((notebook) => {
      notebook.sections.forEach((section) => {
        pagesCount += section.pages.length
      })
    })

    res.json({
      files: filesCount,
      notebooks: notebooksCount,
      pages: pagesCount,
      storageUsed: req.user.storageUsed || 0,
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router

