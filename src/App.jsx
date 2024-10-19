import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import BookingPage from './components/BookingPage'
import Footer from './components/Footer'
import ShopPage from './components/ShopPage'
import Profile from './components/Profile'
import ShowsBooking from './components/ShowsBooking'
import Chatbot from './components/Chatbot'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [bookings, setBookings] = useState([])

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
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
          <Route
            path="/booking"
            element={
              isAuthenticated ? (
                <BookingPage bookings={bookings} setBookings={setBookings} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Bookings" element={<ShowsBooking />} />
          <Route path="/" element={<Navigate to="/booking" replace />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
