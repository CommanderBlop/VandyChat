// src/LoginPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import "../../global.css";
import { signInWithGoogle, checkUserExistence } from "../../firebase.js";

function LoginPage() {
  let navigate = useNavigate();

  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    const user = await signInWithGoogle();
    if (user) {
      const userExist = await checkUserExistence(user.email);
      const saveInfo = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(saveInfo));

      if (userExist) {
        navigate("/dashboard");
      } else {
        navigate("/signup");
      }
    } else {
      console.log("Google login failed");
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="loginHeading">Login to VandyChat</h1>
      <form>
        <button className= "loginButton"onClick={(event) => handleGoogleLogin(event)}>
          Login with Google
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
