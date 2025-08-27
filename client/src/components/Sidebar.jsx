import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { logout } from '../features/users/userSlice';

const Sidebar = () => {
  const { loggedIn, isAdmin, user } = useAuthStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }) =>
    `font-sans font-semibold text-sm transition-colors ${
      isActive ? 'text-brand-dark' : 'text-brand-gray hover:text-brand-dark'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-brand-light shadow-lg fixed left-0 top-0 p-8 justify-between border-r border-gray-200">
      <div>
        <Link to="/" className="font-serif text-3xl font-bold text-brand-dark mb-12 block">
          Articulate.
        </Link>
        <nav className="flex flex-col space-y-4">
          <NavLink to="/" className={navLinkClasses} end>Home</NavLink>
          {loggedIn && <NavLink to="/dashboard" className={navLinkClasses}>Dashboard</NavLink>}
          {isAdmin && <NavLink to="/dashboard/admin" className={navLinkClasses}>Admin Panel</NavLink>}
        </nav>
      </div>
      
      <div>
        {loggedIn ? (
          <div className="text-center">
            <p className="text-sm text-brand-dark font-semibold">{user.name}</p>
            <button
              onClick={handleLogout}
              className="mt-2 text-sm text-brand-gray hover:text-red-500 transition-colors"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <Link to="/login" className="text-center font-sans font-semibold text-sm bg-white border border-gray-300 text-brand-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Log In
            </Link>
            <Link to="/register" className="text-center font-sans font-semibold text-sm bg-brand-blue text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;