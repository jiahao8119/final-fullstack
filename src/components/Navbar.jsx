import { Link } from 'react-router-dom'
import { Feather } from 'lucide-react'


function Navbar({ isAuthenticated, onLogout }) {
    return (
        <nav className="bg-blue-800 text-white shadow-md">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <Feather className="w-8 h-8" />
                    <span className="text-xl font-bold">BadmintonBooker</span>

                </Link>
                <div className="space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/shop" className="hover:text-blue-200">Shop</Link>
                            <Link to="/profile" className="hover:text-blue-200">Profile</Link>
                            <button onClick={onLogout} className="hover:text-blue-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/register" className="hover:text-blue-200">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
