// src/LoginPage.js

import React from 'react';
// import { Link } from 'react-router-dom';
import './LoginPage.css';
import '../../global.css';
import { signInWithGoogle } from '../../firebase.js';

function LoginPage() {
  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("Logged in as", user.displayName);
      // You can now set the user info in a context or a state or redirect as required
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="loginHeading">Login to VandyChat</h1>
      <form>
        {/* <input type="email" placeholder="Email" className="loginInput" required />
        <input type="password" placeholder="Password" className="loginInput" required />
        <button type="submit" className="global-button">Login</button> */}
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </form>
      {/* <p>Don’t have an account? <Link to="/signup" className="global-link">Sign Up</Link></p> */}
    </div>
  );
};

export default LoginPage;
