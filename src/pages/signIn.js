import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import './signIn.css';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const isValidPassword = (password) => {
    return /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };

  return (
    <div className="signIn-container">
      {/* Overlay */}
      <div className="signIn-overlay"></div>

      {/* Sign In Form */}
      <div className="signIn-form">
        <h2>Sign In</h2>
        {error && <p className="signIn-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="signIn-input">
            <FaEnvelope className="signIn-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="signIn-input">
            <FaLock className="signIn-icon" />
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Password Validation Message */}
          <p className={`signIn-password ${isValidPassword(password) ? 'valid' : 'invalid'}`}>
            Password must be at least 8 characters, include a number, and a special character.
          </p>

          <button type="submit" className="signIn-button">
            Sign In
          </button>
        </form>

        <p className="signIn-link">
          Don't have an account?{' '}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
