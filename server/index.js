// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // To accept JSON data in the body

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// --- Base Route (Optional, but good for testing) ---
app.get('/', (req, res) => {
  res.send('API is running...');
});
// ---------------------------------------------------

// Fallback for 404 Not Found errors
app.use(notFound);

// Custom error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});