import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const DashboardHomePage = () => {
    const { user } = useAuthStatus();

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold font-serif text-white mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-gray-400 mb-8">This is your creative space. What would you like to do today?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/dashboard/create-blog" className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors group">
                    <h2 className="text-2xl font-semibold text-white mb-2">Create a New Article</h2>
                    <p className="text-gray-400 mb-4">Start with a blank canvas and let your ideas flow. Write a new article, share a story, or post an update.</p>
                    <span className="font-semibold text-blue-400 group-hover:underline">Start Writing &rarr;</span>
                </Link>
                <Link to="/dashboard/my-blogs" className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors group">
                    <h2 className="text-2xl font-semibold text-white mb-2">Manage Your Articles</h2>
                    <p className="text-gray-400 mb-4">Review, edit, or delete your existing posts. See what you've created and make it even better.</p>
                    <span className="font-semibold text-blue-400 group-hover:underline">View Your Articles &rarr;</span>
                </Link>
            </div>
        </div>
    );
};

export default DashboardHomePage;