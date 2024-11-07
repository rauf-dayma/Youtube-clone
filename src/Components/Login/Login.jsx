import React, { useState } from "react";
import "./login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = ({ setLoginFunc }) => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigate to different pages

  // Handle input change for both username and password fields
  const handleOnchangeInput = (event, name) => {
    setLoginField({
      ...loginField, [name]: event.target.value
    });
  };

  // Handle login logic and API call
  const handleLogin = async (e) => {
    e.preventDefault();
    const { userName, password } = loginField;
    
    // Validate if username and password are filled
    if (!userName || !password) {
      toast.error("Username and password are required.", {
        position: "top-right",
      });
      return;
    }
  
    try {
      // Making a POST request to login
      const response = await fetch("http://localhost:2100/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginField),
      });
  
      const data = await response.json(); // Parse JSON response
  
      if (response.ok) {
        toast.success("Login successful!", {
          position: "top-right",
        });
        
        // Save JWT token and navigate to home page
        localStorage.setItem("token", data.token);
        setLoginFunc();  // Close login modal

        setTimeout(() => {
          navigate("/");  // Redirect to home page after successful login
        }, 1000);
      } else {
        toast.error(data.message || "Login failed. Please try again.", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="login">
      <div className="loginCart">
        <div className="loginTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} className="loginYoutubeIcon" />
          Login
        </div>

        <div className="loginCredential">
          {/* Username Input */}
          <div className="usernameLogin">
            <input
              type="text"
              placeholder="User Name"
              value={loginField.userName}
              onChange={(e) => handleOnchangeInput(e, "userName")}
              className="usernameLoginInput"
            />
          </div>

          {/* Password Input */}
          <div className="usernameLogin">
            <input
              type="password"
              placeholder="Password"
              value={loginField.password}
              onChange={(e) => handleOnchangeInput(e, "password")}
              className="usernameLoginInput"
            />
          </div>

          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}

          {/* Login buttons */}
          <div className="LoginBtn">
            <div className="login_btn" onClick={handleLogin}>Login</div>
            <Link to="/signup" onClick={() => setLoginFunc()} className="login_btn">Sign up</Link>
            <div className="login_btn" onClick={() => setLoginFunc()}>Cancel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
