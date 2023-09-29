// src/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import '../../global.css';

const HomePage = () => {
  return (
    <div className="container">
        <div className="textBlock">
        <h1 className="heading">Welcome to VandyChat!</h1>
        <p className="paragraph">
        Connect with fellow students and expand your network.
        Sign up now to get started!
        </p>
        <p className="paragraph">
          VandyChat is a platform designed to facilitate communication and collaboration 
          between Vanderbilt students from all majors and classes. By signing up, you will 
          be randomly paired with another Vanderbilt student every other week.
        </p>
        <p className="last-paragraph">
          Use this opportunity to grab a coffee and get to know people outside of your regular
          social network, broaden your horizon, and learn about things going on outside 
          of your comfort zone.
        </p> 
      <Link to="/login" className="global-button">Get Started</Link>
      </div>
    </div>
  );
};

export default HomePage;
