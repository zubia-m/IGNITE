import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle} from 'react-icons/fa';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import './signUp.css';
import pattern from '../assets/pattern.svg';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isCheckingVerification, setIsCheckingVerification] = useState(false);
  const [verificationCheckCount, setVerificationCheckCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/home';

    // Effect to check verification status in real-time
    useEffect(() => {
      if (isVerificationSent) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            user.reload().then(() => {
              if (user.emailVerified) {
                // Email verified - navigate to previous page or home
                navigate(from, { replace: true });
              } else {
                // Not verified yet - check if we should refresh token
                setIsCheckingVerification(true);
              }
            });
          }
        });
  
        return () => unsubscribe();
      }
    }, [isVerificationSent, navigate, from]);

  const isValidPassword = (password) => {
    return /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      setError('Password must be at least 8 characters, include a number, and a special character.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      
      // Send email verification
      await sendEmailVerification(userCredential.user);
      console.log("Verification email sent");
      setIsVerificationSent(true);
      
      // You might not want to navigate immediately since user needs to verify
      // navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsVerificationSent(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-form">
        <h2 className="auth-title">Sign Up</h2>
        {error && <p className="error-text">This Email Already in Use!</p>}
        
        {isVerificationSent ? (
          <div className="verification-message">
            <div className="verification-header">
              <FaCheckCircle className="verification-icon" />
              <h3>Verification Email Sent!</h3>
            </div>
            <p>We've sent a verification email to <strong>{email}</strong>.</p>
            <p>Please check your inbox and click the verification link.</p>
            <p>You'll be automatically redirected once verified.</p>
            
            <div className="verification-status">
              {isCheckingVerification && (
                <div className="verification-loading">
                  <div className="spinner"></div>
                  <span>Checking verification status...</span>
                </div>
              )}
            </div>

            <div className="verification-actions">
              <button 
                className="auth-button secondary"
                onClick={handleSignOut}
              >
                Use Different Email
              </button>
              <button 
                className="auth-button resend"
                onClick={async () => {
                  try {
                    await sendEmailVerification(auth.currentUser);
                    alert('Verification email resent!');
                  } catch (error) {
                    setError(error.message);
                  }
                }}
              >
                Resend Verification Email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button> */}
            </div>
            <p className={`password-hint ${isValidPassword(password) ? 'valid' : 'invalid'}`}>
              Password must be at least 8 characters, include a number, and a special character.
            </p>
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
        )}
        <p className="auth-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;