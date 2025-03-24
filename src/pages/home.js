import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Correct import path
import Footer from '../components/footer'; // Import the Footer component
import SearchBar from '../components/searchBar'; // Import the SearchBar component
import { Link } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);


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
        backgroundColor: '#000', // Background set to black
        color: '#D4AA04', // Default text color set to #D4AA04
        // backgroundImage: 'url("signInSignUpBackground.jpg")', // Background image added here
        // backgroundSize: 'cover', // Ensure the image covers the entire area
        // backgroundPosition: 'center', // Center the image
      }}
    >
      {/* Overlay to ensure text is readable */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

      {/* Search Bar Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          // backgroundColor: '#000', // Background set to black
        }}
      >
        <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#D4AA04' }}>
          Start Your Search Here
        </h1>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <SearchBar />
        </div>
      </div>

      {/* About Section */}
      <div
        style={{
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#000', // Background set to black
          color: '#D4AA04', // Text color set to #D4AA04
          padding: '40px 20px',
          textAlign: 'center',
          flex: '1',
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            backgroundImage: 'url("signInSignUpBackground.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '100px 20px',
            borderRadius: '10px',
            color: '#D4AA04', // Text color set to #D4AA04
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
        
          <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#D4AA04' }}>
             IGNITE - BAYT
          </h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', color: '#D4AA04' }}>
            Empowering homeowners and investors with AI-driven property valuation, renovation planning, and a trusted contractor marketplace.
          </p>
        </div>

        {/* Mission Statement */}
        <div style={{ margin: '60px 0' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#D4AA04' }}>Our Mission</h2>
          <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', color: '#D4AA04' }}>
            At Bayt, our mission is to revolutionize the way people make decisions about their properties. We combine cutting-edge AI technology with a user-friendly platform to provide accurate property valuations, personalized renovation plans, and access to a network of trusted contractors. Whether you're a homeowner or an investor, Ignite is your one-stop solution for all property-related needs.
          </p>
        </div>

        {/* Key Features */}
        <div
          style={{
            backgroundColor: '#000', // Background set to black
            padding: '40px 20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '36px', marginBottom: '40px', color: '#D4AA04' }}>Why Choose Ignite?</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '20px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {/* Feature 1 */}
            <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#D4AA04' }}>AI-Driven Property Valuation</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#D4AA04' }}>
                Get instant, accurate property valuations powered by advanced AI algorithms. Make informed decisions with confidence.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#D4AA04' }}>Renovation Planning</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#D4AA04' }}>
                Plan your renovations with ease. Our platform provides personalized recommendations and cost estimates tailored to your needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#D4AA04' }}>Trusted Contractor Marketplace</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#D4AA04' }}>
                Connect with verified contractors in your area. Read reviews, compare quotes, and choose the best professional for your project.
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div style={{ margin: '60px 0' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#D4AA04' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px', color: '#D4AA04' }}>
            Join thousands of satisfied users who trust Ignite for their property needs. Sign up today and take the first step toward smarter property decisions.
          </p>
          <Link
            to="/signup"
            style={{
              padding: '12px 24px',
              backgroundColor: '#D4AA04', // Button background color set to #D4AA04
              color: '#000', // Button text color set to black
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              transition: 'background-color 0.3s ease',
            }}
          >
            Sign Up Now
          </Link>
        </div>
        </div>
        

      </div>

      {/* Footer */}
      <Footer />
    </div>      
  );
  
};

export default Home;