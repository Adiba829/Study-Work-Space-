import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { BookOpen, Plus, Search as SearchIcon, Tag } from 'lucide-react'

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewNotebook, setShowNewNotebook] = useState(false)
  const [newNotebookTitle, setNewNotebookTitle] = useState('')

  useEffect(() => {
    fetchNotebooks()
  }, [])

  const fetchNotebooks = async () => {
    try {
      const response = await api.get('/notebooks')
      setNotebooks(response.data.notebooks || [])
    } catch (error) {
      console.error('Failed to fetch notebooks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNotebook = async () => {
    if (!newNotebookTitle.trim()) return

    try {
      const response = await api.post('/notebooks', { title: newNotebookTitle })
      setNewNotebookTitle('')
      setShowNewNotebook(false)
      fetchNotebooks()
      // Navigate to the new notebook
      window.location.href = `/notebooks/${response.data.notebook._id}`
    } catch (error) {
      console.error('Failed to create notebook:', error)
      alert('Failed to create notebook')
    }
  }

  const handleDeleteNotebook = async (notebookId) => {
    if (!confirm('Are you sure you want to delete this notebook?')) return

    try {
      await api.delete(`/notebooks/${notebookId}`)
      fetchNotebooks()
    } catch (error) {
      console.error('Failed to delete notebook:', error)
      alert('Failed to delete notebook')
    }
  }

  const filteredNotebooks = notebooks.filter((notebook) =>
    notebook.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notebooks</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create and manage your study notebooks
          </p>
        </div>
        <button
          onClick={() => setShowNewNotebook(true)}
          className="btn-primary"
        >
          <Plus size={18} className="inline mr-2" />
          New Notebook
        </button>
      </div>

      {showNewNotebook && (
        <div className="card">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Notebook title"
              className="input-field flex-1"
              value={newNotebookTitle}
              onChange={(e) => setNewNotebookTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateNotebook()}
              autoFocus
            />
            <button onClick={handleCreateNotebook} className="btn-primary">
              Create
            </button>
            <button
              onClick={() => {
                setShowNewNotebook(false)
                setNewNotebookTitle('')
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search notebooks..."
          className="input-field pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Notebooks Grid */}
      {filteredNotebooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotebooks.map((notebook) => (
            <div
              key={notebook._id}
              className="card hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <Link to={`/notebooks/${notebook._id}`}>
                <div className="flex items-start justify-between mb-4">
                  <BookOpen className="h-8 w-8 text-primary-500" />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleDeleteNotebook(notebook._id)
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                  >
                    ×
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {notebook.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {notebook.sections?.length || 0} sections • {notebook.pages?.length || 0} pages
                </p>
                {notebook.tags && notebook.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {notebook.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                  Updated {new Date(notebook.updatedAt).toLocaleDateString()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery ? 'No notebooks found' : 'No notebooks yet. Create one to get started!'}
          </p>
        </div>
      )}
    </div>
  )
}

