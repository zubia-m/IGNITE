import React, { useState, useEffect } from "react";
import { Range } from "react-range";
import RoiInsights from "../components/RoiInsights";
import HouseDetails from "../components/HouseDetails";
import { houses } from "../data/houses";

const Roiprediction = () => {
  const [area, setArea] = useState("");
  const [houseType, setHouseType] = useState("");
  const [maxInvestment, setMaxInvestment] = useState([500000]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [topThree, setTopThree] = useState([]);

  const handleSearch = () => {
    const userPin = area.trim().slice(-5);
    const results = houses.filter((house) => {
      const pin = house.address.match(/\b\d{5}\b/);
      return (
        pin && pin[0] === userPin &&
        (!houseType || house.type === houseType) &&
        house.price <= maxInvestment[0]
      );
    });

    // Sort by ROI prediction (descending) and select top 3
    const sortedByRoi = [...results].sort((a, b) => b.roi - a.roi);
    setTopThree(sortedByRoi.slice(0, 3));
    setFilteredHouses(results);
  };

  if (selectedHouse) {
    return <HouseDetails house={selectedHouse} onBack={() => setSelectedHouse(null)} />;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "#163D69", backgroundColor: "#F6EEE0", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>ROI Prediction</h1>
      <p>Search for properties in your desired area.</p>

      {/* Filters */}
      <input
        type="text"
        placeholder="Enter area (e.g., Reading, PA)"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginRight: "10px",
          color: "#163D69"
        }}
      />
      <select 
        value={houseType}
        onChange={(e) => setHouseType(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px", color: "#163D69" }}
      >
        <option value="">All Types</option>
        <option value="Single Family Residence">Single Family</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Condo">Condo</option>
      </select>

      {/* Range Slider */}
      <div style={{ margin: "20px 0" }}>
        <p>Max Investment: ${maxInvestment[0].toLocaleString()}</p>
        <Range
          step={50000}
          min={50000}
          max={1000000}
          values={maxInvestment}
          onChange={(values) => setMaxInvestment(values)}
          renderTrack={({ props, children }) => (
            <div {...props} style={{ height: "6px", background: "#A68A64" }}>{children}</div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                height: "20px",
                width: "20px",
                background: "#163D69",
                borderRadius: "50%"
              }}
            />
          )}
        />
      </div>

      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#163D69",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Search
      </button>

      {/* Top 3 Picks */}
      {topThree.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>Top 3 Investment Picks</h2>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {topThree.map((house, i) => (
              <div
                key={i}
                onClick={() => setSelectedHouse(house)}
                style={{
                  width: "280px",
                  margin: "10px",
                  background: "#FFF9F0",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer"
                }}
              >
                <img
                  src={`/images/${house.images[0]}`}
                  alt="Top Pick"
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                />
                <div style={{ padding: "10px" }}>
                  <h3 style={{ fontSize: "1.1rem" }}>{house.address}</h3>
                  <p><strong>ROI:</strong> {house.roi}%</p>
                  <p><strong>Price:</strong> ${house.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Houses */}
      {filteredHouses.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Available Houses</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {filteredHouses.map((house, index) => (
              <div
                key={index}
                onClick={() => setSelectedHouse(house)}
                style={{
                  width: "300px",
                  margin: "20px",
                  background: "#FFF9F0",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  color: "#163D69",
                  cursor: "pointer"
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
                <div style={{ padding: "10px"}}>
                  <h3 style={{ fontSize: "1.1rem" }}>{house.address}</h3>
                  <p><strong>Price:</strong> ${house.price.toLocaleString()}</p>
                  <p><strong>Type:</strong> {house.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Average Market Price Trend */}
      {filteredHouses.length > 0 && (
        <div style={{ marginTop: "50px" }}>
          <RoiInsights houses={filteredHouses} />
        </div>
      )}
    </div>
  );
};

export default Roiprediction;