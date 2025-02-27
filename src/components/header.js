import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from "./hamburgerMenu"; // Import the HamburgerMenu component

const Header = ({ user, onSignOut }) => {
  const isSignedIn = !!user; // Determine if the user is signed in
  
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#000000', width: '100%', borderBottom: '1px solid #ddd' }}>
      
      {/* Left Side: Hamburger Menu, Logo, and Brand Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <HamburgerMenu isSignedIn={isSignedIn} />
        <img src="logoIgnite.jpg" alt="Logo" className="logo" style={{ width: '50px', height: '50px' }} />
        <span className="brand-name" style={{ fontSize: '24px', fontWeight: 'bold', color: '#D4AA04' }}>
  BAYT
</span>
      </div>

      {/* Right Side: Sign-In or Signed-In User */}
      <div className="nav">
        {user ? (
          // Display signed-in user and sign-out button
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <p style={{ margin: 0 }}>Signed in as: {user.email}</p>
            <button
              onClick={onSignOut}
              style={{
                padding: '10px 10px',
                backgroundColor: '#2d2624',
                color: '#D4AA04',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          // Display sign-in button if user is not signed in
          <Link
            to="/signin"
            style={{
              padding: '5px 10px',
              backgroundColor: '#2d2624',
              color: '#D4AA04',
              borderRadius: '5px',
              textDecoration: 'none',
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;