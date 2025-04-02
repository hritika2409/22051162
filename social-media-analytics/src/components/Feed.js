import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pollIntervalRef = useRef(null);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      // Get posts
      const postsResponse = await axios.get('http://localhost:3000/api/posts');
      
      // If we don't have users yet, fetch them
      if (Object.keys(users).length === 0) {
        const usersResponse = await axios.get('http://localhost:3000/api/users');
        const userLookup = {};
        usersResponse.data.forEach(user => {
          userLookup[user.id] = user;
        });
        setUsers(userLookup);
      }
      
      // Sort posts by newest first (assuming posts have a timestamp or id that indicates recency)
      const sortedPosts = [...postsResponse.data].sort((a, b) => b.id - a.id);
      
      // Add images to posts
      const postsWithImages = sortedPosts.map(post => ({
        ...post,
        image: `https://picsum.photos/seed/${post.id}/800/400`
      }));
      
      setPosts(postsWithImages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching feed:', err);
      setError('Failed to load feed. Please try again later.');
      setLoading(false);
    }
  };

  // Set up initial fetch and polling
  useEffect(() => {
    fetchPosts();
    
    // Set up polling for real-time updates
    pollIntervalRef.current = setInterval(fetchPosts, 10000); // Poll every 10 seconds
    
    // Clean up
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  if (loading && posts.length === 0) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error && posts.length === 0) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>{error}</p>
    </div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Latest Posts</h2>
      
      {loading && (
        <div className="mb-6 flex justify-center">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            <div className="flex items-center">
              <div className="mr-2 animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <span>Refreshing feed...</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-8">
        {posts.map((post, index) => {
          const user = users[post.userId] || { name: 'Unknown User', username: 'unknown' };
          return (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              
              <div className="p-6">
                <div className="flex items-center mb-4">
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
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-600">{post.body}</p>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      Like
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                      </svg>
                      Comment
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      Share
                    </button>
                  </div>
                  
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;