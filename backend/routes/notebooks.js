import express from 'express'
import { authenticate } from '../middleware/auth.js'
import Notebook from '../models/Notebook.js'

const router = express.Router()

// Get all notebooks
router.get('/', authenticate, async (req, res) => {
  try {
    const notebooks = await Notebook.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select('-sections.pages.content')

    res.json({ notebooks })
  } catch (error) {
    console.error('Get notebooks error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get single notebook
router.get('/:notebookId', authenticate, async (req, res) => {
  try {
    const notebook = await Notebook.findOne({
      _id: req.params.notebookId,
      user: req.user._id,
    })

    if (!notebook) {
      return res.status(404).json({ message: 'Notebook not found' })
    }

    res.json({ notebook })
  } catch (error) {
    console.error('Get notebook error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create notebook
router.post('/', authenticate, async (req, res) => {
  try {
    const { title } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Notebook title is required' })
    }

    const notebook = new Notebook({
      title,
      sections: [],
      tags: [],
      user: req.user._id,
    })

    await notebook.save()
    res.json({ message: 'Notebook created successfully', notebook })
  } catch (error) {
    console.error('Create notebook error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Update notebook
router.put('/:notebookId', authenticate, async (req, res) => {
  try {
    const { title, tags } = req.body

    const notebook = await Notebook.findOne({
      _id: req.params.notebookId,
      user: req.user._id,
    })

    if (!notebook) {
      return res.status(404).json({ message: 'Notebook not found' })
    }

    if (title) notebook.title = title
    if (tags) notebook.tags = tags

    await notebook.save()
    res.json({ message: 'Notebook updated successfully', notebook })
  } catch (error) {
    console.error('Update notebook error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete notebook
router.delete('/:notebookId', authenticate, async (req, res) => {
  try {
    const notebook = await Notebook.findOne({
      _id: req.params.notebookId,
      user: req.user._id,
    })

    if (!notebook) {
      return res.status(404).json({ message: 'Notebook not found' })
    }

    await Notebook.findByIdAndDelete(req.params.notebookId)
    res.json({ message: 'Notebook deleted successfully' })
  } catch (error) {
    console.error('Delete notebook error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create section
router.post('/:notebookId/sections', authenticate, async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Section name is required' })
    }

    const notebook = await Notebook.findOne({
      _id: req.params.notebookId,
      user: req.user._id,
    })

    if (!notebook) {
      return res.status(404).json({ message: 'Notebook not found' })
    }

    notebook.sections.push({ name, pages: [] })
    await notebook.save()

    const section = notebook.sections[notebook.sections.length - 1]
    res.json({ message: 'Section created successfully', section })
  } catch (error) {
    console.error('Create section error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create page
router.post('/:notebookId/sections/:sectionId/pages', authenticate, async (req, res) => {
  try {
    const { title } = req.body

    const notebook = await Notebook.findOne({
      _id: req.params.notebookId,
      user: req.user._id,
    })

    if (!notebook) {
      return res.status(404).json({ message: 'Notebook not found' })
    }

    const section = notebook.sections.id(req.params.sectionId)
    if (!section) {
      return res.status(404).json({ message: 'Section not found' })
    }

    section.pages.push({ title: title || 'Untitled Page', content: {} })
    await notebook.save()

    const page = section.pages[section.pages.length - 1]
    res.json({ message: 'Page created successfully', page })
  } catch (error) {
    console.error('Create page error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Update page
router.put('/:notebookId/sections/:sectionId/pages/:pageId', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body

    const notebook = await Notebook.findOne({
      _id: req.params.notebookId,
      user: req.user._id,
    })

    if (!notebook) {
      return res.status(404).json({ message: 'Notebook not found' })
    }

    const section = notebook.sections.id(req.params.sectionId)
    if (!section) {
      return res.status(404).json({ message: 'Section not found' })
    }

    const page = section.pages.id(req.params.pageId)
    if (!page) {
      return res.status(404).json({ message: 'Page not found' })
    }

    if (title) page.title = title
    if (content !== undefined) page.content = content

    await notebook.save()
    res.json({ message: 'Page updated successfully', page })
  } catch (error) {
    console.error('Update page error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router

