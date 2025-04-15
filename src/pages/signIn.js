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

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.formContainer}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '20px', zIndex: '100' }}>
  Sign In
</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, color: 'black' }}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, color: 'black' }}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Sign In</button>
        </form>

        <p style={{ color: 'black' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#007bff' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

// ✅ Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url('/signInsignUpBackground.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    width: '350px',
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333 !important', // Dark color to make it visible
    zIndex: 3, // Ensure heading is above overlay and other elements
    marginBottom: '20px', // Add margin to create spacing
    position: 'relative', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: '15px',
  },
  icon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#777',
  },
  input: {
    padding: '12px 12px 12px 35px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default SignIn;