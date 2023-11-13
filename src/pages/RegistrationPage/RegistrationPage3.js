import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPage.css';
import '../../global.css';

function RegistrationPage() {
  const [major, setMajor] = useState('');
  const [majorsList, setMajorsList] = useState([]);

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };

  const handleAddMajor = () => {
    if (major) {
      setMajorsList([...majorsList, major]);
      setMajor(''); // Clear the input after adding
    }
  };

  const handleSubmit = () => {
    // Submit the list of majors or navigate to the next step
    console.log(majorsList);
    // You would typically handle the navigation to the next step of registration here
  };

  return (
    <div className="registration-page">
      <h1>Tell us a few things about yourself...</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="major">Which year do you plan to graduate?</label>
        <input
          type="text"
          id="major"
          name="major"
          value={major}
          onChange={handleMajorChange}
        />
        {/* <button type="button" onClick={handleAddMajor}>
          Add More Majors
        </button> */}
        {majorsList.length > 0 && (
          <ul>
            {majorsList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </form>
      <Link to="/confirmation" className="global-button">Next</Link>
    </div>
  );
}

export default RegistrationPage;
