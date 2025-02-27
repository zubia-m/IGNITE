import { useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./hamburgerMenu.css";
const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    { title: "Renovation", path: "/renovation" },
    { title: "Live Property Data", path: "/live-data" },
    { title: "Contractor Marketplace", path: "/contractors" },
    { title: "Financing & Loans", path: "/financing" },
    { title: "ROI Predictions", path: "/roi" },
  ];

  return (
    <div className="menu-container">
      {/* Hamburger Menu Button */}
      <button
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={30} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="dropdown"
          >
            <nav>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>
                    <button
                      className="menu-item"
                      onClick={() => {
                        navigate(feature.path);
                        setIsOpen(false); // Close menu after clicking
                      }}
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