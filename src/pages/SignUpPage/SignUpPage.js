import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./SignUpPage.css";
import "../../global.css";
import { registerUser } from "../../firebase.js";

const SignUpPage = () => {
  let navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    graduationYear: "",
    major: "",
    about: "",
    hobbies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const google_info = JSON.parse(localStorage.getItem("user"));
    const userinfo = {
      email: google_info.email,
      photoUrl: google_info.photoUrl,
      currentMatch: [],
      previousMatch: [],
      ...formData,
    };
    registerUser(google_info.uid, userinfo);
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h1 className="heading">Create Your Account</h1>
      <div className="signupBlock">
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="inputField"
            required
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="inputField"
            required
            onChange={handleChange}
          />
          <label htmlFor="graduationYear">Graduation year</label>
          <input
            type="text"
            name="graduationYear"
            placeholder="Graduation year"
            className="inputField"
            required
            onChange={handleChange}
          />
          <label htmlFor="major">Major</label>
          <input
            type="text"
            name="major"
            placeholder="Major"
            className="inputField"
            required
            onChange={handleChange}
          />
          <label htmlFor="about">One sentence about yourself</label>
          <input
            type="text"
            name="about"
            placeholder="One sentence about yourself"
            className="inputField"
            required
            onChange={handleChange}
          />
          <label htmlFor="hobbies">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            placeholder="Hobbies"
            className="inputField"
            required
            onChange={handleChange}
          />
          <button type="submit" className="global-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
