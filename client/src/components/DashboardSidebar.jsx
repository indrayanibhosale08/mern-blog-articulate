import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 rounded-lg p-4">
      <nav className="space-y-2">
        <NavLink to="/dashboard/profile" className={navLinkClasses}>
          <span>👤</span> <span>Profile</span>
        </NavLink>
        <NavLink to="/dashboard/my-blogs" className={navLinkClasses}>
          <span>📖</span> <span>Your Blogs</span>
        </NavLink>
        <NavLink to="/dashboard/comments" className={navLinkClasses}>
          <span>💬</span> <span>Comments</span>
        </NavLink>
        <div className="pt-4 mt-4 border-t border-gray-700">
          <NavLink 
            to="/dashboard/create-blog" 
            className="flex items-center justify-center space-x-3 w-full bg-gray-700 px-4 py-3 rounded-lg text-white font-semibold hover:bg-gray-600 transition-colors"
          >
            <span>➕</span> <span>Create Blog</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;