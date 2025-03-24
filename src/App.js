import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth"; // ✅ Import onAuthStateChanged
import { auth } from "./firebase"; // Import Firebase auth
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import About from "./components/about";
import Renovation from "./pages/renovation";
import SearchBar from "./components/searchBar";
import Layout from "./components/layout"; // ✅ Import Layout
import Finance from "./pages/finance";
import RoiAnalysis from "./pages/roianalysis";
const App = () => {
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser || null);
    });

    return () => unsubscribe(); // Cleanup observer
  }, []);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Ensure user state updates after sign-out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Router>
      <Layout user={user} setUser={setUser} onSignOut={handleSignOut}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchBar" element={<SearchBar />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/renovation" element={<Renovation />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/roi-analysis" element={<RoiAnalysis />} />
                  </Routes>
      </Layout>
    </Router>
  );
};

export default App;