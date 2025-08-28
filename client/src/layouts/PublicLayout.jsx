import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

const PublicLayout = () => {
  return (
    <div className="flex bg-brand-light font-sans text-brand-dark">
      <Sidebar />
      <MobileNav />
      <main className="flex-grow md:ml-64 bg-brand-light min-h-screen">
        {/* Public pages like HomePage, BlogPage, etc., will render here */}
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;