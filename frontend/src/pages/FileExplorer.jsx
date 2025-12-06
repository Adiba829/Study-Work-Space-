import { useState, useEffect } from 'react'
import api from '../utils/api'
import { Upload, FolderPlus, File, Image as ImageIcon, FileText, X, Download } from 'lucide-react'
import PDFViewer from '../components/PDFViewer'
import ImageViewer from '../components/ImageViewer'

export default function FileExplorer() {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)
  const [newFolderName, setNewFolderName] = useState('')
  const [showNewFolder, setShowNewFolder] = useState(false)

  useEffect(() => {
    fetchFiles()
  }, [currentFolder])

  const fetchFiles = async () => {
    try {
      const response = await api.get('/files', {
        params: { folderId: currentFolder?._id || null },
      })
      setFiles(response.data.files || [])
      setFolders(response.data.folders || [])
    } catch (error) {
      console.error('Failed to fetch files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length === 0) return

    setUploading(true)
    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append('files', file)
      })
      if (currentFolder) {
        formData.append('folderId', currentFolder._id)
      }

      await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      fetchFiles()
    } catch (error) {
      console.error('Failed to upload files:', error)
      alert('Failed to upload files')
    } finally {
      setUploading(false)
    }
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return

    try {
      await api.post('/files/folders', {
        name: newFolderName,
        parentId: currentFolder?._id || null,
      })
      setNewFolderName('')
      setShowNewFolder(false)
      fetchFiles()
    } catch (error) {
      console.error('Failed to create folder:', error)
      alert('Failed to create folder')
    }
  }

  const handleDeleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      await api.delete(`/files/${fileId}`)
      fetchFiles()
    } catch (error) {
      console.error('Failed to delete file:', error)
      alert('Failed to delete file')
    }
  }

  const getFileIcon = (file) => {
    if (file.mimeType?.startsWith('image/')) return ImageIcon
    if (file.mimeType === 'application/pdf') return FileText
    return File
  }

  const canPreview = (file) => {
    return (
      file.mimeType?.startsWith('image/') || file.mimeType === 'application/pdf'
    )
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Files</h1>
          <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => setCurrentFolder(null)}
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              Home
            </button>
            {currentFolder && (
              <>
                <span>/</span>
                <span>{currentFolder.name}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label className="btn-primary cursor-pointer">
            <Upload size={18} className="inline mr-2" />
            Upload Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
          <button
            onClick={() => setShowNewFolder(true)}
            className="btn-secondary"
          >
            <FolderPlus size={18} className="inline mr-2" />
            New Folder
          </button>
        </div>
      </div>

      {showNewFolder && (
        <div className="card">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Folder name"
              className="input-field flex-1"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
            />
            <button onClick={handleCreateFolder} className="btn-primary">
              Create
            </button>
            <button
              onClick={() => {
                setShowNewFolder(false)
                setNewFolderName('')
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Folders */}
      {folders.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {folders.map((folder) => (
              <button
                key={folder._id}
                onClick={() => setCurrentFolder(folder)}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FolderPlus size={32} className="text-primary-500 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center truncate w-full">
                  {folder.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Files</h2>
        {files.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {files.map((file) => {
              const Icon = getFileIcon(file)
              return (
                <div
                  key={file._id}
                  className="relative group flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <button
                    onClick={() => canPreview(file) && setPreviewFile(file)}
                    className="flex flex-col items-center w-full"
                  >
                    <Icon
                      size={32}
                      className={`mb-2 ${
                        canPreview(file)
                          ? 'text-primary-500 cursor-pointer'
                          : 'text-gray-400'
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white text-center truncate w-full">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </button>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                    {canPreview(file) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewFile(file)
                        }}
                        className="p-1 bg-white dark:bg-gray-800 rounded shadow"
                      >
                        <FileText size={14} />
                      </button>
                    )}
                    <a
                      href={file.url}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 bg-white dark:bg-gray-800 rounded shadow"
                    >
                      <Download size={14} />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteFile(file._id)
                      }}
                      className="p-1 bg-red-100 dark:bg-red-900 rounded shadow"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No files yet. Upload some files to get started!
          </p>
        )}
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <X size={20} />
            </button>
            {previewFile.mimeType === 'application/pdf' ? (
              <PDFViewer url={previewFile.url} />
            ) : previewFile.mimeType?.startsWith('image/') ? (
              <ImageViewer url={previewFile.url} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

