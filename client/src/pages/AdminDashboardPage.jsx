import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from '../features/users/userSlice';
import { fetchBlogs, deleteBlog } from '../features/blogs/blogSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useAuthStatus } from '../hooks/useAuthStatus';

const AdminDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('users');
    const dispatch = useDispatch();
    const { user: adminUser } = useAuthStatus();

    // Select all relevant state from Redux
    const { allUsers, loading: usersLoading, error: usersError } = useSelector((state) => state.user);
    const { blogs, loading: blogsLoading, error: blogsError } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchBlogs());
    }, [dispatch]);

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
            dispatch(deleteUser(id));
        }
    };

    const handleDeleteBlog = (id) => {
        if (window.confirm('Are you sure you want to delete this blog post? This cannot be undone.')) {
            dispatch(deleteBlog(id));
        }
    };

    const loading = usersLoading || blogsLoading;
    const error = usersError || blogsError;

    return (
        <div>
            <h1 className="text-4xl font-bold font-serif text-white mb-6">Admin Dashboard</h1>
            
            <div className="border-b border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`${activeTab === 'users' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        Manage Users ({allUsers.users?.length || 0})
                    </button>
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`${activeTab === 'blogs' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        Manage Articles ({blogs?.length || 0})
                    </button>
                </nav>
            </div>

            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                {activeTab === 'users' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Admin</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {allUsers.users && allUsers.users.map(user => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {user.isAdmin ? <span className="text-green-400 font-semibold">Yes</span> : <span className="text-gray-400">No</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {adminUser._id !== user._id && (
                                                 <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:text-red-400 transition-colors">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'blogs' && (
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                             <thead className="bg-gray-700">
                                 <tr>
                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-700">
                                {blogs && blogs.map(blog => (
                                    <tr key={blog._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{blog.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{blog.user?.name || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                             <button onClick={() => handleDeleteBlog(blog._id)} className="text-red-500 hover:text-red-400 transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardPage;