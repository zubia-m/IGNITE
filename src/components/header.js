import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./hamburgerMenu";
import useOutsideClick from './useOutsideClick';
import "./header.css";

const Header = ({ user }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const isSignedIn = !!user;
  const hamburgerRef = useRef(null);

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
          <div className="hamburger-dropdown"></div>
        )}
        <img src="newLogo.png" alt="Logo" className="logo" />
        <span class="brand-name">UpHome</span>
      </div>

      {/* Right Side: Just Sign In Button */}
      <div className="nav">
        {!isSignedIn && (
          <Link to="/signin" className="signin-button">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;