import express from 'express';
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addCommentToBlog,
  getMyBlogs,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBlogs);
router.route('/myblogs').get(protect, getMyBlogs);
router.route('/:id').get(getBlogById);
router.route('/').post(protect, createBlog);
router.route('/:id/like').post(protect, likeBlog);
router.route('/:id/comments').post(protect, addCommentToBlog);
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);

export default router;