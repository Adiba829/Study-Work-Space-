import express from 'express'
import multer from 'multer'
import { authenticate } from '../middleware/auth.js'
import File from '../models/File.js'
import Folder from '../models/Folder.js'
import User from '../models/User.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js'

const router = express.Router()

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
})

// Get all files and folders
router.get('/', authenticate, async (req, res) => {
  try {
    const folderId = req.query.folderId || null
    const query = { user: req.user._id, folder: folderId || null }

    const files = await File.find(query).sort({ updatedAt: -1 })
    const folders = await Folder.find({
      user: req.user._id,
      parent: folderId || null,
    }).sort({ name: 1 })

    res.json({ files, folders })
  } catch (error) {
    console.error('Get files error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Upload files
router.post('/upload', authenticate, upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' })
    }

    const folderId = req.body.folderId || null
    const uploadedFiles = []

    for (const file of req.files) {
      try {
        // Upload to Cloudinary
        const result = await uploadToCloudinary(file.buffer, `study-workspace/${req.user._id}`)

        // Create file record
        const fileRecord = new File({
          name: file.originalname,
          url: result.secure_url,
          cloudinaryId: result.public_id,
          mimeType: file.mimetype,
          size: file.size,
          folder: folderId,
          user: req.user._id,
        })

        await fileRecord.save()

        // Update user storage
        const user = await User.findById(req.user._id)
        user.storageUsed += file.size
        await user.save()

        uploadedFiles.push(fileRecord)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }

    res.json({ message: 'Files uploaded successfully', files: uploadedFiles })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create folder
router.post('/folders', authenticate, async (req, res) => {
  try {
    const { name, parentId } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Folder name is required' })
    }

    const folder = new Folder({
      name,
      parent: parentId || null,
      user: req.user._id,
    })

    await folder.save()
    res.json({ message: 'Folder created successfully', folder })
  } catch (error) {
    console.error('Create folder error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete file
router.delete('/:fileId', authenticate, async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.params.fileId, user: req.user._id })

    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Delete from Cloudinary
    if (file.cloudinaryId) {
      await deleteFromCloudinary(file.cloudinaryId)
    }

    // Update user storage
    const user = await User.findById(req.user._id)
    user.storageUsed = Math.max(0, user.storageUsed - file.size)
    await user.save()

    // Delete file record
    await File.findByIdAndDelete(req.params.fileId)

    res.json({ message: 'File deleted successfully' })
  } catch (error) {
    console.error('Delete file error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router

