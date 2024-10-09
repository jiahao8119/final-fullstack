import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import BookingPage from './components/BookingPage'
import Footer from './components/Footer'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/booking"
            element={
              isAuthenticated ? (
                <BookingPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/" element={<Navigate to="/booking" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
