import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchBlogById, updateBlog, resetBlogState } from '../features/blogs/blogSlice';
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload';
import Loader from '../components/Loader';
import Message from '../components/Message';

const EditBlogPage = () => {
    const { id: blogId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { blog, loading, error } = useSelector((state) => state.blogs);
    const { userInfo } = useSelector((state) => state.user);
    
    const { uploading, imageUrl, uploadImage, setImageUrl } = useCloudinaryUpload(blog?.image || '');

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        dispatch(fetchBlogById(blogId));
        return () => { dispatch(resetBlogState()); };
    }, [dispatch, blogId]);

    useEffect(() => {
        if (blog) {
            if (blog.user._id !== userInfo._id && !userInfo.isAdmin) {
                navigate('/dashboard');
            }
            setTitle(blog.title);
            setSubtitle(blog.subtitle || '');
            setContent(blog.content);
            setCategory(blog.category);
            setImageUrl(blog.image);
        }
    }, [blog, userInfo, navigate, setImageUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBlogData = { id: blogId, title, subtitle, category, content, image: imageUrl };
        dispatch(updateBlog(updatedBlogData)).then((result) => {
            if (updateBlog.fulfilled.match(result)) {
                navigate(`/dashboard/my-blogs`);
            }
        });
    };

    if (loading && !title) return <Loader />;

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-serif text-white">Edit Article</h1>
                <div>
                    <button onClick={() => navigate('/dashboard/my-blogs')} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors mr-4 text-sm font-medium">
                        Back
                    </button>
                    <button onClick={handleSubmit} disabled={loading || uploading} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {error && <Message variant="danger">{error}</Message>}
            
            <form className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-300 mb-1">Subtitle</label>
                    <input id="subtitle" type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <ReactQuill theme="snow" value={content} onChange={setContent} />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Photography</option>
                        <option>Business</option>
                        <option>Lifestyle</option>
                        <option>Technology</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Thumbnail</label>
                    <div className="mt-1 flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                        <label htmlFor="image-upload" className="cursor-pointer bg-white text-gray-800 font-semibold px-3 py-1 text-sm rounded-md hover:bg-gray-200">
                            Change File
                            <input id="image-upload" type="file" onChange={uploadImage} className="hidden" />
                        </label>
                        <span className="ml-3 text-gray-400">{imageUrl ? 'Image Selected' : 'No file chosen'}</span>
                    </div>
                    {uploading && <div className="mt-2"><Loader /></div>}
                </div>
            </form>
        </div>
    );
};

export default EditBlogPage;