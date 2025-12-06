import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import BlockEditor from '../components/BlockEditor'
import { ArrowLeft, Plus, Save, Tag as TagIcon, X } from 'lucide-react'

export default function NotebookEditor() {
  const { notebookId } = useParams()
  const navigate = useNavigate()
  const [notebook, setNotebook] = useState(null)
  const [sections, setSections] = useState([])
  const [currentSection, setCurrentSection] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')
  const [showNewSection, setShowNewSection] = useState(false)
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    fetchNotebook()
  }, [notebookId])

  const fetchNotebook = async () => {
    try {
      const response = await api.get(`/notebooks/${notebookId}`)
      const data = response.data.notebook
      setNotebook(data)
      setSections(data.sections || [])
      setTags(data.tags || [])
      if (data.sections && data.sections.length > 0) {
        const firstSection = data.sections[0]
        setCurrentSection(firstSection)
        if (firstSection.pages && firstSection.pages.length > 0) {
          setCurrentPage(firstSection.pages[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch notebook:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSection = async () => {
    if (!newSectionName.trim()) return

    try {
      const response = await api.post(`/notebooks/${notebookId}/sections`, {
        name: newSectionName,
      })
      setSections([...sections, response.data.section])
      setNewSectionName('')
      setShowNewSection(false)
      setCurrentSection(response.data.section)
    } catch (error) {
      console.error('Failed to create section:', error)
      alert('Failed to create section')
    }
  }

  const handleCreatePage = async (sectionId) => {
    try {
      const response = await api.post(`/notebooks/${notebookId}/sections/${sectionId}/pages`, {
        title: 'Untitled Page',
      })
      const updatedSections = sections.map((s) =>
        s._id === sectionId
          ? { ...s, pages: [...(s.pages || []), response.data.page] }
          : s
      )
      setSections(updatedSections)
      setCurrentPage(response.data.page)
      setCurrentSection(updatedSections.find((s) => s._id === sectionId))
    } catch (error) {
      console.error('Failed to create page:', error)
      alert('Failed to create page')
    }
  }

  const handleSavePage = async (content) => {
    if (!currentPage) return

    setSaving(true)
    try {
      await api.put(
        `/notebooks/${notebookId}/sections/${currentSection._id}/pages/${currentPage._id}`,
        { content }
      )
      // Update local state
      const updatedSections = sections.map((s) =>
        s._id === currentSection._id
          ? {
              ...s,
              pages: s.pages.map((p) =>
                p._id === currentPage._id ? { ...p, content } : p
              ),
            }
          : s
      )
      setSections(updatedSections)
    } catch (error) {
      console.error('Failed to save page:', error)
      alert('Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  const handleAddTag = async () => {
    if (!newTag.trim() || tags.includes(newTag)) return

    try {
      const updatedTags = [...tags, newTag]
      await api.put(`/notebooks/${notebookId}`, { tags: updatedTags })
      setTags(updatedTags)
      setNewTag('')
    } catch (error) {
      console.error('Failed to add tag:', error)
    }
  }

  const handleRemoveTag = async (tagToRemove) => {
    try {
      const updatedTags = tags.filter((t) => t !== tagToRemove)
      await api.put(`/notebooks/${notebookId}`, { tags: updatedTags })
      setTags(updatedTags)
    } catch (error) {
      console.error('Failed to remove tag:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!notebook) {
    return <div className="text-center py-12">Notebook not found</div>
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <button
            onClick={() => navigate('/notebooks')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {notebook.title}
          </h2>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Add tag"
                className="input-field text-sm flex-1"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <button onClick={handleAddTag} className="btn-primary text-sm py-1 px-2">
                <TagIcon size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Sections
              </h3>
              <button
                onClick={() => setShowNewSection(true)}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                <Plus size={16} />
              </button>
            </div>
            {showNewSection && (
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Section name"
                  className="input-field text-sm mb-2"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateSection()}
                  autoFocus
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleCreateSection}
                    className="btn-primary text-sm py-1 px-2 flex-1"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowNewSection(false)
                      setNewSectionName('')
                    }}
                    className="btn-secondary text-sm py-1 px-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-1">
              {sections.map((section) => (
                <div key={section._id} className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                  <button
                    onClick={() => setCurrentSection(section)}
                    className={`w-full text-left px-2 py-1 rounded text-sm font-medium ${
                      currentSection?._id === section._id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {section.name}
                  </button>
                  {currentSection?._id === section._id && (
                    <div className="mt-2 space-y-1">
                      <button
                        onClick={() => handleCreatePage(section._id)}
                        className="w-full text-left px-4 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center"
                      >
                        <Plus size={12} className="mr-1" />
                        New Page
                      </button>
                      {section.pages?.map((page) => (
                        <button
                          key={page._id}
                          onClick={() => setCurrentPage(page)}
                          className={`w-full text-left px-4 py-1 text-xs rounded ${
                            currentPage?._id === page._id
                              ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page.title || 'Untitled'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentPage ? (
          <>
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentPage.title || 'Untitled Page'}
                </h3>
                {saving && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">Saving...</span>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-white dark:bg-gray-900">
              <BlockEditor
                content={currentPage.content || ''}
                onSave={handleSavePage}
                autoSave={true}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {sections.length === 0
                  ? 'Create a section to get started'
                  : 'Select a page to start editing'}
              </p>
              {sections.length > 0 && currentSection && (
                <button
                  onClick={() => handleCreatePage(currentSection._id)}
                  className="btn-primary"
                >
                  <Plus size={18} className="inline mr-2" />
                  Create First Page
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

