// searchBar.js (Search Bar Component)
import React, { useState } from 'react';

const SearchBar = () => {
  const [address, setAddress] = useState('');
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showText, setShowText] = useState(true);

  // Handle search functionality
  const handleSearch = () => {
    if (address) {
      setIsLoading(true);
      setTimeout(() => {
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
        setHouses(sampleHouses);
        setIsLoading(false);
        setShowText(false);
      }, 2000);
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container" style={{ animation: 'fadeIn 1s ease-in-out' }}>
      <input
        type="text"
        placeholder="Enter home address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          padding: '15px 15px 15px 35px',
          width: 'calc(100% - 35px)',
          boxSizing: 'border-box',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.3s ease',
        }}
        required
      />
      <button
        onClick={handleSearch}
        disabled={!address || isLoading}
        className="search-button"
        style={{
          padding: '12px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>

      {houses.length > 0 && (
        <div className="house-listings" style={{ animation: 'slideIn 0.5s ease-in-out' }}>
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
  );
};

export default SearchBar;
