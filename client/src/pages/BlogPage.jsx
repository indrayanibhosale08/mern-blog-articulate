import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById, resetBlogState, likeBlog } from '../features/blogs/blogSlice'; // Import likeBlog
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CommentSection from '../components/CommentSection';

// A reusable Heart Icon for the Like button
const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-colors ${filled ? 'text-red-500' : 'text-brand-gray'}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const BlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loggedIn, user } = useAuthStatus();
  const { blog, loading, error } = useSelector((state) => state.blogs);

  useDocumentTitle(blog?.title);

  useEffect(() => {
    dispatch(fetchBlogById(id));
    return () => { dispatch(resetBlogState()); };
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(likeBlog(id));
  };

  // Check if the current user's ID is in the blog's 'likes' array
  const userHasLiked = blog?.likes?.includes(user?._id);

  return (
    <div className="p-8 md:p-12 lg:p-16">
      {loading && !blog ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : blog && (
        <>
          <article className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">{blog.title}</h1>
            <p className="text-xl text-brand-gray mb-6">{blog.subtitle}</p>
            
            <div className="text-gray-500 text-sm mb-6 flex justify-between items-center border-t border-b border-gray-200 py-4">
              <div>
                <span>By <strong className="text-brand-dark">{blog.user?.name || 'Anonymous'}</strong></span>
                <span className="mx-2">&bull;</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              {/* --- Like Button & Count --- */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  disabled={!loggedIn}
                  className="p-1 rounded-full transition-colors disabled:cursor-not-allowed hover:bg-red-100"
                  title={loggedIn ? (userHasLiked ? 'Unlike' : 'Like') : 'Please log in to like'}
                >
                  <HeartIcon filled={userHasLiked} />
                </button>
                <span className="font-semibold text-brand-dark">{blog.likes?.length || 0}</span>
              </div>
            </div>
            
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover rounded-lg mb-8 shadow-lg" />
            )}
            
            <div
              className="prose prose-lg max-w-none text-brand-dark"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </article>

          <CommentSection blogId={blog._id} comments={blog.comments} />
        </>
      )}
    </div>
  );
};

export default BlogPage;