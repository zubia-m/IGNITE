import React, { useState, useEffect } from 'react';
import './home.css';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import Footer from '../components/footer'; // Make sure Footer is imported correctly
import SearchBar from '../components/searchBar';

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

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #F6EEE0, #B4A7D6)', // Gradient
        color: '#163D69', // Text color
        fontFamily: 'Inter, sans-serif', // <-- Better font
      }}
    >
      {/* Banner Image */}
      <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
        <img 
          src="/banner.jpeg" // <-- Save your house image as public/banner.jpeg
          alt="UpHome Banner" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      <div style={{ flex: '1' }}>
     {/* Hero Section */}
<div
  style={{
    padding: '80px 20px 60px',
    textAlign: 'center',
    color: '#163D69', // Default text color
  }}
>
  <h1 
    className="hero-title" 
    style={{ 
      fontSize: '48px', 
      fontWeight: 'bold', 
      color: '#163d69 !important' // <- UpHome text color changed here
    }}
  >
    Welcome to UpHome
  </h1>
  <p
    style={{
      fontSize: '20px',
      maxWidth: '800px',
      margin: '20px auto 0',
      lineHeight: '1.6',
    }}
  >
    Empowering homeowners and investors with AI-driven ROI prediction, personalized renovation plans,
    and financing tools.
  </p>
</div>
{/* Feature Buttons */}
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '60px',
  }}
>
  <Link
    to="/renovation"
    style={{
      padding: '15px 30px',
      backgroundColor: '#163d69',
      color: '#F6EEE0', // Light text color for contrast
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    }}
  >
    🛠️ Renovation
  </Link>
  <Link
    to="/roi"
    style={{
      padding: '15px 30px',
      backgroundColor: '#163d69',
      color: '#F6EEE0',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    }}
  >
    📊 ROI Predictions
  </Link>
  <Link
    to="/finance"
    style={{
      padding: '15px 30px',
      backgroundColor: '#163d69',
      color: '#F6EEE0',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    }}
  >
    💰 Financing & Loans
  </Link>
</div>
            

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;