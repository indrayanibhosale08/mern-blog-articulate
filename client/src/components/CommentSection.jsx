import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from '../features/blogs/blogSlice';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Message from './Message';

const CommentSection = ({ blogId, comments }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { loggedIn } = useAuthStatus();
  const { loading, error } = useSelector((state) => state.blogs);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addComment({ blogId, commentData: { text } })).then((result) => {
        if (addComment.fulfilled.match(result)) {
          setText('');
        }
      });
    }
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Comments ({comments.length})</h3>
      {loggedIn ? (
        <form onSubmit={handleSubmit} className="mb-8">
          {error && <Message variant="danger">{error}</Message>}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Join the discussion..."
            required
            rows="3"
            className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-8 bg-white p-4 rounded-lg text-center shadow-sm">
          <p className="text-brand-gray">
            Please <Link to="/login" className="font-semibold text-brand-blue hover:underline">log in</Link> to write a comment.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <strong className="text-brand-dark mr-3">{comment.name}</strong>
                <small className="text-gray-500">{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
              <p className="text-brand-dark whitespace-pre-wrap">{comment.text}</p>
            </div>
          )).reverse()
        ) : (
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <p className="text-gray-500">No comments yet. Be the first to add one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;