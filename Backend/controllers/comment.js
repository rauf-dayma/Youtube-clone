import Comment from "../models/comment.js"

export async function addComment(req, res){
    try{
        const{video, message} = req.body;
        const comment = new Comment({user: req.user.userId, video, message})
        await comment.save();
        res.status(201).json({ sucess: "true", comment})
     
    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
} 

export async function getCommentByVideoId(req, res){
    try{
      const {videoId} = req.params;
      const comments = await Comment.find({ video: videoId}).populate("user", "channelName profilePic userName createdAt")   
      res.status(201).json({success: "true", "videos" : comments})
    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
}

// Update comment
export async function updateComment(req, res) {
    try {
        const { commentId } = req.params;
        const { message } = req.body;

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId, user: req.user.userId },  // Ensure the comment belongs to the logged-in user
            { message },
            { new: true }  // Return the updated comment
        );

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found or unauthorized" });
        }

        res.status(200).json({ success: true, updatedComment });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
}


// Delete comment
export async function deleteComment(req, res) {
    try {
        const { commentId } = req.params;

        const deletedComment = await Comment.findOneAndDelete({
            _id: commentId,
            user: req.user.userId,  // Ensure only the owner can delete
        });

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
}
