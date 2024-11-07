import Video from "../models/video.js"
import mongoose from "mongoose";

export async function uploadVideo(req, res){
    try{
        const { title, description, videoLink, videoType, thumbnail} = req.body;

        console.log(req.user.userId)
        const videoUpload = new Video ({user : req.user.userId, title, description, videoLink, videoType, thumbnail })
        await videoUpload.save();
        res.status(201).json({ sucess: "true", videoUpload})
    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
}

export async function getAllVideos(req, res){
     try{
        const  videos = await Video.find().populate("user", "channelName profilePic userName createdAt")    
        res.status(201).json({success: "true", "videos" : videos})

    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
}

export async function getVideoById(req, res){
    try{
        let {id} = req.params;
        console.log(id)
        const video = await Video.findById(id).populate("user", "channelName profilePic userName createdAt")
        res.status(201).json({success: "true", "videos" : video})


    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
}

export async function getAllVideoByUserId(req, res){
    try{
        let {userId} = req.params;
        const video = await Video.find({user: userId}).populate("user", "channelName profilePic userName createdAt")
        res.status(201).json({success: "true", "videos" : video})


    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
}

export const updateLikesDislikes = async (req, res) => {
    const { action, userId } = req.body;
    const videoId = req.params.id;
  
    try {
      const video = await Video.findById(videoId);
  
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
  
      // Initialize likes and dislikes as empty arrays if not present
      if (!video.likes) video.likes = [];
      if (!video.dislikes) video.dislikes = [];
  
      if (action === "like") {
        // Check if the user has already liked the video
        if (video.likes.includes(userId)) {
          // User has already liked, so remove the like
          video.likes = video.likes.filter((id) => id !== userId);
        } else {
          // Add the like to the array
          video.likes.push(userId);
          // If the user had disliked, remove the dislike
          video.dislikes = video.dislikes.filter((id) => id !== userId);
        }
      } else if (action === "dislike") {
        // Check if the user has already disliked the video
        if (video.dislikes.includes(userId)) {
          // User has already disliked, so remove the dislike
          video.dislikes = video.dislikes.filter((id) => id !== userId);
        } else {
          // Add the dislike to the array
          video.dislikes.push(userId);
          // If the user had liked, remove the like
          video.likes = video.likes.filter((id) => id !== userId);
        }
      }
  
      await video.save();
      res.json({ likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (err) {
      console.error("Error updating like/dislike:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  export async function editVideo(req, res) {
    try {
        const { title, description, thumbnail, videoLink } = req.body;
        const videoId = req.params.id;
        
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Update video fields
        video.title = title || video.title;
        video.description = description || video.description;
        video.thumbnail = thumbnail || video.thumbnail;
        video.videoLink = videoLink || video.videoLink;

        await video.save();
        res.status(200).json({ success: true, video });
    } catch (err) {
        console.error("Error editing video:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteVideo = async (req, res) => {
  const videoId = req.params.videoId;

  console.log("Received videoId:", videoId); // Log the received ID

  // Check if the videoId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ message: "Invalid video ID format" });
  }

  try {
    // Find the video by its ID
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete the video using deleteOne() instead of remove()
    await Video.deleteOne({ _id: videoId });

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Failed to delete video" });
  }
};

  
