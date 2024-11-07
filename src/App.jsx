import { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home/Home";
import EditVideo from "./Components/Video Edit/VideoEdit";

// Lazy load the components
const HomePage = lazy(() => import("./Pages/Home/Home"));
const Video = lazy(() => import("./Pages/video/video"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const VideoUpload = lazy(() => import("./Pages/Video Upload/VideoUpload"));
const Signup = lazy(() => import("./Pages/Signup/Signup"));
const Search = lazy(() => import("./Components/Search/Search"));

function App() {
  const [sideNavbar, setSideNavbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [info, setInfo] = useState([]);
  
  useEffect(() => {
    getAllVideos();
    getUserInfo();
  }, []);

  async function getAllVideos() {
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
        setVideos(data.videos);
      } else {
        const error = await response.json();
        console.error("Error fetching videos:", error.message);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  async function getUserInfo() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:2100/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInfo(data.user);
      } else {
        const error = await response.json();
        console.error("Error fetching videos:", error.message);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  return (
     <>
      <Navbar setSideNavbarFunc={setSideNavbar} setSearchTerm={setSearchTerm} sideNavbar={sideNavbar} userData = {info} />
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home sideNavbar={sideNavbar} videos={videos} userData = {info}/>} />
          <Route path="/watch/:id" element={<Video userData={info}/>} />
          <Route path="/user/:userId" element={<Profile sideNavbar={sideNavbar} />} />
          <Route path="/:id/upload" element={<VideoUpload />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} videos={videos} />} />
          <Route path="/edit/:id" element={<EditVideo />} />
        </Routes>
      </Suspense>
     </>
  );
}

export default App;
