// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { fetchMyBlogs, deleteBlog } from '../features/blogs/blogSlice';
// import Loader from '../components/Loader';
// import Message from '../components/Message';

// const DotsVerticalIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
//   </svg>
// );

// const MyBlogsPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { myBlogs, loading, error } = useSelector((state) => state.blogs);
//     const [openMenuId, setOpenMenuId] = useState(null);

//     useEffect(() => {
//         dispatch(fetchMyBlogs());
//     }, [dispatch]);

//     const handleDelete = (id) => {
//         if (window.confirm('Are you sure you want to permanently delete this post?')) {
//             dispatch(deleteBlog(id));
//         }
//     };

//     const EmptyState = () => (
//         <div className="text-center py-20 px-8 bg-gray-800 rounded-lg shadow-md mt-8">
//             <h2 className="text-2xl font-serif font-bold text-white mb-2">Your Space is Ready</h2>
//             <p className="text-gray-400 mb-6 max-w-md mx-auto">It looks like you haven't written any articles yet. Your best story is waiting to be told.</p>
//             <Link
//                 to="/dashboard/create-blog"
//                 className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-md hover:bg-blue-700 transition-opacity shadow-lg"
//             >
//                 Create Your First Article
//             </Link>
//         </div>
//     );

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-4xl font-bold font-serif text-white">My Articles</h1>
//                 <Link
//                     to="/dashboard/create-blog"
//                     className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 transition-opacity shadow"
//                 >
//                     Create New
//                 </Link>
//             </div>

//             {loading ? ( <Loader /> ) : error ? ( <Message variant="danger">{error}</Message> ) : 
//             Array.isArray(myBlogs) && myBlogs.length === 0 ? ( <EmptyState /> ) : (
//                 <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//                     <table className="min-w-full divide-y divide-gray-700">
//                         <thead className="bg-gray-700">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Updated</th>
//                                 <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-700">
//                             {myBlogs.map((blog) => (
//                                 <tr key={blog._id} className="hover:bg-gray-700/50">
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm font-semibold text-white">{blog.title}</div>
//                                         <div className="text-xs text-gray-400">{blog.subtitle}</div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{blog.category}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
//                                             Published
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                                         {new Date(blog.updatedAt).toLocaleDateString()}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
//                                         <button onClick={() => setOpenMenuId(openMenuId === blog._id ? null : blog._id)} className="text-gray-400 hover:text-white p-1 rounded-full">
//                                             <DotsVerticalIcon />
//                                         </button>
//                                         {openMenuId === blog._id && (
//                                             <div className="absolute right-8 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                                                 <div className="py-1">
//                                                     <button onClick={() => navigate(`/dashboard/edit-blog/${blog._id}`)} className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
//                                                         Edit Article
//                                                     </button>
//                                                     <button onClick={() => handleDelete(blog._id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
//                                                         Delete Article
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyBlogsPage;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMyBlogs, deleteBlog } from '../features/blogs/blogSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import DashboardSidebar from '../components/DashboardSidebar'; // <-- Import the new sidebar

const DotsVerticalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
);

const MyBlogsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myBlogs, loading, error } = useSelector((state) => state.blogs);
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        dispatch(fetchMyBlogs());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to permanently delete this post?')) {
            dispatch(deleteBlog(id));
        }
    };

    const EmptyState = () => (
        <div className="text-center py-20 px-8 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white mb-2">No Articles Yet</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">Click the button below to start sharing your ideas with the world.</p>
            <Link
                to="/dashboard/create-blog"
                className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-md hover:bg-blue-700 transition-opacity shadow-lg"
            >
                Create Your First Article
            </Link>
        </div>
    );

    return (
        <div className="p-8 flex gap-8">
            <DashboardSidebar />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Your Blogs</h1>
                    <Link to="/dashboard/create-blog" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Create New
                    </Link>
                </div>

                {loading ? ( <Loader /> ) : error ? ( <Message variant="danger">{error}</Message> ) : 
                !Array.isArray(myBlogs) || myBlogs.length === 0 ? ( <EmptyState /> ) : (
                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Updated</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {myBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-white">{blog.title}</div>
                                            <div className="text-xs text-gray-400">{blog.subtitle}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{blog.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                                                Published
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {new Date(blog.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                            <button onClick={() => setOpenMenuId(openMenuId === blog._id ? null : blog._id)} className="text-gray-400 hover:text-white p-1 rounded-full">
                                                <DotsVerticalIcon />
                                            </button>
                                            {openMenuId === blog._id && (
                                                <div className="absolute right-8 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                                    <div className="py-1">
                                                        <button onClick={() => navigate(`/dashboard/edit-blog/${blog._id}`)} className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                                                            Edit Article
                                                        </button>
                                                        <button onClick={() => handleDelete(blog._id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                            Delete Article
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBlogsPage;