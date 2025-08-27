import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useDispatch } from 'react-redux';
import { logout } from '../features/users/userSlice';

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { loggedIn, isAdmin } = useAuthStatus();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
    };

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 bg-brand-dark text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            >
                <div className="space-y-1.5">
                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
            </button>

            <div
                className={`fixed inset-0 bg-brand-dark bg-opacity-95 z-40 transition-opacity flex flex-col items-center justify-center space-y-8 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <Link to="/" onClick={() => setIsOpen(false)} className="text-white text-3xl font-serif">Home</Link>
                {loggedIn ? (
                    <>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-white text-3xl font-serif">Dashboard</Link>
                        {isAdmin && <Link to="/dashboard/admin" onClick={() => setIsOpen(false)} className="text-white text-3xl font-serif">Admin</Link>}
                        <button onClick={handleLogout} className="text-red-400 text-3xl font-serif">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={() => setIsOpen(false)} className="text-white text-3xl font-serif">Login</Link>
                        <Link to="/register" onClick={() => setIsOpen(false)} className="text-white text-3xl font-serif">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileNav;