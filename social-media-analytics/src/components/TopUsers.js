import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        // Get users and their posts
        const usersResponse = await axios.get('http://localhost:3000/api/users');
        const postsResponse = await axios.get('http://localhost:3000/api/posts');
        
        // Count posts per user
        const userPostCount = {};
        postsResponse.data.forEach(post => {
          if (userPostCount[post.userId]) {
            userPostCount[post.userId]++;
          } else {
            userPostCount[post.userId] = 1;
          }
        });
        
        // Map user data with post counts
        const usersWithPostCounts = usersResponse.data.map(user => ({
          ...user,
          postCount: userPostCount[user.id] || 0,
          // Random avatar for each user
          avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.username}`
        }));
        
        // Sort by post count and take top 5
        const sortedUsers = usersWithPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        
        setTopUsers(sortedUsers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching top users:', err);
        setError('Failed to load top users. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopUsers();
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
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Top Content Creators</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topUsers.map((user, index) => (
          <motion.div 
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className={`h-3 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'}`}></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-500">
                  <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-600">{user.postCount}</span>
                  <span className="text-sm text-gray-500">Posts</span>
                </div>
                
                <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                  <span className="font-bold text-blue-700">#{index + 1}</span>
                  <span className="block text-xs text-gray-500">Rank</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopUsers;