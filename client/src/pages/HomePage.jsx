
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBlogs } from '../features/blogs/blogSlice';
import BlogItem from '../components/BlogItem';
import Loader from '../components/Loader';
import { useAuthStatus } from '../hooks/useAuthStatus';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useAuthStatus();
  const { blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (!loggedIn) {
      dispatch(fetchBlogs('?limit=3')); // Fetch only the 3 latest posts
    }
  }, [dispatch, loggedIn]);

  if (loggedIn) {
    return <Loader />;
  }

  return (
    <div>
      {/* --- Hero Section --- */}
      <section className="p-8 md:p-12 lg:p-16 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div>
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-brand-dark leading-none tracking-tight">
            Articulate.
          </h1>
          <p className="mt-4 text-xl text-brand-gray max-w-lg">
            A clean, focused space for writers and thinkers to share their stories with the world.
          </p>
          <div className="mt-8">
            <Link 
              to="/register" 
              className="className=text-center font-sans font-semibold text-sm bg-white border border-gray-300 text-brand-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Start Writing
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          {/* --- UPDATED TO LOCAL IMAGE --- */}
          <img 
            src="/hero-image.jpg" 
            alt="A bright and creative workspace" 
            className="rounded-lg shadow-2xl w-full h-full object-cover"
          />
        </div>
      </section>

      {/* --- "Why Articulate?" Section --- */}
      <section className="bg-white py-20 px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-brand-dark">Focus on What Matters: Your Words.</h2>
          <p className="mt-4 text-lg text-brand-gray">
            Articulate is designed to be a distraction-free environment. We provide the tools you need to write and publish, without the clutter you don't.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Minimalist Editor</h3>
            <p className="text-brand-gray">A rich text editor that gets out of your way, letting your ideas flow.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Blazing Fast</h3>
            <p className="text-brand-gray">Built on a modern tech stack for a snappy, responsive experience for you and your readers.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Engage Your Audience</h3>
            <p className="text-brand-gray">A built-in like and comment system helps you connect with your readers.</p>
          </div>
        </div>
        <div className="mt-16 max-w-5xl mx-auto">
            {/* --- UPDATED TO LOCAL IMAGE --- */}
            <img 
                src="/writing-image.jpg" 
                alt="A person writing in a journal" 
                className="rounded-lg shadow-xl w-full h-full object-cover"
            />
        </div>
      </section>

      {/* --- Featured Articles Section --- */}
      <section className="p-8 md:p-12 lg:p-16">
        <h2 className="text-3xl font-bold font-serif text-brand-dark mb-8">Featured Articles</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogItem key={blog._id} blog={blog} />
              ))
            ) : (
              <p className="col-span-full text-brand-gray">No featured articles yet. Be the first to write one!</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;