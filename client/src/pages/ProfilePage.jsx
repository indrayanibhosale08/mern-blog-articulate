// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUserProfile } from '../features/users/userSlice';
// import Loader from '../components/Loader';
// import Message from '../components/Message';

// const ProfilePage = () => {
//     const dispatch = useDispatch();
//     const { userInfo, loading, error } = useSelector((state) => state.user);

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState(null);

//     useEffect(() => {
//         if (userInfo) {
//             setName(userInfo.name);
//             setEmail(userInfo.email);
//         }
//     }, [userInfo]);

//     const handleProfileUpdate = (e) => {
//         e.preventDefault();
//         if (password && password !== confirmPassword) {
//             setMessage('Passwords do not match');
//             return;
//         }
//         setMessage(null);
//         dispatch(updateUserProfile({ name, email, password }));
//     };

//     return (
//         <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
//             <h1 className="text-3xl font-bold font-serif text-white mb-6">My Profile</h1>
//             {message && <Message variant="danger">{message}</Message>}
//             {error && <Message variant="danger">{error}</Message>}
//             <form onSubmit={handleProfileUpdate} className="max-w-lg space-y-6">
//                 <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
//                     <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
//                     <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-300">New Password</label>
//                     <input id="password" type="password" placeholder="Leave blank to keep the same" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <div>
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm New Password</label>
//                     <input id="confirmPassword" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
//                     {loading ? 'Updating...' : 'Update Profile'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ProfilePage;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../features/users/userSlice';
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload';
import Loader from '../components/Loader';
import Message from '../components/Message';
import DashboardSidebar from '../components/DashboardSidebar';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userInfo, loading, error } = useSelector((state) => state.user);
    
    const { uploading, imageUrl, uploadImage, setImageUrl } = useCloudinaryUpload();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            // Crucially, set the hook's URL from the user's info
            setImageUrl(userInfo.avatar || '');
        }
    }, [userInfo, setImageUrl]);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        setMessage(null);
        dispatch(updateUserProfile({ name, email, password, avatar: imageUrl }));
    };

    return (
        <div className="p-8 flex gap-8">
            <DashboardSidebar />
            <div className="flex-1">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold font-serif text-white mb-8">My Profile</h1>
                    
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Avatar Column */}
                        <div className="md:col-span-1 flex flex-col items-center">
                            <h2 className="text-xl font-semibold text-white mb-4">Profile Picture</h2>
                            {/* This img tag now reliably shows the uploaded image or a fallback */}
                            <img 
                                src={imageUrl || `https://ui-avatars.com/api/?name=${name || 'User'}&background=0284c7&color=fff&size=128`} 
                                alt="Profile"
                                className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-gray-700"
                            />
                            <label htmlFor="avatar-upload" className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm">
                                {uploading ? 'Uploading...' : 'Change Picture'}
                                <input id="avatar-upload" type="file" onChange={uploadImage} className="hidden" />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">JPG, PNG, GIF. 2MB max.</p>
                        </div>

                        {/* Form Column */}
                        <div className="md:col-span-2">
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                {/* Form inputs remain the same */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">New Password</label>
                                    <input id="password" type="password" placeholder="Leave blank to keep the same" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm New Password</label>
                                    <input id="confirmPassword" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="pt-4">
                                    <button type="submit" disabled={loading || uploading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                        {loading || uploading ? 'Saving...' : 'Update Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;