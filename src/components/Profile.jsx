import { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null); // Store selected file for preview
    const [imageUrl, setImageUrl] = useState(''); // Store uploaded image URL

    const auth = getAuth();
    const user = auth.currentUser; // Get the current authenticated user
    const db = getFirestore();
    const storage = getStorage();

    // Fetch the profile image URL from Firestore when the component loads
    useEffect(() => {
        const fetchProfileImage = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData.profileImageUrl) {
                        setImageUrl(userData.profileImageUrl); // Set the saved image URL
                    }
                }
            }
        };
        fetchProfileImage(); // Fetch the profile image on component mount
    }, [user, db]);

    // Function to handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; // Get the selected file
        setProfileImage(file); // Set the file in state for preview

        if (file) {
            const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`); // Create a reference to store the file in Firebase Storage
            await uploadBytes(storageRef, file); // Upload the file
            const url = await getDownloadURL(storageRef); // Get the download URL
            setImageUrl(url); // Update the state with the image URL

            // Save the image URL to Firestore linked to the user account
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, { profileImageUrl: url });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
            <div className="flex flex-col items-center mb-6">
                {/* Preview the profile image before upload or display the saved image */}
                {profileImage ? (
                    <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" className="w-32 h-32 rounded-full mb-4" />
                ) : imageUrl ? (
                    <img src={imageUrl} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
                ) : (
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                        <User size={64} className="text-gray-600" />
                    </div>
                )}

                <h2 className="text-2xl font-semibold">Jiahao</h2>
            </div>

            {/* Image upload input */}
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
                    <span>jiahao@gmail.com</span>
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
        </div>
    );
};

export default Profile;

