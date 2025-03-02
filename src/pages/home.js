import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Correct import path
import Footer from '../components/footer'; // Import the Footer component
import SearchBar from '../components/searchBar'; // Import the SearchBar component

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
    <div className="landing-page">
      {/* Search Bar */}
      <SearchBar />

      {/* Footer */}
      <Footer />
    </div>      
  );
};

export default Home;