import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react"; // Import icons
import HamburgerMenu from "./hamburgerMenu"; // Import the HamburgerMenu component
import useOutsideClick from './useOutsideClick'; // or wherever you put the hook
import { useRef } from 'react';
import "./header.css"; // Import the external CSS file

const Header = ({ user, onSignOut }) => {
  const [dropdownStyle, setDropdownStyle] = useState({ right: "0" });
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const isSignedIn = !!user; // Check if user is signed in
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hamburgerRef = useRef(null);


  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
  
      if (dropdownRect.right > viewportWidth) {
        dropdownRef.current.classList.add("adjust-left");
      } else {
        dropdownRef.current.classList.remove("adjust-left");
      }
    }
  }, [isDropdownOpen]);
  

  useOutsideClick(dropdownRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  useOutsideClick(hamburgerRef, () => {
    if (isHamburgerOpen) setIsHamburgerOpen(false);
  });
  

  return (
    <header className="header">
      {/* Left Side: Hamburger Menu, Logo, and Brand Name */}
      <div className="left-section">
        <div
          className="hamburger-wrapper"
          ref={hamburgerRef}
          onMouseEnter={() => setIsHamburgerOpen(true)}
          onMouseLeave={() => setIsHamburgerOpen(false)}
        ></div>
        <HamburgerMenu isSignedIn={isSignedIn} />
        {isHamburgerOpen && (
          <div className="hamburger-dropdown">
          </div>
        )}
        <img src="newLogo.png" alt="Logo" className="logo" />
      </div>

      {/* Right Side: Profile Icon or Sign In Button */}
      <div className="nav">
        {isSignedIn ? (
          <div className="dropdown-wrapper" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="profile-button"
              aria-expanded={isDropdownOpen}
              aria-label="User menu"
            >
              <User size={30} />
            </button>

            {isDropdownOpen && (
  <div
    className={`dropdown-menu`} // This will be dynamically updated by JS with `adjust-left` class
    ref={dropdownRef}
  >
    <p className="dropdown-email">{user.email}</p>
    <button onClick={onSignOut} className="signout-button">
      <LogOut size={18} className="icon" />
      Sign Out
    </button>
  </div>
)}

          </div>
        ) : (
          <Link to="/signin" className="signin-button">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
