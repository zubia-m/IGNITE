import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Correct import path
import Header from '../components/header'; // Import the Header component
import Footer from '../components/footer'; // Import the Footer component
import SearchBar from '../components/searchBar'; // Import the SearchBar component

const Home = () => {
  const [user, setUser] = useState(null); // State to store the signed-in user
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);


  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the signed-in user
      } else {
        setUser(null); // Clear the user state if not signed in
      }
    });

    return () => unsubscribe(); // Cleanup the observer
  }, []);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to the home page after signing out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <Header user={user} onSignOut={handleSignOut} />

      {/* Content Container */}
      <div className="content-container">
        {/* Text (Conditionally Rendered) */}
        {showText && (
          <div className="landing-text">
            Helping homeowners & investors make informed decisions<br />
            & <br />
          AI-driven property valuation, renovation planning, and contractor marketplace
          </div>

        )}

      {/* Search Bar */}
      <SearchBar />

      {/* Footer */}
      <Footer />
    </div> 
    </div>
     
  );
  
};

export default Home;