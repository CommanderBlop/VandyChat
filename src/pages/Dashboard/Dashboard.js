import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import '../../global.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <img src="/john-doe.png" alt="John Doe" className="profile-pic"/>
        <h2>John Doe</h2>
        <p>Major: Computer Science</p>
        <p>Class: Sophomore</p>
      </div>
      
      <div className="match-section">
        <h3>Last Matched With</h3>
        <p>Name: Jane Smith</p>
        <p>Email: jane.smith@vandy.edu</p>
      </div>

      <div className="previous-matches">
        <h3>Previous Matches</h3>
        <ul>
          <li>Alice Johnson - alice.johnson@vandy.edu</li>
          <li>Bob Brown - bob.brown@vandy.edu</li>
          <li>Charlie Clark - charlie.clark@vandy.edu</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
