import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = ({ blog }) => {
  return (
    <Link to={`/blog/${blog._id}`} className="group block">
      <div className="overflow-hidden rounded-md mb-4">
        <img 
          src={blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070'} 
          alt={blog.title} 
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" 
        />
      </div>
      <div>
        <p className="text-sm text-brand-gray font-semibold uppercase tracking-wider mb-1">{blog.category}</p>
        <h3 className="text-2xl font-serif font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
          {blog.title}
        </h3>
        <p className="text-sm text-brand-gray mt-2">
          By {blog.user?.name || 'Anonymous'}
        </p>
      </div>
    </Link>
  );
};

export default BlogItem;