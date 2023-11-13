import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard'); // Assuming you have a route set up for the dashboard
  };

  return (
    <div className="confirmation-container">
      <h1>Thank you for signing up!</h1>
      <p>Your registration is now complete. You will receive your first pairing via email.</p>
      <button onClick={goToDashboard}>Go to Dashboard</button>
    </div>
  );
};

export default ConfirmationPage;
