import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      alert('Password must be at least 8 characters long, include a number, and a special character.');
      return;
    }
    alert(`Signing up with name: ${name}, email: ${email}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")', // Background image
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
          zIndex: 1,
        }}
      ></div>

      {/* Sign Up Form */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          width: '350px',
          textAlign: 'center',
          zIndex: 2,
          position: 'relative',
          animation: 'fadeIn 0.5s ease-in-out', // Add animation
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px' }}>Sign Up</h2>
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
                padding: '12px 12px 12px 35px', // Padding for the icon
                width: 'calc(100% - 35px)', // Adjust width to account for padding
                boxSizing: 'border-box', // Include padding in the width calculation
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
                padding: '12px 12px 12px 35px', // Padding for the icon
                width: 'calc(100% - 35px)', // Adjust width to account for padding
                boxSizing: 'border-box', // Include padding in the width calculation
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
                padding: '12px 12px 12px 35px', // Padding for the icon
                width: 'calc(100% - 35px)', // Adjust width to account for padding
                boxSizing: 'border-box', // Include padding in the width calculation
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