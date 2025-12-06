// Utility to test backend connection
import api from './api.js'

export const testConnection = async () => {
  try {
    const response = await api.get('/health')
    console.log('✅ Backend connection successful:', response.data)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message)
    if (!error.response) {
      console.error('💡 Make sure:')
      console.error('   1. Backend is running: cd backend && npm run dev')
      console.error('   2. Backend is accessible: http://localhost:5000/api/health')
      console.error('   3. Frontend .env has: VITE_API_URL=http://localhost:5000/api')
    }
    return { success: false, error: error.message }
  }
}

// Auto-test on module load in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  // Test connection after a short delay
  setTimeout(() => {
    testConnection()
  }, 1000)
}

