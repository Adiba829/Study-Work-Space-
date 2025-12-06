import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import api from '../utils/api'
import { User, Moon, Sun, HardDrive, Trash2 } from 'lucide-react'

export default function Settings() {
  const { user, updateUser } = useAuthStore()
  const { theme, setTheme } = useThemeStore()
  const [storage, setStorage] = useState({ used: 0, limit: 0 })
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  useEffect(() => {
    fetchStorage()
  }, [])

  const fetchStorage = async () => {
    try {
      const response = await api.get('/settings/storage')
      setStorage(response.data)
    } catch (error) {
      console.error('Failed to fetch storage:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      const response = await api.put('/auth/profile', { name, email })
      updateUser(response.data.user)
      alert('Profile updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile')
    }
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const storagePercentage = storage.limit > 0 ? (storage.used / storage.limit) * 100 : 0

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="card">
        <div className="flex items-center mb-6">
          <User className="h-6 w-6 text-primary-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Update Profile
          </button>
        </form>
      </div>

      {/* Theme Settings */}
      <div className="card">
        <div className="flex items-center mb-6">
          {theme === 'dark' ? (
            <Moon className="h-6 w-6 text-primary-500 mr-2" />
          ) : (
            <Sun className="h-6 w-6 text-primary-500 mr-2" />
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Theme</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose between light and dark mode
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg ${
                theme === 'light'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Storage Settings */}
      <div className="card">
        <div className="flex items-center mb-6">
          <HardDrive className="h-6 w-6 text-primary-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Storage</h2>
        </div>
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Storage Used
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formatBytes(storage.used)} / {formatBytes(storage.limit)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {storagePercentage.toFixed(1)}% used
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="card border-2 border-red-200 dark:border-red-800">
        <div className="flex items-center mb-6">
          <Trash2 className="h-6 w-6 text-red-500 mr-2" />
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Delete Account</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Permanently delete your account and all data
              </p>
            </div>
            <button
              onClick={() => {
                if (
                  confirm(
                    'Are you sure you want to delete your account? This action cannot be undone.'
                  )
                ) {
                  // Handle account deletion
                  alert('Account deletion not implemented in this demo')
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

