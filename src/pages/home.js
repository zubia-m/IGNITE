// home.js (Home Page Component)
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Correct import path
import Footer from '../components/footer';
import Header from '../components/header';
import SearchBar from './searchBar';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/signin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="landing-page">
      <Header user={user} onSignOut={handleSignOut} />

      <div className="overlay"></div>
      <div className="content-container">
        {user && (
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <p style={{ margin: 0 }}>Signed in as: {user.email}</p>
            <button
              onClick={handleSignOut}
              style={{
                padding: '5px 10px',
                backgroundColor: '#ff4444',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        )}

        <div className="landing-text" style={{ animation: 'fadeIn 1s ease-in-out' }}>
          Welcome!
          <br />Helping homeowners & investors make informed decisions<br />
          AI-driven property valuation, renovation planning, and contractor marketplace
        </div>

        <SearchBar />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
