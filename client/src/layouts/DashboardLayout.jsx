// import React from 'react';
// import { NavLink, Link, Outlet } from 'react-router-dom';
// import { useAuthStatus } from '../hooks/useAuthStatus';

// // Simple SVG icon components for better readability in the sidebar
// const ProfileIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
//     </svg>
// );
// const BlogsIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
//     </svg>
// );
// const CreateIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
// );

// const DashboardLayout = () => {
//   const { user } = useAuthStatus();

//   // Common classes for sidebar navigation links to handle active state
//   const navLinkClasses = ({ isActive }) =>
//     `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
//       isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
//     }`;
  
//   return (
//     // Main flex container for the entire dashboard view
//     <div className="flex h-screen bg-brand-dark text-white">
      
//       {/* --- Sidebar (Fixed on left) --- */}
//       <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 flex flex-col justify-between border-r border-gray-700">
//         <div>
//           {/* Logo/Brand Name - links back to the public homepage */}
//           <Link to="/" className="text-2xl font-bold text-white mb-8 block px-4">
//             BlogNest
//           </Link>
          
//           {/* Navigation Links */}
//           <nav className="space-y-2">
//             <NavLink to="/dashboard/profile" className={navLinkClasses}>
//               <ProfileIcon /> <span>Profile</span>
//             </NavLink>
//             <NavLink to="/dashboard/my-blogs" className={navLinkClasses}>
//               <BlogsIcon /> <span>Your Blogs</span>
//             </NavLink>
//           </nav>
//         </div>
        
//         {/* "Create Blog" button at the bottom of the sidebar */}
//         <Link 
//           to="/dashboard/create-blog" 
//           className="flex items-center justify-center space-x-3 w-full bg-blue-600 px-4 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors"
//         >
//           <CreateIcon /> <span>Create Blog</span>
//         </Link>
//       </aside>

//       {/* --- Main Content Area (Scrollable) --- */}
//       <div className="flex-1 flex flex-col overflow-hidden">
        
//         {/* --- Top Navigation Bar --- */}
//         <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center border-b border-gray-700">
//           <input 
//             type="search" 
//             placeholder="Search..." 
//             className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3 transition-all" 
//           />
//           <div className="flex items-center space-x-4">
//             <NavLink to="/" className="text-gray-300 hover:text-white text-sm">Public Site</NavLink>
//             <span className="text-gray-600">|</span>
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm">
//                 {/* Display the first initial of the user's name */}
//                 {user?.name?.charAt(0).toUpperCase()}
//               </div>
//               <span className="text-white font-semibold text-sm">{user?.name}</span>
//             </div>
//           </div>
//         </header>

//         {/* --- Scrollable Page Content --- */}
//         <main className="flex-1 overflow-y-auto p-8 bg-brand-dark">
//           {/* 
//             This is the most important part of the layout.
//             Nested routes defined in App.jsx (like CreateBlogPage, MyBlogsPage, etc.) 
//             will be rendered in this spot.
//           */}
//           <Outlet /> 
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


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