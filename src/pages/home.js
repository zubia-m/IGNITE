import React, { useState, useEffect } from 'react';
import './home.css';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase'; // Correct import path
import Footer from '../components/footer'; // Import the Footer component
import SearchBar from '../components/searchBar'; // Import the SearchBar component

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
    navigate('/signup');
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleAddressSelect = (address) => {
    console.log('Selected Address:', address);
    // Add additional logic here to handle the selected address
  };

  return (
    <div className="home">
      <div className="overlay">
        {/* Search Bar Section */}
        <div className="search-section">
          <h1>Start Your Search Here</h1>
          <div className="search-bar-container">
            <SearchBar />
          </div>
        </div>

        {/* About Section */}
        <div className="about-section">
          <div className="hero">
            <h1>IGNITE - UpHome</h1>
            <p>
              {/* Empowering homeowners and investors with AI-driven property valuation, renovation planning,
              and a trusted contractor marketplace. */}
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              At UpHome, our mission is to revolutionize the way people make decisions about their properties.
              We combine cutting-edge AI technology with a user-friendly platform to provide accurate
              property valuations, personalized renovation plans, and access to a network of trusted contractors.
            </p>
          </div>

          {/* Key Features */}
          <div className="features">
            <h2>Why Choose Ignite?</h2>
            <div className="features-container">
              <div className="feature">
                <h3>AI-Driven Property Valuation</h3>
                <p>
                  Get instant, accurate property valuations powered by advanced AI algorithms.
                  Make informed decisions with confidence.
                </p>
              </div>

              <div className="feature">
                <h3>Renovation Planning</h3>
                <p>
                  Plan your renovations with ease. Our platform provides personalized recommendations
                  and cost estimates tailored to your needs.
                </p>
              </div>

              <div className="feature">
                <h3>Trusted Contractor Marketplace</h3>
                <p>
                  Connect with verified contractors in your area. Read reviews, compare quotes,
                  and choose the best professional for your project.
                </p>
              </div>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="cta">
            <h2>Ready to Get Started?</h2>
            <p>
              Join thousands of satisfied users who trust Ignite for their property needs.
              Sign up today and take the first step toward smarter property decisions.
            </p>
            <button 
      className={`cta-button ${isHovered ? 'hover' : ''}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      onClick={handleButtonClick}
    >
      Sign Up Now!
    </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
