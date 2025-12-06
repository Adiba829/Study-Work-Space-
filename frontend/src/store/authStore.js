import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../utils/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        try {
          console.log('Attempting login...', { email })
          const response = await api.post('/auth/login', { email, password })
          console.log('Login response:', response.data)
          
          if (response.data && response.data.user && response.data.token) {
            const userData = response.data.user
            const tokenData = response.data.token
            
            set({ user: userData, token: tokenData })
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`
            
            console.log('Login successful, user set:', userData.email)
            return { success: true }
          } else {
            console.error('Invalid response structure:', response.data)
            return { success: false, error: 'Invalid response from server' }
          }
        } catch (error) {
          console.error('Login error:', error)
          console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          })
          
          // Handle network errors
          if (!error.response) {
            return { 
              success: false, 
              error: 'Cannot connect to server. Make sure the backend is running on port 5000.' 
            }
          }
          
          // Handle API errors
          const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error || 
                              error.message || 
                              'Login failed. Please check your credentials.'
          
          return { success: false, error: errorMessage }
        }
      },
      register: async (name, email, password) => {
        try {
          console.log('Attempting registration...', { name, email })
          const response = await api.post('/auth/register', { name, email, password })
          console.log('Registration response:', response.data)
          
          if (response.data && response.data.user && response.data.token) {
            const userData = response.data.user
            const tokenData = response.data.token
            
            set({ user: userData, token: tokenData })
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`
            
            console.log('Registration successful, user set:', userData.email)
            return { success: true }
          } else {
            console.error('Invalid response structure:', response.data)
            return { success: false, error: 'Invalid response from server' }
          }
        } catch (error) {
          console.error('Registration error:', error)
          console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          })
          
          // Handle network errors
          if (!error.response) {
            return { 
              success: false, 
              error: 'Cannot connect to server. Make sure the backend is running on port 5000.' 
            }
          }
          
          // Handle API errors
          const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error || 
                              error.message || 
                              'Registration failed. Please try again.'
          
          return { success: false, error: errorMessage }
        }
      },
      logout: () => {
        set({ user: null, token: null })
        delete api.defaults.headers.common['Authorization']
        localStorage.removeItem('auth-storage')
      },
      updateUser: (userData) => set({ user: userData }),
      // Helper to check if user is authenticated
      isAuthenticated: () => {
        const state = get()
        return !!(state.user && state.token)
      },
    }),
    {
      name: 'auth-storage',
      // Only persist user and token
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)

