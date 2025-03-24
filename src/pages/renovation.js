import React, { useState, useEffect, useRef } from 'react';
import "./renovation.css";
import ReactGoogleAutocomplete from "react-google-autocomplete";


const Renovation = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // Controls modal visibility
  const [address, setAddress] = useState(''); // Stores the address input
  const tileGridRef = useRef(null);

  const options = [
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'livingRoom', label: 'Living Room' },
    { value: 'bedRoom', label: 'Bed Room' },
    { value: 'bathRoom', label: 'Bath Room' },
    { value: 'basement', label: 'Basement' },
    { value: 'garage', label: 'Garage' },
    { value: 'attic', label: 'Attic' },
  ];

  const handleOptionSelect = (optionValue) => {
    setSelectedOption(optionValue);
  };

  const getImageForOption = (value) => {
    switch (value) {
      case 'kitchen': return 'https://example.com/images/kitchen.jpg';
      case 'livingRoom': return 'https://example.com/images/living-room.jpg';
      case 'bedRoom': return 'https://example.com/images/bed-room.jpg';
      case 'bathRoom': return 'https://example.com/images/bath-room.jpg';
      case 'basement': return 'https://example.com/images/basement.jpg';
      case 'garage': return 'https://example.com/images/garage.jpg';
      case 'attic': return 'https://example.com/images/attic.jpg';
      default: return 'https://example.com/images/default.jpg';
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false); // Close the modal after submitting the address
    // You can also save the address to state or send it to an API here
    console.log('Address submitted:', address);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tileGridRef.current && !tileGridRef.current.contains(event.target)) {
        setSelectedOption('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="renovation-page">
  {/* Modal for Address Input */}
  {isModalOpen && (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Enter Your Address</h2>
        <form onSubmit={handleAddressSubmit}>
          <ReactGoogleAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            onPlaceSelected={(place) => setAddress(place.formatted_address)}
            className="google-autocomplete-input" // Add a custom class
            placeholder="Enter your address"
            style={{ // Inline styles for the input
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '16px',
              boxSizing: 'border-box', // Ensure padding is included in width
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )}

  {/* Renovation Page Content */}
  <div className="content">
    <h1 className="renovation-title">What do you want to renovate?</h1>
    
    <div className="tile-grid" ref={tileGridRef}>
      {options.map((option) => (
        <div
          key={option.value}
          className={`tile ${selectedOption === option.value ? 'selected' : ''}`}
          onClick={() => handleOptionSelect(option.value)}
        >
          <img
            src={getImageForOption(option.value)}
            alt={option.label}
            className="tile-image"
          />
          <span className="tile-label">{option.label}</span>
        </div>
      ))}
    </div>

    <br />
    <button className="renovate-button">Renovate</button>
  </div>
</div>
  );
};

export default Renovation;