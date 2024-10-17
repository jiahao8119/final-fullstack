import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                uid: user.uid,
                createdAt: serverTimestamp(),
            }, { merge: true });

            console.log('User Registered and Name Saved:', user.uid);
            navigate("/login");
        } catch (err) {
            console.error("Registration error:", err);
            if (err.code === 'auth/network-request-failed') {
                setError("Network error. Please check your internet connection and try again.");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("This email is already registered. Please use a different email or try logging in.");
            } else {
                setError("An error occurred during registration. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center mb-6">Create an Account</h3>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <User className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <Mail className="text-gray-400 mr-2" />
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
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
