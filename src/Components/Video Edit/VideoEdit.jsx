import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "../../Pages/Video Upload/VideoUpload.css"; // Use the same CSS as VideoUpload

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoLink: "",
  });
  const [loader, setLoader] = useState(false);

  // Fetch video details to prefill the form
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`http://localhost:2100/api/video/${id}`);
        const data = await response.json();

        if (response.ok) {
          setVideoData(data.videos);
        } else {
          toast.error(data.message || "Error fetching video data.");
        }
      } catch (error) {
        toast.error("Failed to fetch video details.");
      }
    };

    fetchVideoData();
  }, [id]);

  const handleOnChangeInput = (e, name) => {
    setVideoData({
      ...videoData,
      [name]: e.target.value,
    });
  };

  const uploadImage = async (e) => {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "youtube-clone");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dy6dkn2m9/image/upload", data);
      setLoader(false);
      setVideoData({
        ...videoData,
        thumbnail: response.data.url,
      });
    } catch (err) {
      setLoader(false);
      toast.error("Image upload failed.");
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  
      if (!token) {
        toast.error("You need to log in first.");
        return;
      }
  
      const response = await fetch(`http://localhost:2100/api/video/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(videoData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Video updated successfully!");
        navigate(`/watch/${id}`);
      } else {
        toast.error(data.message || "Error updating video.");
      }
    } catch (error) {
      toast.error("Failed to update video.");
    }
  };
  

  return (
    <div className="VideoUpload">
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Edit Video
        </div>

        <div className="uploadForm">
          <input
            type="text"
            value={videoData.title}
            className="uploadFormInputs"
            onChange={(e) => handleOnChangeInput(e, "title")}
            placeholder="Title of Video"
          />
          <input
            type="text"
            value={videoData.description}
            className="uploadFormInputs"
            onChange={(e) => handleOnChangeInput(e, "description")}
            placeholder="Description"
          />
          <div>
            Thumbnail
            <input
              type="file"
              onChange={uploadImage}
              accept="image/*"
            />
          </div>

          {loader && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        <div className="uploadBtns">
          <div className="uploadBtnForm" onClick={handleSubmit}>
            Save
          </div>
          <div className="uploadBtnForm" onClick={() => navigate(`/watch/${id}`)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
