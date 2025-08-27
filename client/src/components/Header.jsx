import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/users/userSlice';
import { useAuthStatus } from '../hooks/useAuthStatus';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, isAdmin } = useAuthStatus();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
          InkFlow
        </Link>
        <nav className="flex items-center space-x-4">
          {loggedIn ? (
            <>
              <Link to="/create-blog" className="text-gray-300 hover:text-white transition-colors">New Post</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>
              {isAdmin && (
                <Link to="/admin/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;