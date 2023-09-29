// src/SignUpPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';
import '../../global.css';

const SignUpPage = () => {
  return (
    <div className="container">
      <h1 className="heading">Create Your Account</h1>
      <div className="signupBlock">
        <form>
          <input type="text" placeholder="Full Name" className="inputField" required />
          <input type="email" placeholder="Email" className="inputField" required />
          <input type="password" placeholder="Password" className="inputField" required />
          <button type="submit" className="global-button">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className="global-link">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
