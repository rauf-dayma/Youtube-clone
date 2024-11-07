import React, { useState, useEffect } from "react";
import "./profile.css";
import Sidenavbar from "../Sidenavbar/Sidenavbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const Profile = ({ sideNavbar }) => {
  const { userId } = useParams(); // Assuming you're passing userId as a URL parameter
  const [userData, setUserData] = useState(null); // State for user data
  const [videos, setVideos] = useState([]); // State for videos
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State for errors
  const [loggedInUserId, setLoggedInUserId] = useState(null); // New state for logged-in user ID
  console.log();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUserId(decodedToken.id); // Assuming 'userId' is in the payload of the JWT
    }
  }, []);

  // Fetch user videos on component mount
  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const response = await fetch(
          `http://localhost:2100/api/user/${userId}/channel`
        );
        const data = await response.json();

        if (response.ok) {
          if (data.videos.length > 0) {
            const firstVideo = data.videos[0]; // Get user info from the first video
            setUserData(firstVideo.user); // Set the user data
          }
          setVideos(data.videos); // Set the videos array
        } else {
          setError(data.message || "Error fetching videos.");
        }
      } catch (err) {
        setError("Failed to fetch videos.");
      } finally {
        setLoading(false); // Always stop loading once data is fetched
      }
    };

    fetchUserVideos();
  }, [userId]); // Re-fetch if userId changes

  const handleDelete = async (videoId) => {
    try {
      const response = await fetch(
        `http://localhost:2100/api/video/delete/${videoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Video deleted successfully");
        setVideos(videos.filter((video) => video._id !== videoId));
      } else {
        toast.error(data.message || "Error deleting video");
      }
    } catch (error) {
      toast.error("Failed to delete video.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something went wrong
  }

  return (
    <div className="profile">
      <Sidenavbar sideNavbar={sideNavbar} />
      <div className={sideNavbar ? "profilePage" : "FulllProfilePage"}>
        {/* Profile Top Section */}
        <div className="profileTopSection">
          <div className="profileTopSectionProfile">
            <img
              src={
                userData?.profilePic ||
                "https://wallpapercave.com/avt/UnknownUser.png?v=4"
              }
              alt="Profile"
              className="profileTopSectionImg"
            />
          </div>
          <div className="profileTopSectionAbout">
            <div className="profileTopSectionAbotName">
              {userData?.channelName || "Unknown User"}
            </div>
            <div className="profileTopSectionInfo">
              {" "}
              @{userData?.userName} . {videos.length} videos
            </div>
            <div className="profileTopSectionInfo">
              {" "}
              About section of the channel
            </div>
          </div>
        </div>

        {/* Profile Videos Section */}
        <div className="profileVideos">
          <div className="profileVideoTitle">
            Videos &nbsp; <ArrowRightIcon sx={{ fontSize: 36 }} />
          </div>

          <div className="profile_videos">
            {/* Map over fetched videos and render each video */}
            {videos.map((video) => (
              <Link
                to={`/watch/${video._id}`}
                key={video._id}
                className="profileVideoBlock"
              >
                <div className="profileVideoBlockThumbnail">
                  <img
                    className="profileVideoBlockThumbnail-img"
                    src={video.thumbnail}
                    alt={video.title}
                  />
                </div>
                <div className="profileVideoBlockDetails">
                  <div className="profileVideoBlockDetailsName">
                    {video.title}
                  </div>
                  {/* Show Edit and Delete buttons only if the logged-in user is the owner */}
                  {loggedInUserId === video.user._id && (
                    <div className="profileVideoBlockDetailsActions">
                      <Link to={`/edit/${video._id}`}>Edit</Link>
                      <button onClick={() => handleDelete(video._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                  <div className="profileVideoBlockDetailsAbout">
                    Created at {new Date(video.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
