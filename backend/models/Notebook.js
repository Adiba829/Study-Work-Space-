import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Untitled Page',
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pages: [pageSchema],
  },
  {
    timestamps: true,
  }
)

const notebookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sections: [sectionSchema],
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Notebook', notebookSchema)

