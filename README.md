# Study Workspace

A full-stack study workspace that combines a cloud-based file explorer, structured digital notebooks, and a Notion-style block editor.

## Features

- 📁 **Cloud-based File Explorer**: Upload and organize study materials into folders, preview PDFs and images
- 📓 **Digital Notebooks**: Create notebooks with sections and pages
- ✍️ **Block Editor**: Rich notes using blocks (headings, checklists, tables, images, code)
- 🔍 **Global Search**: Search across all files and notes
- 🏷️ **Tags**: Organize content with tags
- 🎨 **Themes**: Customizable themes
- 💾 **Storage Tracking**: Monitor your storage usage
- 🤖 **AI Features**: Optional AI summaries and OCR
- 👥 **Collaboration**: Share and collaborate on notebooks
- 📊 **Analytics**: Track your study progress

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Tiptap (Block Editor)
- Zustand (State Management)
- React DnD (Drag and Drop)
- PDF.js (PDF Preview)

### Backend
- Node.js + Express
- JWT Authentication
- Multer (File Uploads)
- Cloudinary/S3 (File Storage)
- MongoDB (Database)

## 🚀 Quick Start

**New to this project?** Start here: **[START_HERE.md](./START_HERE.md)**

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (or S3) for file storage

### Installation

1. Install all dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

**Or use the root script:**
```bash
npm run install:all
```

2. Set up environment variables:

**Backend** (`backend/.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-workspace
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

3. Run the development servers:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## Deployment

- **Frontend**: Deploy to Vercel/Netlify
- **Backend**: Deploy to Render/Railway
- **Database**: MongoDB Atlas

## Project Structure

```
study-workspace/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
└── README.md
```

