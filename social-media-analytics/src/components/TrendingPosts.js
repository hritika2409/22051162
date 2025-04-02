import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        // Get posts and comments
        const postsResponse = await axios.get('http://localhost:3000/api/posts');
        const commentsResponse = await axios.get('http://localhost:3000/api/comments');
        const usersResponse = await axios.get('http://localhost:3000/api/users');
        
        // Create user lookup object
        const userLookup = {};
        usersResponse.data.forEach(user => {
          userLookup[user.id] = user;
        });
        setUsers(userLookup);
        
        // Count comments per post
        const postCommentCount = {};
        commentsResponse.data.forEach(comment => {
          if (postCommentCount[comment.postId]) {
            postCommentCount[comment.postId]++;
          } else {
            postCommentCount[comment.postId] = 1;
          }
        });
        
        // Find max comment count
        const maxComments = Math.max(...Object.values(postCommentCount));
        
        // Get all posts with max comment count
        const trending = postsResponse.data
          .filter(post => postCommentCount[post.id] === maxComments)
          .map(post => ({
            ...post,
            commentCount: postCommentCount[post.id] || 0,
            // Random image for the post
            image: `https://picsum.photos/seed/${post.id}/800/450`
          }));
        
        setTrendingPosts(trending);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trending posts:', err);
        setError('Failed to load trending posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>{error}</p>
    </div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Trending Posts <span className="text-blue-500">({trendingPosts.length})</span>
      </h2>
      
      <div className="space-y-8">
        {trendingPosts.map((post, index) => {
          const user = users[post.userId] || { name: 'Unknown User', username: 'unknown' };
          return (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span>Trending</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.body}</p>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center">
                    <img 
                      src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${user.username}`} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="font-bold">{post.commentCount} comments</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingPosts;