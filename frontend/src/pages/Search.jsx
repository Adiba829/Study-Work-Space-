import { useState } from 'react'
import api from '../utils/api'
import { Search as SearchIcon, FileText, BookOpen, File } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ files: [], notebooks: [], pages: [] })
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    try {
      const response = await api.get('/search', {
        params: { q: query },
      })
      setResults(response.data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Search</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Search across all your files, notebooks, and pages
        </p>
      </div>

      <form onSubmit={handleSearch} className="card">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Search everything..."
            className="input-field pl-12 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searched && !loading && (
        <div className="space-y-6">
          {/* Files Results */}
          {results.files.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <File size={20} className="mr-2" />
                Files ({results.files.length})
              </h2>
              <div className="space-y-2">
                {results.files.map((file) => (
                  <Link
                    key={file._id}
                    to={`/files?file=${file._id}`}
                    className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {file.path || 'Root'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Notebooks Results */}
          {results.notebooks.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <BookOpen size={20} className="mr-2" />
                Notebooks ({results.notebooks.length})
              </h2>
              <div className="space-y-2">
                {results.notebooks.map((notebook) => (
                  <Link
                    key={notebook._id}
                    to={`/notebooks/${notebook._id}`}
                    className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{notebook.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {notebook.sections?.length || 0} sections
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pages Results */}
          {results.pages.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <FileText size={20} className="mr-2" />
                Pages ({results.pages.length})
              </h2>
              <div className="space-y-2">
                {results.pages.map((page) => (
                  <Link
                    key={page._id}
                    to={`/notebooks/${page.notebookId}?page=${page._id}`}
                    className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">
                      {page.title || 'Untitled Page'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {page.sectionName} • {page.notebookTitle}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.files.length === 0 &&
            results.notebooks.length === 0 &&
            results.pages.length === 0 && (
              <div className="card text-center py-12">
                <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No results found</p>
              </div>
            )}
        </div>
      )}
    </div>
  )
}

