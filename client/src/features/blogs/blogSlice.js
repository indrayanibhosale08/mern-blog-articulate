import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  blogs: [],
  blog: null,
  myBlogs: [],
  loading: false,
  error: null,
};

const getToken = (getState) => {
  const { user: { userInfo } } = getState();
  if (!userInfo) return null;
  return { headers: { Authorization: `Bearer ${userInfo.token}` } };
};

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (query = '', { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/blogs${query}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/blogs/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

export const fetchMyBlogs = createAsyncThunk('blogs/fetchMyBlogs', async (_, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    const { data } = await axios.get('/api/blogs/myblogs', config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

export const createBlog = createAsyncThunk('blogs/createBlog', async (blogData, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    const { data } = await axios.post('/api/blogs', blogData, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (blogData, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    const { data } = await axios.put(`/api/blogs/${blogData.id}`, blogData, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    await axios.delete(`/api/blogs/${id}`, config);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

export const likeBlog = createAsyncThunk('blogs/likeBlog', async (id, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    const { data } = await axios.post(`/api/blogs/${id}/like`, {}, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

export const addComment = createAsyncThunk('blogs/addComment', async ({ blogId, commentData }, { getState, rejectWithValue }) => {
  try {
    const config = getToken(getState);
    const { data } = await axios.post(`/api/blogs/${blogId}/comments`, commentData, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    resetBlogState: (state) => {
      state.blog = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBlogs.fulfilled, (state, action) => { state.loading = false; state.blogs = action.payload; })
      .addCase(fetchBlogs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchBlogById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBlogById.fulfilled, (state, action) => { state.loading = false; state.blog = action.payload; })
      .addCase(fetchBlogById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchMyBlogs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => { state.loading = false; state.myBlogs = action.payload; })
      .addCase(fetchMyBlogs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createBlog.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createBlog.fulfilled, (state, action) => { state.loading = false; state.blogs.unshift(action.payload); })
      .addCase(createBlog.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateBlog.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateBlog.fulfilled, (state, action) => { state.loading = false; state.blog = action.payload; })
      .addCase(updateBlog.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteBlog.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.myBlogs = state.myBlogs.filter((blog) => blog._id !== action.payload);
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(likeBlog.fulfilled, (state, action) => {
        if (state.blog && state.blog._id === action.payload._id) {
          state.blog = action.payload;
        }
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(addComment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        if (state.blog) {
          state.blog.comments = action.payload;
        }
      })
      .addCase(addComment.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;