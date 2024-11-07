
import { addComment, deleteComment, getCommentByVideoId, updateComment } from "../controllers/comment.js";
import { verifyToken } from "../controllers/user.js";


export function commmentsRoute(app) {
    app.post("/api/addComment", verifyToken, addComment);
    app.get("/api/comment/:videoId", getCommentByVideoId);
    app.put("/api/comment/:commentId", verifyToken, updateComment);  // Edit comment route
    app.delete("/api/comment/:commentId", verifyToken, deleteComment);  // Delete comment route
}
