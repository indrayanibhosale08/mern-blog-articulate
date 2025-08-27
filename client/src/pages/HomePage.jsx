import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../features/blogs/blogSlice';
import BlogItem from '../components/BlogItem';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useAuthStatus } from '../hooks/useAuthStatus';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useAuthStatus();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Photography', 'Business', 'Lifestyle', 'Technology'];

  useEffect(() => {
    const queryParts = [];
    if (keyword) queryParts.push(`keyword=${keyword}`);
    if (category && category !== 'All') queryParts.push(`category=${category}`);
    const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    dispatch(fetchBlogs(query));
  }, [dispatch, keyword, category]);

  return (
    <div className="p-8 md:p-12 lg:p-16">
      {/* --- Hero Section --- */}
      <section className="min-h-[50vh] flex flex-col justify-center text-center">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-brand-dark leading-none tracking-tight">
          Articulate.
        </h1>
        <p className="mt-4 text-xl text-brand-gray max-w-lg mx-auto">
          A clean, focused space for writers and thinkers to share their stories with the world.
        </p>
        <div className="mt-8">
          {/* THIS IS THE CORRECTED BUTTON */}
          <Link 
            to={loggedIn ? "/dashboard" : "/register"} 
            className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-md hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            {loggedIn ? 'Go to Dashboard' : 'Start Writing'}
          </Link>
        </div>
      </section>

      {/* --- Search and Filter Section --- */}
      <section className="my-12 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search articles by title..."
            className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  category === cat ? 'bg-brand-dark text-white' : 'bg-gray-200 text-brand-gray hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- Blog Feed Section --- */}
      <section>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogItem key={blog._id} blog={blog} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                <h3 className="text-xl font-semibold">No Articles Found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;