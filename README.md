YouTube Clone Application
Project Overview
This project is a YouTube clone application that mimics the look and feel of YouTube. It features video streaming, comment management, video likes and dislikes, and a fully responsive design optimized for all devices. The application allows users to browse, search, watch, like/dislike videos, post comments, and manage their profiles.

The backend is built with Node.js and Express, and it provides a RESTful API for video management, comment handling, likes/dislikes, and user authentication. The frontend is built with React, Redux, and Material UI for a modern and responsive user interface.

Features
Video Streaming: Watch videos with a player interface.
Search Videos: Search for videos based on keywords.
Video Comments: Post, edit, and delete comments for videos.
Likes and Dislikes: Like and dislike videos, with dynamic updates.
User Authentication: Register, log in, and manage user sessions with JWT tokens.
Responsive Design: The application is fully responsive, providing an optimal user experience on desktops, tablets, and mobile devices.
Dynamic Profile: Update user profile information, such as username and profile picture.
Video Recommendations: Show related videos based on the currently watched video.

Technologies Used

Frontend:

React
Redux (for state management)
React Router (for routing)
Material UI (for UI components)
Fetch API (for API calls)
CSS (for styling)

Backend:

Node.js
Express.js
MongoDB (for database)
JWT (for user authentication)

Other:

Postman (for API testing)

API Endpoints
Here are the key API endpoints for the backend:

Authentication
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Log in a user and get a JWT token.

Videos
GET /api/videos: Get all videos.
GET /api/videos/:id: Get a specific video by ID.
GET /api/videos/search: Search for videos based on keywords.

Comments
POST /api/videos/:id/comments: Post a comment on a video.
PUT /api/videos/:id/comments/:commentId: Edit a comment on a video.
DELETE /api/videos/:id/comments/:commentId: Delete a comment from a video.
Likes/Dislikes
PUT /api/videos/:id/like: Like a video.
PUT /api/videos/:id/dislike: Dislike a video.

Profile
GET /api/user/profile: Get the logged-in user's profile information.
PUT /api/user/profile: Update the user's profile information.
Usage
User Authentication: Users need to log in to post comments, like/dislike videos, and manage their profile.
Watch Videos: Users can click on a video thumbnail to watch it in the video player.
Search Videos: Users can search for videos by typing keywords into the search bar.
Post Comments: Logged-in users can post, edit, and delete comments for any video.
Like/Dislike Videos: Users can like or dislike videos, and the count will be updated dynamically.
Manage Profile: Users can update their profile information, such as the display name and profile picture.
Deployment
To deploy this application, you can use cloud services like Heroku, Vercel, or AWS for both the frontend and backend. Ensure you configure the environment variables properly for production.


Github Link:
https://github.com/rauf-dayma/Youtube-clone