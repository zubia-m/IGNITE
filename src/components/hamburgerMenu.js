import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icon library
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import { useNavigate } from "react-router-dom";

const HamburgerMenu = ({ isSignedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    { title: "Renovation", path: "/renovation" },
    { title: "Live Property Data", icon: "📊" },
    { title: "Contractor Marketplace", icon: "🔨" },
    { title: "Financing & Loans", icon: "💰" },
    { title: "ROI Predictions", icon: "📈" },
  ];

  const handleFeatureClick = (path) => {
    if (!isSignedIn) {
      navigate("/signin", { state: { from: path } }); // Redirect to Sign In
    } else {
      navigate(path); // Navigate to the feature
    }
    setIsOpen(false); // Close the menu
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        className="p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} // Initial state (hidden)
            animate={{ opacity: 1, y: 0 }} // Animate to visible state
            exit={{ opacity: 0, y: -10 }} // Animate to hidden state
            className="absolute top-12 left-0 w-64 bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-bold mb-4 text-gray-800">Features</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                  onClick={feature.path ? () => handleFeatureClick(feature.path) : null} // Only clickable if there's a path
                >
                  {feature.icon && <span className="text-xl">{feature.icon}</span>}
                  <span className="text-sm font-medium">{feature.title}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
