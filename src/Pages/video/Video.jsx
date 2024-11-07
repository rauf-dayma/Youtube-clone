import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import "./video.css";

const Video = ({userData}) => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // New state for logged-in user ID
  const [hasLiked, setHasLiked] = useState(false); // Track like status
  const [hasDisliked, setHasDisliked] = useState(false); // Track dislike status

  console.log(videoData)
  // Decode the token to get user ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUserId(decodedToken.id); // Assuming 'userId' is in the payload of the JWT
    }
  }, []);

  // Function to fetch video data
  const fetchVideo = async () => {
    try {
      const res = await fetch(`http://localhost:2100/api/video/${id}`);
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(
          `Error fetching video: ${res.status} - ${errorMessage}`
        );
      }
      const data = await res.json();
      setVideoData(data.videos);
    } catch (err) {
      console.error("Error fetching video:", err.message);
    }
  };

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:2100/api/comment/${id}`);
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(
          `Error fetching comments: ${res.status} - ${errorMessage}`
        );
      }
      const data = await res.json();
      setComments(data.videos);
    } catch (err) {
      console.error("Error fetching comments:", err.message);
    }
  };

  // Function to fetch suggested videos
  const fetchSuggestedVideos = async () => {
    try {
      const res = await fetch(`http://localhost:2100/api/Allvideos?limit=10`);
      const data = await res.json();
      setSuggestedVideos(data.videos);
    } catch (err) {
      console.error("Error fetching suggested videos:", err.message);
    }
  };

  // Handle Edit Comment
  const handleEdit = async (commentId) => {
    const updatedMessage = prompt("Edit your comment:");
    if (!updatedMessage) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:2100/api/comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: updatedMessage }),
        }
      );

      if (!res.ok) throw new Error("Error editing comment");

      fetchComments(); // Refetch comments after successful edit
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handle Delete Comment
  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:2100/api/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error deleting comment");

      fetchComments(); // Refetch comments after successful deletion
    } catch (err) {
      console.error(err.message);
    }
  };

  // Fetch all data when the component loads or video id changes
  useEffect(() => {
    fetchVideo();
    fetchComments();
    fetchSuggestedVideos();
  }, [id]);

  // Handle submitting a new comment
  const handleCommentSubmit = async () => {
    if (!newComment) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const res = await fetch(`http://localhost:2100/api/addComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newComment, video: id }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(
          `Error adding comment: ${res.status} - ${errorMessage}`
        );
      }

      const data = await res.json();
      setComments([...comments, data.comment]); // Add new comment to the list
      setNewComment("");

      // Fetch updated data immediately after the comment is added
      fetchComments();
    } catch (err) {
      console.error("Error adding comment:", err.message);
    }
  };

 const handleLikeDislike = async (action) => {
  try {
    const token = localStorage.getItem("token");

    if (!loggedInUserId || !token) {  
      console.error("User not logged in");
      return;
    }

    const res = await fetch(`http://localhost:2100/api/video/likeDislike/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action, userId: loggedInUserId }),  // Use 'loggedInUserId'
    });

    if (!res.ok) throw new Error("Failed to update like/dislike");

    const data = await res.json();

    // Update the videoData with the new likes/dislikes count
    setVideoData((prev) => ({
      ...prev,
      likes: data.likes,
      dislikes: data.dislikes,
    }));

    // Optionally, you can re-fetch the video data to ensure everything is synchronized
    fetchVideo();
  } catch (err) {
    console.error("Error updating like/dislike:", err.message);
  }
};

  if (!videoData) return <div>Loading...</div>;

  return (
    <div className="video">
      {/* Video Section */}
      <div className="videoPostSection">
        <div className="video_youtube">
          <video
            key={id}
            controls
            autoPlay
            loop
            className="video_youtube_video"
          >
            <source src={videoData.videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Video Info */}
        <div className="video_youtubeAbout">
          <div className="video_youtube_title">{videoData.title}</div>
          <div className="youtube_videoProfileBLock">
            <div className="youtube_videoProfileBLockLeft">
              <Link
                to={`/user/${videoData.user._id}`}
                className="youtube_videoProfileBLockLeftImg"
              >
                <img
                  src={videoData.user.profilePic}
                  alt=""
                  className="youtube_videoProfileBLockLeftImage"
                />
              </Link>
              <div className="youtubeVideoSubsView">
                <div className="userPostProfileName">
                  {videoData.user.channelName}
                </div>
                <div className="userPostProfileSubs">
                  {new Date(videoData.user.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="subscribeButtonYoutube">Subscribe</div>
            </div>
            <div className="youtubeVideoLikeBlock">
              <div
                className={`youtubeVideoLikeBlockLike ${
                  hasLiked ? "active" : ""
                }`}
                onClick={() => handleLikeDislike("like")}
              >
                <ThumbUpOffAltIcon />
                <div className="numberOfLike">{videoData.likes.length}</div>
              </div>
              <div className="youtubeVideoDevider"></div>
              <div
                className={`youtubeVideoLikeBlockLike ${
                  hasDisliked ? "active" : ""
                }`}
                onClick={() => handleLikeDislike("dislike")}
              >
                <ThumbDownOffAltIcon />
                <div className="numberOfDislike">{videoData.dislikes.length}</div>
              </div>
            </div>
          </div>
          <div className="youtubeVideoAbout">
            <div>{new Date(videoData.createdAt).toLocaleDateString()}</div>
            <div>{videoData.description}</div>
          </div>
          {/* Comments Section */}
          <div className="youtubeCommentSection">
            <div className="youtubeCommentSectionTitle">
              {comments.length} comments
            </div>
            <div className="youtubeSelfComment">
              <img
                src={userData.profilePic}
                alt=""
                className="youtubeSelfCommentProfile"
              />
              <div className="addComment">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="addCommentInput"
                />
                <div className="cancelSubmitComment">
                  <div
                    className="cancelComment"
                    onClick={() => setNewComment("")}
                  >
                    Cancel
                  </div>
                  <div className="cancelComment" onClick={handleCommentSubmit}>
                    Submit
                  </div>
                </div>
              </div>
            </div>

            {/* Displaying existing comments */}
            {comments.map((comment) => (
              <div key={comment._id} className="youtubeOthersComments">
                <div className="youtubeSelfComment">
                  <img
                    src={comment.user.profilePic}
                    alt=""
                    className="youtubeSelfCommentProfile"
                  />
                  <div className="othersCommentSection">
                    <div className="othersCommentSectionHeader">
                      <div className="channelName_comment">
                        {comment.user.channelName}
                      </div>
                      <div className="commentTimingOthers">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="commentMessageOthers">
                      {comment.message}
                    </div>
                    {/* Show edit and delete buttons if user matches the logged-in user */}
                    {comment.user._id === loggedInUserId && (
                      <div className="editDeleteButtons">
                        <button onClick={() => handleEdit(comment._id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(comment._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Video Suggestions */}
      <div className="videoSuggetions">
        {suggestedVideos.map((video) => (
          <Link
            to={`/watch/${video._id}`}
            key={video._id}
            className="videoSuggetionBlock"
            onClick={() => {
              fetchVideo();
              fetchComments();
            }}
          >
            <div className="videoSuggetionTHumbnail">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="videoSuggetionTHumbnail-img"
              />
            </div>
            <div className="videoSuggetionsAbout">
              <div className="videoSuggetionAboutTitle">
                <div className="suggestedVideoTitle">{video.title}</div>
              </div>
              <div className="videoSuggetionAboutProfile">
                {video.user.channelName}
              </div>
              <div className="videoSuggetionStats">
                {video.views} views •{" "}
                {new Date(video.createdAt).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Video;
