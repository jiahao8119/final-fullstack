import { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const storage = getStorage();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProfileImage = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData.profileImageUrl) {
                        setImageUrl(userData.profileImageUrl);
                    }
                }
            }
        };
        fetchProfileImage();
    }, [user, db]);


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setProfileImage(file);

        if (file) {
            const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
            toast.success('Profile picture updated!')


            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, { profileImageUrl: url });
            toast.error('Error updating profile picture')
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to log out');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
            <div className="flex flex-col items-center mb-6">

                {profileImage ? (
                    <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" className="w-32 h-32 rounded-full mb-4" />
                ) : imageUrl ? (
                    <img src={imageUrl} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
                ) : (
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                        <User size={64} className="text-gray-600" />
                    </div>
                )}


            </div>


            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Upload Profile Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center">
                    <Mail className="mr-4 text-blue-600" />
                    <span>user@gmail.com</span>
                </div>
                <div className="flex items-center">
                    <MapPin className="mr-4 text-blue-600" />
                    <span>Selangor, 12345</span>
                </div>
                <div className="flex items-center">
                    <Phone className="mr-4 text-blue-600" />
                    <span>012-3456789</span>
                </div>
            </div>

            <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;
