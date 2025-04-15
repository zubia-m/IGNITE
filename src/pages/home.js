import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import Footer from '../components/footer';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
        backgroundColor: '#F6EEE0', // Marshmallow
        color: '#362706', // Espresso
      }}
    >
      <div style={{ flex: '1' }}>
        {/* Hero Section */}
        <div
          style={{
            padding: '100px 20px 60px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#362706' }}>
            Welcome to UpHome
          </h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', color: '#362706' }}>
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
              backgroundColor: '#362706',
              color: '#F6EEE0',
              borderRadius: '5px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '500',
              transition: '0.3s',
            }}
          >
            🛠️ Renovation
          </Link>
          <Link
            to="/roi"
            style={{
              padding: '15px 30px',
              backgroundColor: '#362706',
              color: '#F6EEE0',
              borderRadius: '5px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '500',
              transition: '0.3s',
            }}
          >
            📊 ROI Prediction
          </Link>
          <Link
            to="/finance"
            style={{
              padding: '15px 30px',
              backgroundColor: '#362706',
              color: '#F6EEE0',
              borderRadius: '5px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '500',
              transition: '0.3s',
            }}
          >
            💰 Financing & Loans
          </Link>
        </div>

        {/* Mission Statement */}
        <div
          style={{
            padding: '0 20px 60px',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#362706' }}>Our Mission</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#362706' }}>
            At UpHome, our mission is to revolutionize how people make decisions about their homes.
            With AI-powered ROI insights, intelligent renovation suggestions, and accessible financing tools,
            we make property decisions easier, smarter, and more profitable.
          </p>
        </div>

        {/* Feature Highlights */}
        <div
          style={{
            backgroundColor: '#E9DFCF',
            padding: '60px 20px',
          }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', color: '#362706' }}>
            What We Offer
          </h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '30px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <div style={{ maxWidth: '300px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#362706' }}>🏡 ROI Prediction</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#362706' }}>
                Get real-time ROI insights and forecasted returns on any property.
                Make smarter investment decisions backed by data.
              </p>
            </div>
            <div style={{ maxWidth: '300px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#362706' }}>🔨 Renovation Planning</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#362706' }}>
                Use our intelligent tools to plan your renovations and increase your home’s value
                with clear cost estimates and improvement ROI.
              </p>
            </div>
            <div style={{ maxWidth: '300px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#362706' }}>💸 Financing & Loans</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#362706' }}>
                Explore financing options that fit your goals. Compare offers, calculate payments, and
                choose the best plan to move forward.
              </p>
            </div>
          </div>
        </div>

        {/* Final Call-to-Action */}
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#362706' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px', color: '#362706' }}>
            Sign up today and unlock smarter property decisions with UpHome.
          </p>
          <Link
            to="/signup"
            style={{
              padding: '12px 24px',
              backgroundColor: '#362706',
              color: '#F6EEE0',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: '500',
            }}
          >
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;