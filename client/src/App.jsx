// // client/src/App.jsx (Corrected and More Robust)
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // Layouts and Pages
// import Sidebar from "./components/Sidebar";
// import MobileNav from "./components/MobileNav";
// import DashboardLayout from "./layouts/DashboardLayout";
// import HomePage from "./pages/HomePage";
// import BlogPage from "./pages/BlogPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import DashboardHomePage from "./pages/DashboardHomePage";
// import MyBlogsPage from "./pages/MyBlogsPage";
// import CreateBlogPage from "./pages/CreateBlogPage";
// import EditBlogPage from "./pages/EditBlogPage";
// import ProfilePage from "./pages/ProfilePage";
// import AdminDashboardPage from "./pages/AdminDashboardPage";

// // Route Protection
// import PrivateRoute from "./components/PrivateRoute";
// import AdminRoute from "./components/AdminRoute";
// import AllBlogsPage from "./pages/AllBlogsPage";
// import CommentsPage from "./pages/CommentsPage";

// function App() {
//   return (
//     <Router>
//       {/* 
//         The MobileNav and Sidebar are outside the Routes component because they should
//         be present on ALL pages, regardless of the route. The logic inside them
//         will determine what links to show.
//       */}
//       <div className="flex bg-brand-light font-sans text-brand-dark">
//         <Sidebar />
//         <MobileNav />

//         <main className="flex-grow md:ml-64 bg-brand-light min-h-screen">
//           <Routes>
//             {/* --- Public Routes --- */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/blogs" element={<AllBlogsPage />} />{" "}
//             {/* <-- ADD THIS ROUTE */}
//             <Route path="/blog/:id" element={<BlogPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             {/* --- Protected Routes --- */}
//             {/* The PrivateRoute now acts as the parent for all protected routes */}
//             <Route element={<PrivateRoute />}>
//               {/* All routes nested here require the user to be logged in */}
//               <Route path="/dashboard" element={<DashboardLayout />}>
//                 {/* 
//                   These routes will be rendered inside DashboardLayout's <Outlet />
//                 */}
//                 <Route index element={<DashboardHomePage />} />
//                 <Route path="profile" element={<ProfilePage />} />
//                 <Route path="comments" element={<CommentsPage />} />
//                 <Route path="my-blogs" element={<MyBlogsPage />} />
//                 <Route path="create-blog" element={<CreateBlogPage />} />
//                 <Route path="edit-blog/:id" element={<EditBlogPage />} />
//                 <Route
//                   path="admin"
//                   element={
//                     <AdminRoute>
//                       <AdminDashboardPage />
//                     </AdminRoute>
//                   }
//                 />
//               </Route>
//             </Route>
//           </Routes>
//         </main>
//       </div>
//       /
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// --- Core Layout Components ---
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

// --- Page Components ---
import HomePage from './pages/HomePage';
import AllBlogsPage from './pages/AllBlogsPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardHomePage from './pages/DashboardHomePage';
import MyBlogsPage from './pages/MyBlogsPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import ProfilePage from './pages/ProfilePage';
import CommentsPage from './pages/CommentsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// --- Route Protection ---
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      {/* 
        This is the main container for the "Articulate" design.
        The flex class enables the sidebar + main content layout.
      */}
      <div className="flex bg-brand-light font-sans text-brand-dark">
        
        {/* The persistent sidebar and mobile nav are rendered on every page */}
        <Sidebar />
        <MobileNav />
        
        {/* 
          This is the main content area that will take up the rest of the screen.
          The 'md:ml-64' class adds a left margin on medium screens and up to prevent
          the content from sliding underneath the fixed sidebar.
        */}
        <main className="flex-grow md:ml-64 bg-brand-light min-h-screen">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<AllBlogsPage />} />

            {/* 
              Note: A single blog post does not need to be nested inside a layout,
              as it can take up the full content area for a better reading experience.
            */}
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* --- Protected Dashboard Routes --- */}
            {/* 
              These routes are protected by the PrivateRoute component.
              They will still render within the main layout defined above.
            */}
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route index element={<DashboardHomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="my-blogs" element={<MyBlogsPage />} />
              <Route path="comments" element={<CommentsPage />} />
              <Route path="create-blog" element={<CreateBlogPage />} />
              <Route path="edit-blog/:id" element={<EditBlogPage />} />
              <Route path="admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            </Route>

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;