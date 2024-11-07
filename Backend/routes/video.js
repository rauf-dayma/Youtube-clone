import { verifyToken } from "../controllers/user.js";
import { getAllVideoByUserId, getAllVideos, getVideoById, uploadVideo, updateLikesDislikes, editVideo,  deleteVideo } from "../controllers/video.js";

export function uploadVideoRoute(app) {
    // Upload a new video (requires authentication)
    app.post("/api/video/upload", verifyToken, uploadVideo);
  
    // Get all videos
    app.get("/api/Allvideos", getAllVideos);
  
    // Get a video by its ID
    app.get("/api/video/:id", getVideoById);
  
    // Get all videos by a specific user's ID
    app.get("/api/user/:userId/channel", getAllVideoByUserId);
    app.put('/api/video/likeDislike/:id', updateLikesDislikes);

    app.put('/api/video/edit/:id', verifyToken, editVideo);
  
    // Delete a video
    app.delete('/api/video/delete/:videoId', verifyToken, deleteVideo);
  
  }