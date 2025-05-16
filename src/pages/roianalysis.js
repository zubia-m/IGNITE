import React, { useState } from "react";
import { Range } from "react-range";
import RoiInsights from "../components/RoiInsights";
import HouseDetails from "../components/HouseDetails";

const RoiAnalysis = () => {
  const [area, setArea] = useState("");
  const [houseType, setHouseType] = useState("");
  const [maxInvestment, setMaxInvestment] = useState([500000]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const houses = [
    {
      address: "3302 Wyoming Dr N, Reading, PA 19608",
      price: 398500,
      type: "Single Family Residence",
      images: ["house1_1.jpg", "house1_2.jpg", "house1_3.jpg"]
    },
    {
      address: "2118 Kutztown Rd, Reading, PA 19605",
      price: 129900,
      type: "Townhouse",
      images: ["house2_1.jpg", "house2_2.jpg"]
    },
    {
      address: "1320 Chester St, Reading, PA 19601",
      price: 215000,
      type: "Single Family Residence",
      images: ["house3_1.jpg"]
    },
    {
      address: "5107 Stoudts Ferry Bridge Rd, Reading, PA 19605",
      price: 430000,
      type: "Single Family Residence",
      images: ["house4_1.jpg", "house4_2.jpg"]
    },
    {
      address: "1006 Meadow Dr, Reading, PA 19605",
      price: 430000,
      type: "Single Family Residence",
      images: ["house5_1.jpg", "house5_2.jpg"]
    },
    {
      address: "4 Elliot Dr, Reading, PA 19606",
      price: 430000,
      type: "Single Family Residence",
      images: ["house6_1.jpg", "house6_2.jpg"]
    },
    {
      address: "17 Charlemont Ct, Shillington, PA 19607",
      price: 298000,
      type: "Townhouse",
      images: ["house7_1.jpg"]
    },
    {
      address: "101 Heather Ln, Wyomissing, PA 19610",
      price: 309900,
      type: "Townhouse",
      images: ["house8_1.jpg"]
    },
    {
      address: "3724 Saint Lawrence Ave,Reading, PA 19606",
      price: 309900,
      type: "Townhouse",
      images: ["house9_1.jpg"]
    },
    {
      address: "919 Philadelphia Ave, Reading, PA 19607",
      price: 299999,
      type: "Single Family Residence",
      images: ["house10_1.jpg", "house10_2.jpg", "house10_3.jpg"]
    }
  ];

  const handleSearch = () => {
    const userPin = area.trim().slice(-5); // last 5 digits, assuming ZIP is at end
    const results = houses.filter(house => {
      const pin = house.address.match(/\b\d{5}\b/); // extract pincode
      return (
        pin && pin[0] === userPin &&
        (!houseType || house.type === houseType) &&
        house.price <= maxInvestment[0]
      );
    });
    setFilteredHouses(results);
  };

  // Handle the case when a house is selected
  if (selectedHouse) {
    return <HouseDetails house={selectedHouse} onBack={() => setSelectedHouse(null)} />;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
      <h1>ROI Analysis</h1>
      <p>Search for properties in your desired area.</p>

      {/* Search Filters */}
      <input
        type="text"
        placeholder="Enter area (e.g., Reading, PA)"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginRight: "10px",
          color: "black"
        }}
      />

      <select
        value={houseType}
        onChange={(e) => setHouseType(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      >
        <option value="">All Types</option>
        <option value="Single Family Residence">Single Family</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Condo">Condo</option>
      </select>

      {/* Max Investment Range */}
      <div style={{ margin: "20px 0" }}>
        <p>Max Investment: ${maxInvestment[0].toLocaleString()}</p>
        <Range
          step={50000}
          min={50000}
          max={1000000}
          values={maxInvestment}
          onChange={(values) => setMaxInvestment(values)}
          renderTrack={({ props, children }) => (
            <div {...props} style={{ height: "6px", background: "#007bff" }}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                height: "20px",
                width: "20px",
                background: "white",
                borderRadius: "50%"
              }}
            />
          )}
        />
      </div>

      <button
        onClick={handleSearch}
        style={{ padding: "10px", fontSize: "16px" }}
      >
        Search
      </button>

      {/* Display filtered houses */}
      {filteredHouses.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Available Houses</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {filteredHouses.map((house, index) => (
              <div
                key={index}
                onClick={() => setSelectedHouse(house)}
                style={{
                  cursor: "pointer",
                  width: "300px",
                  margin: "20px",
                  background: "#1e1e1e",
                  borderRadius: "10px",
                  overflow: "hidden",
                  color: "white"
                }}
              >
                <div style={{ display: "flex", overflowX: "auto" }}>
                  {house.images.map((img, i) => (
                    <img
                      key={i}
                      src={`/images/${img}`}
                      alt={`House ${index + 1}`}
                      style={{ width: "300px", height: "200px", objectFit: "cover" }}
                    />
                  ))}
                </div>
                <div style={{ padding: "10px" }}>
                  <h3>{house.address}</h3>
                  <p>Price: ${house.price.toLocaleString()}</p>
                  <p>Type: {house.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display insights for filtered houses */}
      {filteredHouses.length > 0 && (
        <div style={{ marginTop: "50px" }}>
          <RoiInsights houses={filteredHouses} />
        </div>
      )}

      {/* Modal for detailed house view */}
      {selectedHouse && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999
        }}>
          <div style={{
            background: "#2a2a2a",
            padding: "20px",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "800px",
            color: "white",
            textAlign: "left",
            position: "relative"
          }}>
            <button onClick={() => setSelectedHouse(null)} style={{
              position: "absolute",
              top: "10px",
              right: "15px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              color: "white",
              cursor: "pointer"
            }}>✕</button>

            <h2>{selectedHouse.address}</h2>
            <div style={{ display: "flex", overflowX: "auto", margin: "15px 0" }}>
              {selectedHouse.images.map((img, i) => (
                <img
                  key={i}
                  src={`/images/${img}`}
                  alt={`House detail ${i + 1}`}
                  style={{ width: "250px", height: "180px", marginRight: "10px", objectFit: "cover", borderRadius: "8px" }}
                />
              ))}
            </div>
            <p><strong>Price:</strong> ${selectedHouse.price.toLocaleString()}</p>
            <p><strong>Type:</strong> {selectedHouse.type}</p>

            <div style={{ marginTop: "20px" }}>
              <h3>ROI Prediction (Placeholder)</h3>
              <p>3-Year ROI: <strong>8.2%</strong></p>
              <p>5-Year ROI: <strong>15.7%</strong></p>

              <h4 style={{ marginTop: "15px" }}>Market Trends</h4>
              <img src="/images/market_chart_placeholder.png" alt="Market Trends" style={{ width: "100%", borderRadius: "8px" }} />

              <h4 style={{ marginTop: "15px" }}>Financial Estimates</h4>
              <p>Estimated EMI: <strong>$1,580/month</strong></p>
              <p>Estimated Monthly Rent: <strong>$1,750</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoiAnalysis;