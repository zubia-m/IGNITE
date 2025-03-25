import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  // Password validation function
  const isValidPassword = (password) => {
    return /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
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
      {/* Overlay */}
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

      {/* Sign In Form */}
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
        <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px' }}>Sign In</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Email Input */}
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <FaEnvelope style={{ position: 'absolute', left: '28px', top: '50%', transform: 'translateY(-50%)', color: '#777' }} />
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

          {/* Password Input with Validation */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <FaLock style={{ position: 'absolute', left: '28px', top: '50%', transform: 'translateY(-50%)', color: '#777' }} />
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

          {/* Password Validation Message */}
          <p style={{ fontSize: '12px', color: isValidPassword(password) ? 'green' : 'red', marginBottom: '15px' }}>
            Password must be at least 8 characters, include a number, and a special character.
          </p>

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
            Sign In
          </button>
        </form>

        <p style={{ marginTop: '15px', color: '#555', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s ease' }}>
            Sign Up
          </Link>
        </p>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default SignIn;