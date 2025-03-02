import React, { useState } from 'react';

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
      <div className="content">
        <h1 className="renovation-title">What do you want to renovate?</h1>
        <div className="dropdown-container">
          <div className="dropdown-header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedOption ? <span>{selectedOption.label}</span> : <span>Select an option</span>}
            <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-list">
              {options.map((option) => (
                <div key={option.value} className="dropdown-item" onClick={() => handleOptionSelect(option)}>
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <br />
        <button className="renovate-button">Renovate</button>
      </div>
    </div>
  );
};

export default Renovation;