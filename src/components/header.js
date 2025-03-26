import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react"; // Import icons
import HamburgerMenu from "./hamburgerMenu"; // Import the HamburgerMenu component

const Header = ({ user, onSignOut }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const isSignedIn = !!user; // Check if user is signed in

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#000000",
        width: "100%",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Left Side: Hamburger Menu, Logo, and Brand Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Hamburger Menu with Hover Control */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setIsHamburgerOpen(true)}
          onMouseLeave={() => setIsHamburgerOpen(false)}
        ></div>
        <HamburgerMenu isSignedIn={isSignedIn} />
        {isHamburgerOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                background: "#2d2624",
                color: "#D4AA04",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                padding: "10px",
                zIndex: 1000,
              }}
            >
              </div>
          )}
        <img
          src="logoIgnite.jpg"
          alt="Logo"
          className="logo"
          style={{ width: "50px", height: "50px" }}
        />
        <span
          className="brand-name"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#D4AA04",
          }}
        >
          BAYT
        </span>
      </div>

      {/* Right Side: Profile Icon or Sign In Button */}
      <div className="nav">
        {isSignedIn ? (
          <div style={{ position: "relative" }}>
            {/* Profile Icon */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#D4AA04",
              }}
            >
              <User size={30} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  right: "0",
                  background: "white",
                  color: "black",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  width: "200px",
                  padding: "10px",
                  textAlign: "center",
                  zIndex: "1000",
                }}
              >
                <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  {user.email}
                </p>
                <button
                  onClick={onSignOut}
                  style={{
                    padding: "8px",
                    backgroundColor: "#2d2624",
                    color: "#D4AA04",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LogOut size={18} style={{ marginRight: "5px" }} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // Sign-In Button when not signed in
          <Link
            to="/signin"
            style={{
              padding: "5px 10px",
              backgroundColor: "#2d2624",
              color: "#D4AA04",
              borderRadius: "5px",
              textDecoration: "none",
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