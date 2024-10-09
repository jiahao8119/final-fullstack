import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock } from 'lucide-react'

function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically validate the credentials with your backend
        // For this example, we'll just simulate a successful login
        onLogin()
        navigate('/booking')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center mb-6">Login to Your Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <User className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <Lock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between mt-6">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Login</button>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login