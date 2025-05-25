import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth"; 
import { auth } from "./firebase"; 
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import About from "./components/about";
import Renovation from "./pages/renovation";
import SearchBar from "./components/searchBar";
import Layout from "./components/layout"; 
import Finance from "./pages/finance";
import Roiprediction from "./pages/roiprediction";
import ProfilePage from './pages/profilePage';
// import ContractorPage from "./pages/contractorPage";
import ResultsTabs from "./components/resultsTab";
import Wishlist from './components/wishlist';

const App = () => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser || null);
    });

    return () => unsubscribe(); 
  }, []);


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); 
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>

    <Router>
    <Layout
          user={user}
          setUser={setUser}
          onSignOut={handleSignOut}
          wishlist={wishlist}
          setWishlist={setWishlist}
        >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchBar" element={<SearchBar />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/renovation" element={<Renovation />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/roiPrediction" element={<Roiprediction />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/contractors" element={<ContractorPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Layout>
    </Router>
    </div>

  );
};

export default App;