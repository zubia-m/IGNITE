import React, { useState, useEffect } from 'react';
import './home.css';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase'; // Ensure this imports Firebase auth correctly
import Footer from '../components/footer';

const Home = () => {
  const [user, setUser] = useState(null); // Tracks if a user is signed in (null = signed out)
  const navigate = useNavigate();

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Sets user object if signed in, null if signed out
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleClick = () => {
    if (user) { // If user exists (signed in)
      alert('You are already signed in!');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="home-container">
        <div className="home-header-wave"></div>
      <div className="home-main-content">
        {/* Hero Section */}
        <div className="home-hero">
          <h1>Welcome to UpHome!</h1>
          <p>
            Empowering homeowners and investors with AI-driven ROI prediction, 
            personalized renovation plans, and financing tools.
          </p>
        </div>


        {/* changes made to  Feature Buttons */}
        <div className="home-buttons-info">  {/* added this line  */}
        <p>Click a feature below to discover personalized insights, planning tools, and financing options.</p>
        </div>
        <div className="home-buttons">
        <Link to="/renovation" className="home-button-card" title="Plan renovations smartly">
        🛠️
         <span>Renovation</span>
        </Link>
       <Link to="/roiprediction" className="home-button-card" title="Predict Return on Investment">
       📊
       <span>ROI Prediction</span>
       </Link>
      <Link to="/finance" className="home-button-card" title="Explore loan options">
      💰
      <span>Financing & Loans</span>
      </Link>
      </div>


        {/* Mission Statement */}
        <div className="home-mission">
          <h2>Our Mission</h2>
          <p>
            At UpHome, our mission is to revolutionize how people make decisions about their homes. 
            With AI-powered ROI insights, intelligent renovation suggestions, and accessible financing tools, 
            we make property decisions easier, smarter, and more profitable.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="home-features">
          <h2>What We Offer</h2>
          <div className="home-feature-cards">
            <div className="home-feature-card">
              <h3>🏡 ROI Prediction</h3>
              <p>
                Get real-time ROI insights and forecasted returns on any property. 
                Make smarter investment decisions backed by data.
              </p>
            </div>
            <div className="home-feature-card">
              <h3>🔨 Renovation Planning</h3>
              <p>
                Use our intelligent tools to plan your renovations and increase your home’s value 
                with clear cost estimates and improvement ROI.
              </p>
            </div>
            <div className="home-feature-card">
              <h3>💸 Financing & Loans</h3>
              <p>
                Explore financing options that fit your goals. Compare offers, calculate payments, 
                and choose the best plan to move forward.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section (Only shows if user is NOT signed in) */}
        {!user && (
          <div className="home-cta">
            <h2>Ready to Get Started?</h2>
            <p>Sign up today and unlock smarter property decisions with UpHome.</p>
            <button 
              onClick={handleClick}
              className="home-signup-button"
            >
              Sign Up Now!
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;