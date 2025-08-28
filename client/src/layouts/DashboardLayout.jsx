

import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const DashboardLayout = () => {
  const { user } = useAuthStatus();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-900 text-white">
      {/* --- Top Navbar --- */}
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <input 
            type="search" 
            placeholder="Search..." 
            className="hidden md:block px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" 
          />
        </div>
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-gray-300 hover:text-white text-sm">Home</NavLink>
          <NavLink to="/blogs" className="text-gray-300 hover:text-white text-sm">Blogs</NavLink>
          <NavLink to="/about" className="text-gray-300 hover:text-white text-sm">About</NavLink>
          <div className="flex items-center space-x-3">
            {/* Display user avatar if it exists, otherwise show initials */}
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-white font-semibold text-sm hidden md:block">{user?.name}</span>
          </div>
        </div>
      </header>

      {/* --- Page Content --- */}
      <main className="flex-1 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;
