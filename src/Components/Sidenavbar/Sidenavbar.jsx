import React from "react";
import "./sidenavbar.css";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Link } from "react-router-dom";

const Sidenavbar = ({sideNavbar, userData}) => {
  return (
    <div className={sideNavbar?"home-sideNavbar" : "home-sideNavbarHide"}>
      <div className="home_sideNavbarTop">
        <div className="home_sideNavbarTopOptions">
          <HomeIcon />
          <div className="home_sideNavbarTopOptionsTitle">Home</div>
        </div>
        <div className="home_sideNavbarTopOptions">
          <VideocamIcon />
          <div className="home_sideNavbarTopOptionsTitle">Shorts</div>
        </div>
        <div className="home_sideNavbarTopOptions">
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionsTitle">Subscription</div>
        </div>
      </div>

      <div className="home-sideNavbarMiddle">
        <div className="home_sideNavbarTopOptions">
          <div className="home_sideNavbarTopOptionsTitle">You</div>
          <ChevronRightIcon />
        </div>

        <div className="home_sideNavbarTopOptions">
          <RecentActorsIcon />
          <Link to={`/user/${userData?._id}`} className="home_sideNavbarTopOptionsTitle">Your Channel</Link>
        </div>

        <div className="home_sideNavbarTopOptions">
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionsTitle">History</div>
        </div>

        <div className="home_sideNavbarTopOptions">
          <PlaylistPlayIcon />
          <div className="home_sideNavbarTopOptionsTitle">PlayLists</div>
        </div>

        <div className="home_sideNavbarTopOptions">
          <WatchLaterIcon />
          <div className="home_sideNavbarTopOptionsTitle">Watch Later</div>
        </div>

        <div className="home_sideNavbarTopOptions">
          <ThumbUpIcon />
          <div className="home_sideNavbarTopOptionsTitle">Liked Videos</div>
        </div>

        <div className="home_sideNavbarTopOptions">
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionsTitle">Your Clips</div>
        </div>
      </div>

      <div className="home-sideNavbarLast">
        <div className="home_sideNavbarTopOptions">
          <div className="home_sideNavbarTopOptionsTitleHeader">
            Subscription
          </div>
        </div>

        <div className="home_sideNavbarTopOptions">
         <img className="sub_logo" src="https://wallpapercave.com/avt/UnknownUser.png?v=4" alt="subscriprion_logo" />
          <div className="home_sideNavbarTopOptionsTitle">Aaj Tak</div>
        </div>
        <div className="home_sideNavbarTopOptions">
         <img className="sub_logo" src="https://wallpapercave.com/avt/UnknownUser.png?v=4" alt="subscriprion_logo" />
          <div className="home_sideNavbarTopOptionsTitle">Aaj Tak</div>
        </div>
        <div className="home_sideNavbarTopOptions">
         <img className="sub_logo" src="https://wallpapercave.com/avt/UnknownUser.png?v=4" alt="subscriprion_logo" />
          <div className="home_sideNavbarTopOptionsTitle">Aaj Tak</div>
        </div>
      </div>
    </div>
  );
};

export default Sidenavbar;
