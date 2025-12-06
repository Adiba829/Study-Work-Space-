import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import FileExplorer from './pages/FileExplorer'
import Notebooks from './pages/Notebooks'
import NotebookEditor from './pages/NotebookEditor'
import Search from './pages/Search'
import Settings from './pages/Settings'

function PrivateRoute({ children }) {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  
  // Show loading state while checking auth
  if (user === null && token === null) {
    // Check if we're still loading from localStorage
    const stored = localStorage.getItem('auth-storage')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.state?.user && parsed?.state?.token) {
          // Auth data exists in storage, allow through
          return children
        }
      } catch (e) {
        // Invalid storage, redirect to login
      }
    }
    return <Navigate to="/login" replace />
  }
  
  return user && token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="files" element={<FileExplorer />} />
          <Route path="notebooks" element={<Notebooks />} />
          <Route path="notebooks/:notebookId" element={<NotebookEditor />} />
          <Route path="search" element={<Search />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

