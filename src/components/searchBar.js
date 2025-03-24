import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import ReactGoogleAutocomplete from "react-google-autocomplete";

export default function SearchBar() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Keep modal state

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`Lat: ${latitude}, Lon: ${longitude}`);
        },
        () => alert("Unable to retrieve your location")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = async () => {
    if (!address) return alert("Please enter an address");

    try {
      // Fetch from Google Places API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
          address
        )}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        setResults(data.candidates[0]);
        setIsModalOpen(true); // Open modal when results are found
      } else {
        alert("No results found");
        setResults(null);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      alert("Failed to fetch place details");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-white shadow-lg rounded-xl w-full max-w-lg mx-auto">
      <ReactGoogleAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        onPlaceSelected={(place) => setAddress(place.formatted_address)}
      />
      <button
        onClick={handleLocateMe}
        className="flex items-center gap-1 px-4 py-2 bg-[#D4AA04] text-white rounded-lg shadow-md hover:bg-yellow-700 transition-all"
      >
        <FaMapMarkerAlt /> Locate Me
      </button>
      <button
        onClick={handleSearch}
        className="flex items-center gap-1 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-all"
      >
        <FaSearch /> Search
      </button>

      {/* Modal for displaying search results */}
      {isModalOpen && results && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="font-bold text-xl mb-4">Search Results:</h3>
            <p><strong>Place Name:</strong> {results.name}</p>
            <p><strong>Address:</strong> {results.formatted_address}</p>
            <p><strong>Latitude:</strong> {results.geometry.location.lat}</p>
            <p><strong>Longitude:</strong> {results.geometry.location.lng}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}