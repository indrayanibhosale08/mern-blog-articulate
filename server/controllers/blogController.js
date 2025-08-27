import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

const getBlogs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? { title: { $regex: req.query.keyword, $options: 'i' } } : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const blogs = await Blog.find({ ...keyword, ...category }).populate('user', 'name');
  res.json(blogs);
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', 'name');
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

const getMyBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ user: req.user._id });
  res.json(blogs);
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, subtitle, content, image, category, tags } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }
  const blog = new Blog({
    user: req.user._id,
    title,
    subtitle,
    content,
    image,
    category,
    tags,
  });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, subtitle, content, image, category, tags } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  if (blog.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized');
  }

  blog.title = title || blog.title;
  blog.subtitle = subtitle || blog.subtitle;
  blog.content = content || blog.content;
  blog.image = image || blog.image;
  blog.category = category || blog.category;
  blog.tags = tags || blog.tags;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  if (blog.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized');
  }
  await blog.deleteOne();
  res.json({ message: 'Blog removed' });
});

const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  const alreadyLiked = blog.likes.find(like => like.toString() === req.user._id.toString());
  if (alreadyLiked) {
    blog.likes = blog.likes.filter(like => like.toString() !== req.user._id.toString());
  } else {
    blog.likes.push(req.user._id);
  }
  await blog.save();
  res.json(blog);
});

const addCommentToBlog = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error('Comment text is required');
  }
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const comment = {
      text,
      name: req.user.name,
      user: req.user._id,
    };
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(blog.comments);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

export {
  getBlogs,
  getBlogById,
  getMyBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addCommentToBlog,
};