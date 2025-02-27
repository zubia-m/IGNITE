// SearchBar.js
import React, { useState, useRef, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const SearchBar = () => {
  const [address, setAddress] = useState('');
  const [houses, setHouses] = useState([]); // State to store search results
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDDDt6A5RSzjcnrTUWG8C5ffY4vb25wlIY', // Replace with your Google API key
    libraries,
  });

  const autocompleteService = useRef(null);

  // Initialize the AutocompleteService
  const initAutocompleteService = () => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (!address || isLoading) return; // Prevent multiple searches
    setIsLoading(true);

    if (autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: address },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions.length > 0) {
            // Use the first prediction as the selected place
            const selectedPlace = {
              formatted_address: predictions[0].description,
            };

            // Simulate search results
            const sampleHouses = [
              {
                id: 1,
                address: selectedPlace.formatted_address,
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

            // Set the search results
            setHouses(sampleHouses);
          } else {
            console.error('No predictions found for the input:', address);
          }
          setIsLoading(false);
        }
      );
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

   // Initialize the AutocompleteService when the script is loaded
   useEffect(() => {
      if (isLoaded && !autocompleteService.current) {
        initAutocompleteService();
      }
    }, [isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  // Initialize the AutocompleteService when the script is loaded
  if (!autocompleteService.current) {
    initAutocompleteService();
  }

  return (
    <div className="search-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter home address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyUp={handleKeyPress}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
          }}
          required
        />
        <button
          onClick={handleSearch}
          disabled={!address || isLoading}
          style={{
            padding: '12px 20px',
            backgroundColor: isLoading ? '#ccc' : '#2d2624',
            color: '#D4AA04',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {houses.length > 0 && (
        <div className="house-listings" style={{ marginTop: '20px' }}>
          {houses.map((house) => (
            <div
              key={house.id}
              style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3 style={{ margin: '0 0 10px', fontSize: '18px', color: '#333' }}>{house.address}</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>Rooms: {house.rooms}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>Baths: {house.baths}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>Garages: {house.garages}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>Basement: {house.basement}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>Renovation: {house.renovation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;