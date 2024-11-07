import React, { useState } from "react";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, Link } from "react-router-dom";
import Login from "./Login/Login";
import { toast } from "react-toastify";

const Navbar = ({ setSideNavbarFunc, sideNavbar, setSearchTerm, userData }) => {
  const navigate = useNavigate();
  const [userPic, setuserPic] = useState(
    "https://wallpapercave.com/avt/UnknownUser.png?v=4"
  );
  

  const [navbarModel, setNavbarModel] = useState(false);
  const [login, setLogin] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Track search input value

  // Handle input change and update inputValue
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Trigger the search functionality
  const handleSearchSubmit = () => {
    if (inputValue.trim()) {
      setSearchTerm(inputValue); // Pass the search term to the parent (App)
      navigate("/search"); // Navigate to the search page
    }
  };

  const setLoginFunc = () => {
    setLogin(false);
  };

  const onClickPopUpOption = (button) => {
    if (button === "login") {
      setNavbarModel(false);
      setLogin(true);
    } else {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const handleProfileClick = () => {
   if(userData ){
    navigate(`/user/${userData?._id}`);
   }else{
    toast.error("please login.", {
      position: "top-right",
    });
   }
    setNavbarModel(false);
  };

  const handleImgeClick = () => {
    setNavbarModel((prev) => !prev);
  };

  const handlesideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  return (
    <div className="navBar">
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={handlesideNavbarFunc}>
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <div className="navbar_youtubeImg" onClick={()=> navigate("/")}>
          <YouTubeIcon
            className="navbar_youtube_image"
            sx={{ fontSize: "34px" }}
          />
          <div className="navbar_UtubeTitle">
            <p>YouTube</p>
          </div>
        </div>
      </div>
      <div className="navbar-middle">
        <div className="navbar-searchBox">
          <input
            type="text"
            placeholder="Search"
            className="navbar_searchboxInput"
            value={inputValue}
            onChange={handleInputChange} // Handle the input change
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearchSubmit(); // Trigger search on "Enter"
            }}
          />
          <div className="serchIconBox" onClick={handleSearchSubmit}>
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
          </div>
        </div>
        <div className="navbar_mic">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>
      <div className="navbar-right">
        <Link to={"/123/upload"}>
          <VideoCallIcon
            sx={{ color: "white", fontSize: "30px", cursor: "pointer" }}
          />
        </Link>

        <NotificationsIcon
          className="navbar_right_logo"
          sx={{ color: "white", fontSize: "30px", cursor: "pointer" }}
        />
        <img
          onClick={handleImgeClick}
          className="navbar_right_logo"
          src={userData.profilePic}
          alt="logo"
        />

        {navbarModel && (
          <div className="navbar_model">
            <div className="navbar_model_option" onClick={handleProfileClick}>
              Profile
            </div>
            <div
              className="navbar_model_option"
              onClick={() => onClickPopUpOption("login")}
            >
              Login
            </div>
            <div
              className="navbar_model_option"
              onClick={() => onClickPopUpOption("logout")}
            >
              Logout
            </div>
          </div>
        )}
      </div>
      {login && <Login setLoginFunc={setLoginFunc} />}
    </div>
  );
};

export default Navbar;
