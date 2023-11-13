import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [selectedScore, setSelectedScore] = useState(null);
  const navigate = useNavigate();

  const handleScoreSelect = (score) => {
    setSelectedScore(score);
  };

  const handleSubmit = () => {
    // You can use a simple window.alert for the popup message
    alert('Thank you for your submission!');
    
    // After the user clicks "OK" on the alert, they will be redirected to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Feedback Hub</h1>
      <div className="score-bar">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            className={`score-button ${selectedScore === number ? 'selected' : ''}`}
            onClick={() => handleScoreSelect(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default FeedbackPage;
