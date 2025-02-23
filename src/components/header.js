import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src="logoIgnite.jpg" alt="Logo" className="logo" />
        <span className="brand-name">IGNITE</span>
      </div>
      <div className="nav">
        <a href="https://realtors-website.com" className="realtor-link">For Realtors/Contractors</a>
        <Link to="/signin" className="sign-in-button">Sign In</Link>
      </div>
    </header>
  );
};

export default Header;