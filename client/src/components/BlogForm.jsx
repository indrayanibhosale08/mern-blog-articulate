// src/components/BlogForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { createBlog } from '../features/blogs/blogSlice'; // Import the thunk

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.blogs);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_cloudinary_upload_preset'); // IMPORTANT: Replace

    setUploading(true);
    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // IMPORTANT: Replace
        formData
      );
      setImage(data.secure_url);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !content) {
      alert('Please fill in all required fields.');
      return;
    }
    dispatch(createBlog({ title, category, content, image })).then((result) => {
      if (createBlog.fulfilled.match(result)) {
        // Navigate to the home page or the new blog's page on success
        navigate('/');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Technology"
          required
        />
      </div>

      <div className="form-group">
        <label>Featured Image</label>
        <input type="file" onChange={handleImageUpload} />
        {uploading && <p>Uploading image...</p>}
        {image && <img src={image} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      </div>

      <div className="form-group">
        <label>Content</label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </div>

      <button type="submit" disabled={loading || uploading}>
        {loading ? 'Publishing...' : 'Publish Blog'}
      </button>
    </form>
  );
};

export default BlogForm;