import React, { useState } from "react";
import "./signup.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify

const Signup = () => {
  const [uploadImageUrl, setUploadImageUrl] = useState(
    "https://wallpapercave.com/avt/UnknownUser.png?v=4"
  );
  const [signupField, setSignupField] = useState({
    channelName: "",
    userName: "",
    password: "",
    aboutYourChannel: "",
    profilePic: uploadImageUrl,
  });

  const navigate = useNavigate();

  const handleOnchangeInput = (event, name) => {
    setSignupField({
      ...signupField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "youtube-clone");

    try {
      // Cloud name = dy6dkn2m9
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dy6dkn2m9/image/upload",
        data
      );
      console.log(response);
      const imageUrl = response.data.url;
      setUploadImageUrl(imageUrl);

      setSignupField({
        ...signupField,
        profilePic: imageUrl,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Signup API integration
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Destructure signup field for cleaner access
    const { channelName, userName, password, aboutYourChannel, profilePic } = signupField;

    // Check if all required fields are filled
    if (!channelName || !userName || !password || !aboutYourChannel) {
      toast.error("All fields are required.", { position: "top-right" });
      return;
    }

    try {
      // API call to signup
      const response = await axios.post("http://localhost:2100/auth/signup", {
        channelName,
        userName,
        password,
        about: aboutYourChannel,
        profilePic,
      });

      if (response.status === 201) {
        toast.success("Signup successful!", { position: "top-right" });

        // Optionally, save token if returned
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Redirect to home after successful signup
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.data.message || "Signup failed.", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
      });
      console.error(err);
    }
  };

  console.log(signupField);

  return (
    <div className="signup">
      <div className="signupCart">
        <div className="signupTitle">
          <YouTubeIcon
            sx={{ fontSize: "54px", color: "red" }}
            className="loginYoutubeIcon"
          />
          SignUp
        </div>
        <div className="loginCredential">
          <div className="usernameLogin">
            <input
              type="text"
              placeholder="Channel Name"
              value={signupField.channelName}
              onChange={(e) => handleOnchangeInput(e, "channelName")}
              className="usernameLoginInput"
            />
          </div>

          <div className="usernameLogin">
            <input
              type="text"
              placeholder="User Name"
              value={signupField.userName}
              onChange={(e) => handleOnchangeInput(e, "userName")}
              className="usernameLoginInput"
            />
          </div>

          <div className="usernameLogin">
            <input
              type="password"
              placeholder="Password"
              value={signupField.password}
              onChange={(e) => handleOnchangeInput(e, "password")}
              className="usernameLoginInput"
            />
          </div>

          <div className="usernameLogin">
            <input
              type="text"
              placeholder="About Your Channel"
              value={signupField.aboutYourChannel}
              onChange={(e) => handleOnchangeInput(e, "aboutYourChannel")}
              className="usernameLoginInput"
            />
          </div>

          <div className="imageUploadSignup">
            <input type="file" onChange={(e) => uploadImage(e)} />
            <div className="imageUploadSignupDiv">
              <img
                src={uploadImageUrl}
                alt="Profile Preview"
                className="imageDefaulSigup"
              />
            </div>
          </div>

          <div className="LoginBtn">
            <div className="login_btn" onClick={handleSignUp}>
              SignUp
            </div>
            <Link to={"/"} className="login_btn">
              Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
