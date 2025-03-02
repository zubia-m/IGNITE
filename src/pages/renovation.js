import React, { useState } from 'react';
import Header from '../components/header'; // Ensure correct import path
import SearchBar from '../components/searchBar'; // Ensure correct import path
// import './renovation.css';
import Particles from "react-tsparticles";

const Renovation = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'livingRoom', label: 'Living Room' },
    { value: 'bedRoom', label: 'Bed Room' },
    { value: 'bathRoom', label: 'Bath Room' },
    { value: 'basement', label: 'Basement' },
    { value: 'garage', label: 'Garage' },
    { value: 'attic', label: 'Attic' },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="renovation-page">
      {/* Fixed Header at the Top */}
      <div className="header-container">
        <Header />
      </div>

      <div className="content">
      <h1 className="renovation-title">What do you want to renovate?</h1>
      <div className="dropdown-container">
        <div
          className="dropdown-header"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedOption ? (
            <span>{selectedOption.label}</span>
          ) : (
            <span>Select an option</span>
          )}
          <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-list">
            {options.map((option) => (
              <div
                key={option.value}
                className="dropdown-item"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <SearchBar />
      <button className="renovate-button">Renovate</button> {/* Added Button */}

    <Particles
    options={{
      particles: {
        number: { value: 80 },
        size: { value: 3 },
        move: { speed: 1 },
        opacity: { value: 0.5 },
        line_linked: { enable: false },
      },
      interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
    }}
    />

    </div>
    </div>
  );
};

export default Renovation;
