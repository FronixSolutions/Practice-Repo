import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [userData, setUserData] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '', // Role will be set when user selects Doctor or Patient
  });

  // State to manage visibility of the role selection and form
  const [showRoleSelection, setShowRoleSelection] = useState(true);  // Role selection is immediately shown
  const [showSignupForm, setShowSignupForm] = useState(false);
  const navigate = useNavigate();

  // Handle the role selection (Doctor or Patient)
  const handleRoleChange = (selectedRole) => {
    setUserData((prevState) => ({
      ...prevState,
      role: selectedRole,
    }));
    setShowSignupForm(true); // Show the form after selecting the role
  };

  // Handle changes to form fields
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value, // Update the relevant field based on input
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6700/users', userData);
      alert('User registered successfully!');
      navigate('/login'); 
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error during signup');
    }
  };

  return (
    <div className="signup-page">
      {showRoleSelection && !showSignupForm ? (
        // Step 1: Show Role selection (Doctor or Patient)
        <div className="role-selection">
          <button className='button1' onClick={() => handleRoleChange('ROLE_DOCTOR')}>Signup as Doctor</button>
          <button className='button1' onClick={() => handleRoleChange('ROLE_PATIENT')}>Signup as Patient</button>
        </div>
      ) : (
        // Step 2: Show the Signup form once the role is selected
        <div>
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={userData.userName}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={userData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={userData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <button type="submit" className='button1'>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
