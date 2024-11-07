import React, { useState, useEffect } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";

const  HomePage = ({ sideNavbar }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAlllVideos();
  }, []);

  async function getAlllVideos() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:2100/api/allVideos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("videos:", data.videos);
        setVideos(data.videos); // Set fetched videos to state
      } else {
        const error = await response.json();
        console.error("Error fetching videos:", error.message);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  const options = [
    "All",
    "Comedy",
    "TV Shows",
    "Tarak Mehta",
    "Cartoon",
    "Chess",
    "Cs50",
    "Harvard",
    "Internshala",
    "Gaming",
    "BSE",
    "Stocks",
    "Cricket",
    "BB ki Vines",
    "Carryminati",
    "Netflix",
    "JS Tutorials",
    "Git Commands",
    "ReactJS",
    "NodeJS",
    "APIs",
    "Development",
    "BackEnd",
    "Code with Harry",
    "Funny Videos",
  ];

  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      <div className="homePage_options">
        {options.map((items, index) => {
          return (
            <div key={index} className="homePage_option">
              {items}
            </div>
          );
        })}
      </div>

      <div className={sideNavbar ? "home-mainPage" : "full_home-mainPage"}>
        {videos.map((video) => (
          <div className="youtube_video" key={video._id}>
            <div className="thubnailBox">
               <Link key={video._id} to={`watch/${video._id}`}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="thubnailPic"
                />
              </Link>

              <div className="timingThumbnail">28:05</div>

              <Link to={`/user/${video.user._id}`} className="youtubeTitleBox">
                <div className="youtubeTitleBoxProfile">
                  <img
                    src={video.user.profilePic}
                    alt={video.user.userName}
                    className="imgYoutubeTumbnailProfile"
                  />
                </div>

                <div className="youtubeTitleBoxTitle">
                  <div className="youtube_videoTile">{video.title}</div>
                  <div className="youtube_channelName">
                    {video.user.channelName}
                  </div>
                  <div className="youtubeVideo_views">{video.likes.length} likes</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
