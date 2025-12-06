import axios from 'axios'

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Log API URL in development for debugging
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL)
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
})

// Add token to requests if available
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth-storage')
  if (token) {
    try {
      const parsed = JSON.parse(token)
      if (parsed?.state?.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${parsed.state.token}`
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
}

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if we're not already on login/register pages
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname
      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.removeItem('auth-storage')
        window.location.href = '/login'
      }
    }
    
    // Log network errors for debugging
    if (!error.response) {
      console.error('❌ Network error:', error.message)
      console.error('🔍 API URL:', API_URL)
      console.error('💡 Troubleshooting:')
      console.error('   1. Check if backend is running: http://localhost:5000/api/health')
      console.error('   2. Verify frontend/.env has: VITE_API_URL=http://localhost:5000/api')
      console.error('   3. Restart frontend dev server after creating .env file')
      
      // Provide more helpful error message
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        error.userMessage = 'Cannot connect to server. Make sure the backend is running on port 5000.'
      } else if (error.code === 'ETIMEDOUT') {
        error.userMessage = 'Request timed out. The server may be slow or unresponsive.'
      }
    }
    
    return Promise.reject(error)
  }
)

export default api

