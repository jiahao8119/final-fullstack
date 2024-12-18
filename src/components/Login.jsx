import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const notify = () => toast("User LoggedIn!");


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);



            notify();


            onLogin();
            navigate('/booking');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-300">
            <div className="absolute inset-0">
                <img
                    src="/badminton.jpg"
                    alt="Badminton Court"
                    className="w-full h-full object-cover filter blur-[2px]"
                />
            </div>

            <div className=" relative z-10 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center mb-6">Login to Your Account</h3>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between mt-6">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Login</button>
                        <a href="/register" className="text-sm text-blue-600 hover:underline">Don&apos;t have an account?</a>
                    </div>
                </form>
            </div>
            <div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;