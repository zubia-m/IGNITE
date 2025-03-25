import React, { useState, useEffect } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import "./searchBar.css";

export default function SearchBar() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleAddressSubmit = (e) => {
    sessionStorage.setItem('savedAddress', address);
    e.preventDefault();
    if (!address) {
      setError("Please enter a valid address.");
      return;
    }
    setError("");
    setShowPopup(true);     // Show the pop-up
    setAddress('');         // Clear the input field

    setTimeout(() => setShowPopup(false), 3000); // Hide pop-up after 3 seconds
  };

  // Function to abbreviate street suffixes
  const abbreviateStreetSuffix = (streetName) => {
    const suffixMap = {
      Street: "St",
      Avenue: "Ave",
      Road: "Rd",
      Boulevard: "Blvd",
      Drive: "Dr",
      Court: "Ct",
      Lane: "Ln",
      Place: "Pl",
      Square: "Sq",
      Trail: "Trl",
      Parkway: "Pkwy",
      Highway: "Hwy",
    };

    for (const [fullSuffix, abbreviation] of Object.entries(suffixMap)) {
      if (streetName.endsWith(fullSuffix)) {
        return streetName.replace(fullSuffix, abbreviation);
      }
    }

    return streetName;
  };

  // Load address from localStorage if it exists
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  // Save address to localStorage
  const handleSaveAddress = () => {
    if (address.trim() !== "") {
      localStorage.setItem("userAddress", address);
      alert("Address saved!");
      setAddress(""); // Clear input after saving
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleAddressSubmit}>
        <ReactGoogleAutocomplete
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          onPlaceSelected={(place) => {
            const addressComponents = place.address_components;

            let streetNumber = "";
            let streetName = "";
            let city = "";
            let state = "";
            let zip = "";

            addressComponents.forEach((component) => {
              if (component.types.includes("street_number")) {
                streetNumber = component.long_name;
              }
              if (component.types.includes("route")) {
                streetName = abbreviateStreetSuffix(component.long_name);
              }
              if (component.types.includes("locality")) {
                city = component.long_name;
              }
              if (component.types.includes("administrative_area_level_1")) {
                state = component.short_name;
              }
              if (component.types.includes("postal_code")) {
                zip = component.long_name;
              }
            });

            const formattedAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zip}`;
            setAddress(formattedAddress);
            console.log("Constructed Address:", formattedAddress);
          }}
          options={{ types: ["address"], componentRestrictions: { country: "us" } }}
          placeholder="(e.g. 8 Leland Ave, Reading, PA, 19609)"
          className="google-autocomplete-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Save Address
        </button>
        {showPopup && <div className="popup2">Address saved!✅ </div>}
      </form>
    </div>
  );
}