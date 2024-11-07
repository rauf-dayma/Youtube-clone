import React from "react";
import { Link } from "react-router-dom";
import "./search.css"; // Create CSS similar to YouTube

const Search = ({ searchTerm, videos }) => {
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchPage">
      {filteredVideos.length > 0 ? (
        filteredVideos.map((video) => (
          <div className="searchResult" key={video._id}>
            <Link to={`/watch/${video._id}`}>
              <img src={video.thumbnail} alt={video.title} className="searchThumbnail" />
            </Link>
            <div className="searchInfo">
              <h1>{video.title}</h1>
              <p>{video.user.channelName}</p>
              <p>{video.likes} likes</p>
            </div>
          </div>
        ))
      ) : (
        <p>No results found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default Search;
