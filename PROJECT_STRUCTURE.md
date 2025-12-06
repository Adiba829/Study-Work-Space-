# Project Structure

## Study Workspace - Full Stack Application

```
study-workspace/
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Layout.jsx    # Main layout with sidebar
│   │   │   ├── BlockEditor.jsx  # Tiptap rich text editor
│   │   │   ├── PDFViewer.jsx    # PDF preview component
│   │   │   └── ImageViewer.jsx   # Image preview component
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FileExplorer.jsx
│   │   │   ├── Notebooks.jsx
│   │   │   ├── NotebookEditor.jsx
│   │   │   ├── Search.jsx
│   │   │   └── Settings.jsx
│   │   ├── store/           # Zustand state management
│   │   │   ├── authStore.js
│   │   │   └── themeStore.js
│   │   ├── utils/           # Utility functions
│   │   │   └── api.js       # Axios API client
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── vercel.json          # Vercel deployment config
│   └── netlify.toml         # Netlify deployment config
│
├── backend/                 # Node.js + Express Backend
│   ├── models/              # MongoDB models
│   │   ├── User.js
│   │   ├── File.js
│   │   ├── Folder.js
│   │   └── Notebook.js
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── files.js         # File management routes
│   │   ├── notebooks.js     # Notebook routes
│   │   ├── dashboard.js     # Dashboard stats
│   │   ├── search.js        # Global search
│   │   └── settings.js      # Settings routes
│   ├── middleware/          # Express middleware
│   │   └── auth.js          # JWT authentication
│   ├── utils/               # Utility functions
│   │   └── cloudinary.js    # Cloudinary integration
│   ├── server.js            # Express server
│   ├── package.json
│   ├── Dockerfile           # Docker configuration
│   ├── Procfile             # Railway/Heroku config
│   ├── render.yaml          # Render deployment config
│   └── railway.json         # Railway deployment config
│
├── package.json             # Root package.json
├── README.md                # Main documentation
├── SETUP.md                 # Setup instructions
└── .gitignore
```

## Key Features Implemented

### Frontend
- ✅ React 18 with Vite
- ✅ Tailwind CSS with dark mode
- ✅ React Router for navigation
- ✅ Zustand for state management
- ✅ Tiptap block editor with:
  - Headings (H1, H2, H3)
  - Bold, Italic
  - Bullet lists, Ordered lists
  - Task lists (checklists)
  - Blockquotes
  - Code blocks
  - Images
  - Tables
- ✅ PDF.js for PDF preview
- ✅ Image preview
- ✅ Responsive design
- ✅ Theme switching (light/dark)

### Backend
- ✅ Express.js REST API
- ✅ MongoDB with Mongoose
- ✅ JWT authentication
- ✅ Multer for file uploads
- ✅ Cloudinary integration
- ✅ File management (upload, delete, organize)
- ✅ Folder system
- ✅ Notebook system (sections & pages)
- ✅ Global search
- ✅ Storage tracking
- ✅ Tags system

### Database Models
- **User**: Authentication, storage limits
- **File**: File metadata, Cloudinary URLs
- **Folder**: Folder hierarchy
- **Notebook**: Notebooks with sections and pages

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Files
- `GET /api/files` - Get files and folders
- `POST /api/files/upload` - Upload files
- `POST /api/files/folders` - Create folder
- `DELETE /api/files/:fileId` - Delete file

### Notebooks
- `GET /api/notebooks` - Get all notebooks
- `GET /api/notebooks/:id` - Get single notebook
- `POST /api/notebooks` - Create notebook
- `PUT /api/notebooks/:id` - Update notebook
- `DELETE /api/notebooks/:id` - Delete notebook
- `POST /api/notebooks/:id/sections` - Create section
- `POST /api/notebooks/:id/sections/:sectionId/pages` - Create page
- `PUT /api/notebooks/:id/sections/:sectionId/pages/:pageId` - Update page

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Search
- `GET /api/search?q=query` - Global search

### Settings
- `GET /api/settings/storage` - Get storage info

## Technology Stack

### Frontend
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.3.6
- React Router 6.20.0
- Tiptap 2.1.13
- Zustand 4.4.7
- PDF.js 3.11.174
- Axios 1.6.2
- Lucide React (icons)

### Backend
- Node.js 18+
- Express 4.18.2
- MongoDB with Mongoose 8.0.3
- JWT (jsonwebtoken 9.0.2)
- Bcrypt 2.4.3
- Multer 1.4.5
- Cloudinary 1.41.0
- CORS 2.8.5

## Deployment

### Frontend
- **Vercel**: Configured with `vercel.json`
- **Netlify**: Configured with `netlify.toml`

### Backend
- **Render**: Configured with `render.yaml`
- **Railway**: Configured with `railway.json` and `Procfile`
- **Docker**: Dockerfile included

### Database
- **MongoDB Atlas**: Cloud MongoDB service

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `NODE_ENV` - Environment (development/production)

### Frontend
- `VITE_API_URL` - Backend API URL

## Next Steps (Optional Features)

1. **AI Summaries**: Integrate OpenAI/Claude API
2. **OCR**: Add Tesseract.js or cloud OCR service
3. **Collaboration**: Real-time editing with Socket.io
4. **Analytics**: Track study time, pages created, etc.
5. **Export**: PDF, Markdown, HTML export
6. **Import**: Import from Notion, Obsidian, etc.
7. **Version History**: Track changes to pages
8. **Comments**: Add comments to pages
9. **Templates**: Pre-built notebook templates
10. **Mobile App**: React Native version

