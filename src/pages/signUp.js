import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Ensure the path to firebase.js is correct

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle errors
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setError('Password must be at least 8 characters long, include a number, and a special character.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      navigate('/home'); // Redirect to the home page after successful registration
    } catch (error) {
      setError(error.message); // Show Firebase error message
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url('/signInsignUpBackground.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay for better readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      ></div>

      {/* Sign Up Form */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          width: '350px',
          textAlign: 'center',
          zIndex: 2,
          position: 'relative',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px' }}>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Name Input with Icon */}
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <FaUser
              style={{
                position: 'absolute',
                left: '29px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#777',
              }}
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '12px 12px 12px 35px',
                width: 'calc(100% - 35px)',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              required
            />
          </div>

          {/* Email Input with Icon */}
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <FaEnvelope
              style={{
                position: 'absolute',
                left: '29px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#777',
              }}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '12px 12px 12px 35px',
                width: 'calc(100% - 35px)',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              required
            />
          </div>

          {/* Password Input with Icon */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <FaLock
              style={{
                position: 'absolute',
                left: '29px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#777',
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '12px 12px 12px 35px',
                width: 'calc(100% - 35px)',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: '15px', color: '#555', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link
            to="/signin"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Add some animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;