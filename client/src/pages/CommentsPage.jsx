import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';

const CommentsPage = () => {
    return (
        <div className="p-8 flex gap-8">
            <DashboardSidebar />
            <div className="flex-1">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg h-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold font-serif text-white mb-4">Manage Comments</h1>
                    <div className="text-center text-gray-400">
                        <p className="text-lg">This feature is coming soon!</p>
                        <p>This is where you will be able to view and moderate comments on all of your articles.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsPage;