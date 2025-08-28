import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';

const CommentsPage = () => {
    return (
        <div className="p-8 flex gap-8">
            <DashboardSidebar />
            <div className="flex-1">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-white mb-4">Manage Comments</h1>
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg">Comment management feature is coming soon!</p>
                        <p>This is where you will be able to view and moderate comments on all of your articles.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsPage;