import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Social Analytics</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="text-white hover:text-blue-200 font-medium">
                    Feed
                  </Link>
                </li>
                <li>
                  <Link to="/top-users" className="text-white hover:text-blue-200 font-medium">
                    Top Users
                  </Link>
                </li>
                <li>
                  <Link to="/trending" className="text-white hover:text-blue-200 font-medium">
                    Trending Posts
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/top-users" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>© 2025 Social Analytics Dashboard</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;