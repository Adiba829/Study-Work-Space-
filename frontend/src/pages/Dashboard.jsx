import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { FolderOpen, BookOpen, FileText, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    files: 0,
    notebooks: 0,
    pages: 0,
    storageUsed: 0,
  })
  const [recentFiles, setRecentFiles] = useState([])
  const [recentNotebooks, setRecentNotebooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, filesRes, notebooksRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/files?limit=5&sort=-updatedAt'),
        api.get('/notebooks?limit=5&sort=-updatedAt'),
      ])
      setStats(statsRes.data)
      setRecentFiles(filesRes.data.files || [])
      setRecentNotebooks(notebooksRes.data.notebooks || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your study workspace.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Files</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.files}
              </p>
            </div>
            <FolderOpen className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Notebooks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.notebooks}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.pages}
              </p>
            </div>
            <FileText className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatBytes(stats.storageUsed)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Files */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Files</h2>
            <Link
              to="/files"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              View all
            </Link>
          </div>
          {recentFiles.length > 0 ? (
            <div className="space-y-2">
              {recentFiles.map((file) => (
                <Link
                  key={file._id}
                  to={`/files?file=${file._id}`}
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(file.updatedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No recent files</p>
          )}
        </div>

        {/* Recent Notebooks */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Notebooks</h2>
            <Link
              to="/notebooks"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              View all
            </Link>
          </div>
          {recentNotebooks.length > 0 ? (
            <div className="space-y-2">
              {recentNotebooks.map((notebook) => (
                <Link
                  key={notebook._id}
                  to={`/notebooks/${notebook._id}`}
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <p className="font-medium text-gray-900 dark:text-white">{notebook.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(notebook.updatedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No recent notebooks</p>
          )}
        </div>
      </div>
    </div>
  )
}

