// CommentSection.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useCommentStore } from '../store/commentStore';
import { useAuthStore } from '../store/authStore';

const CommentSection = () => {
  const { id:animeId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const { comments, isLoading, error, fetchComments, createComment } = useCommentStore();
  const {isAuthenticated} = useAuthStore();

  // Fetch comments on mount/animeId change
  

  useEffect(() => {
     fetchComments(animeId); 
    }, [animeId]);


  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await createComment(animeId, newComment.trim());
    setNewComment(''); 
  };

  return (
    <div className="py-10 bg-[#1a1a1f] min-h-screen mt-15">
      <h1 className="text-4xl font-extrabold text-[#3a57ea] mb-10 text-center">
        Comments Section
      </h1>
      <div className="container mx-auto px-4">
        {/* Loading State */}
        {isLoading && (
          <p className="text-white text-center text-lg mb-4">Loading comments...</p>
        )}
  
        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center text-lg mb-4">{error}</p>
        )}
  
        {/* Comments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comments.map((comment) => (
            <div 
              key={comment._id} 
              className="flex flex-col bg-[#212126] p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-[#3a57ea] transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#3a57ea] rounded-full flex items-center justify-center text-white font-bold">
                  {comment.userId?.username?.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">
                    {comment.userId?.username || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(comment.timestamp), { 
                      addSuffix: true 
                    })}
                  </p>
                </div>
              </div>
              <p className="text-white font-mono break-words">{comment.text}</p>
            </div>
          ))}
        </div>
  
        {/* Comment Form Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-[#3a57ea] mb-4">
            Add a Comment
          </h2>
          
          {isAuthenticated ? (
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-4 bg-[#212126] text-white rounded-lg focus:outline-none focus:border-2 focus:border-[#3a57ea] disabled:opacity-70"
                rows="4"
                placeholder="Write your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isLoading}
                className="mt-4 px-6 py-2 bg-[#3a57ea] text-white font-bold rounded-lg hover:bg-[#2a3fa3] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          ) : (
            <div className="p-6 bg-[#212126] rounded-lg text-center">
              <p className="text-gray-400 mb-4">
                You must be logged in to post comments
              </p>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-[#3a57ea] text-white font-bold rounded-lg hover:bg-[#2a3fa3] transition-all duration-300"
              >
                Login to Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
  export default CommentSection