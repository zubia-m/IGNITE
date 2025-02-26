import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from "./hamburgerMenu";

const Header = ({ user, onSignOut }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-4">
        <HamburgerMenu />
        <img src="logoIgnite.jpg" alt="Logo" className="logo" />
        <span className="brand-name">BAYT</span>
      </div>

      {/* Navigation */}
      <div className="nav">
        {user ? (
          // Display signed-in user and sign-out button
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <p style={{ margin: 0 }}>Signed in as: {user.email}</p>
            <button
              onClick={onSignOut}
              style={{
                padding: '5px 10px',
                backgroundColor: '#ff4444',
                color: '#fff',
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
          <Link to="/signin" className="sign-in-button">Sign In</Link>
        )}
      </div>
    </header>
  );
};

export default Header;