import express from 'express'
import { authenticate } from '../middleware/auth.js'
import File from '../models/File.js'
import Notebook from '../models/Notebook.js'

const router = express.Router()

// Global search
router.get('/', authenticate, async (req, res) => {
  try {
    const query = req.query.q || ''

    if (!query.trim()) {
      return res.json({ files: [], notebooks: [], pages: [] })
    }

    const searchRegex = new RegExp(query, 'i')

    // Search files
    const files = await File.find({
      user: req.user._id,
      name: searchRegex,
    }).limit(20)

    // Search notebooks
    const notebooks = await Notebook.find({
      user: req.user._id,
      $or: [{ title: searchRegex }, { tags: { $in: [searchRegex] } }],
    })
      .select('-sections.pages.content')
      .limit(20)

    // Search pages
    const allNotebooks = await Notebook.find({ user: req.user._id })
    const pages = []

    allNotebooks.forEach((notebook) => {
      notebook.sections.forEach((section) => {
        section.pages.forEach((page) => {
          const pageContent = JSON.stringify(page.content)
          if (
            searchRegex.test(page.title) ||
            searchRegex.test(pageContent)
          ) {
            pages.push({
              _id: page._id,
              title: page.title,
              sectionName: section.name,
              notebookTitle: notebook.title,
              notebookId: notebook._id,
            })
          }
        })
      })
    })

    res.json({
      files: files.slice(0, 20),
      notebooks: notebooks.slice(0, 20),
      pages: pages.slice(0, 20),
    })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router

