import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import About from './components/about'; // Import the About component
import Renovation from "./pages/renovation";
import SearchBar from './components/searchBar'; // Import the About component
import Header from './components/header';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/header" element={<Header />} /> 
        <Route path="/searchBar" element={<SearchBar />} /> 
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} /> {/* Add route for About Page */}
        <Route path="/renovation" element={<Renovation />} />

      </Routes>
    </Router>
  );
};

export default App;