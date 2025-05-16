import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./hamburgerMenu.css";

const HamburgerMenu = ({ isSignedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    { title: "Home", path: "/" },
    // { title: "Renovation", path: "/renovation" },
    // { title: "Financing & Loans", path: "/finance" },
    // { title: "ROI Predictions", path: "/roi-analysis" },
    { title: "My Profile", path: "/profilePage" },
    { title: "Wishlist", path: "/wishlist" },
    { title: "Contractors", path: "/contractors" },
  ];

  const handleFeatureClick = (path) => {
    if (!isSignedIn) {
      navigate("/signin", { state: { from: path } });
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  return (
    <div className="menu-wrapper">
      {/* Hamburger Menu Button */}
      <button 
        className="hamburger-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Brand Name - You can replace this with your actual logo/brand component */}
      {/* <div className="brand-name">Your Brand</div> */}

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="hb-dropdown-menu"
          >
            <nav>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>
                    <button
                      className="menu-item"
                      onClick={() => handleFeatureClick(feature.path)}
                    >
                      {feature.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;