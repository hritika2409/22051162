# Social Analytics Dashboard

![Dashboard Header](https://i.imgur.com/aXYZ123.png)
![Mobile Feed View](https://i.imgur.com/def456.png)

## Project Overview

Social Analytics is a React-based web application that provides analytics and visualization for social media content. The dashboard allows users to view latest posts, top content creators, and trending topics in an intuitive interface.

## Features

- **Feed View**: Displays latest posts with real-time updates
- **Top Users**: Showcases top content creators ranked by post count
- **Trending Posts**: Highlights posts with the highest engagement
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Updates**: Polls for new content every 10 seconds

## Technology Stack

- React 18.2.0
- React Router 6.11.2
- Axios for API calls
- Tailwind CSS for styling
- Framer Motion for animations

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/social-analytics.git
cd social-analytics
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
social-analytics/
├── src/
│   ├── components/
│   │   ├── Feed.js
│   │   ├── TopUsers.js
│   │   └── TrendingPosts.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── tailwind.config.js
└── package.json
```

## API Integration

The application expects a backend service running at `http://localhost:3000` with the following endpoints:
- `/api/users` - Returns user information
- `/api/posts` - Returns post data
- `/api/comments` - Returns comment data

## Screenshots

### Dashboard Home
![Dashboard Home](https://i.imgur.com/aXYZ123.png)

### Mobile Feed View
![Mobile Feed View](https://i.imgur.com/def456.png)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Images provided by [Picsum Photos](https://picsum.photos/)
- Avatars generated with [DiceBear Avatars](https://avatars.dicebear.com/)
