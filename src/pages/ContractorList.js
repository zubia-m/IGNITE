import React, { useState } from 'react';
import axios from 'axios';
import './ContractorList.css'; // optional for styling

const ContractorList = ({ formattedAddress }) => {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const fetchContractors = async () => {
    if (!formattedAddress) {
      setError("Address not provided.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post('/contractors', {
        formattedAddress: formattedAddress
      });

      setContractors(response.data.contractors);
      setShowResults(true);
    } catch (err) {
      setError("Failed to fetch contractors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contractor-container">
      <button className="fetch-button" onClick={fetchContractors}>
        Show Nearby Contractors
      </button>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {showResults && contractors.length > 0 && (
        <div className="contractor-list">
          {contractors.map((contractor, index) => (
            <div key={index} className="contractor-card">
              <h3>{contractor.name}</h3>
              <p><strong>Address:</strong> {contractor.address}</p>
              <p><strong>Rating:</strong> {contractor.rating ?? "N/A"} ⭐</p>
              <p><strong>Total Reviews:</strong> {contractor.user_ratings_total ?? 0}</p>
            </div>
          ))}
        </div>
      )}

      {showResults && contractors.length === 0 && !loading && (
        <p className="no-results-text">No contractors found nearby.</p>
      )}
    </div>
  );
};

export default ContractorList;
