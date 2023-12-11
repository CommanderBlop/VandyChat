import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "../../global.css";
import { getUserInfo } from "../../firebase";

const Dashboard = () => {
  const [uid, setUid] = useState();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo(uid);
      setUserData(data);
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    setUid(JSON.parse(localStorage.getItem("user")).uid);
  }, []);

  return (
    userData && (
      <div className="dashboard-container">
        <div className="profile-section">
          {/* <img src="/john-doe.png" alt="John Doe" className="profile-pic"/> */}
          <h2>
            {userData.firstName} {userData.lastName}
          </h2>
          <p>Major: {userData.major}</p>
          <p>Graduation Year: {userData.graduationYear}</p>
        </div>

        <div className="match-section">
          <h3>
            {userData.currentMatch.length > 1
              ? "Multiple Matches"
              : "Last Matched With"}
          </h3>
          {userData.currentMatch.length > 0 ? (
            userData.currentMatch.map((match, index) => (
              <div key={index} className="match-info">
                <p>
                  Name: {match.firstName} {match.lastName}
                </p>
                <p>Email: {match.email}</p>
              </div>
            ))
          ) : (
            <p>No matches found.</p>
          )}
        </div>

        <div className="previous-matches">
          <h3>Previous Matches</h3>
          {userData.previousMatch && userData.previousMatch.length > 0 ? (
            <ul>
              {userData.previousMatch.map((match, index) => (
                <li key={index}>
                  {match.firstName} {match.lastName} - {match.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No matches found.</p>
          )}
        </div>
      </div>
    )
  );
};

export default Dashboard;
