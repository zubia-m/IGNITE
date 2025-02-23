import React, { useState } from 'react';

const SearchBar = () => {
  const [address, setAddress] = useState('');
  const [houses, setHouses] = useState([]);
  const [showText, setShowText] = useState(true); // Controls visibility of the text

  const handleSearch = () => {
    if (address) {
      // Sample data for demonstration
      const sampleHouses = [
        {
          id: 1,
          address: '123 Main St, Springfield',
          rooms: 3,
          baths: 2,
          garages: 1,
          basement: 'Yes',
          renovation: 'Needs Renovation',
        },
        {
          id: 2,
          address: '456 Elm St, Shelbyville',
          rooms: 4,
          baths: 3,
          garages: 2,
          basement: 'No',
          renovation: 'No Renovation Needed',
        },
        {
          id: 3,
          address: '789 Oak St, Capital City',
          rooms: 5,
          baths: 4,
          garages: 3,
          basement: 'Yes',
          renovation: 'Needs Renovation',
        },
      ];
      console.log('Setting houses:', sampleHouses); // Debugging
      setHouses(sampleHouses);
      setShowText(false); // Hide the text after search
    }
  };

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="landing-page">
      {/* Background Container with Overlay */}
      <div className="background-container"></div>

      {/* Content Container */}
      <div className="content-container">
        {/* Text (Conditionally Rendered) */}
        {showText && (
          <div className="landing-text">
            Helping homeowners & investors make informed decisions<br />
            & <br />
          AI-driven property valuation, renovation planning, and contractor marketplace
          </div>
        )}

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter home address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={handleKeyPress} // Listen for "Enter" key
            className="search-input"
          />
          <button
            onClick={handleSearch}
            disabled={!address}
            className="search-button"
          >
            Search
          </button>
        </div>

        {/* House Listings */}
        {houses.length > 0 && (
          <div className="house-listings">
            {houses.map((house) => (
              <div key={house.id} className="house-listing">
                <h3>{house.address}</h3>
                <p>Rooms: {house.rooms}</p>
                <p>Baths: {house.baths}</p>
                <p>Garages: {house.garages}</p>
                <p>Basement: {house.basement}</p>
                <p>Renovation: {house.renovation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;