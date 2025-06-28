import React, { useState } from "react";
import { Range } from "react-range";
import RoiInsights from "../components/RoiInsights";
import HouseDetails from "../components/HouseDetails";
import { Heart } from "lucide-react"; // Ensure lucide-react is installed
import "./roiprediction.css";
import { useNavigate } from 'react-router-dom';


const Roiprediction = () => {
  const [area, setArea] = useState("");
  const [houseType, setHouseType] = useState("");
  const [maxInvestment, setMaxInvestment] = useState([500000]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();


  const toggleWishlist = (address) => {
    if (wishlist.includes(address)) {
      setWishlist(wishlist.filter(item => item !== address));
    } else {
      setWishlist([...wishlist, address]);
    }
  };
  const houses = [
    {
      address: "3302 Wyoming Dr N, Reading, PA 19608",
      price: 398500,
      type: "Single Family Residence",
      images: ["house1_1.jpg", "house1_2.jpg"]
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
      images: ["house8_1.jpg","house8_2.jpg"]
    },
    {
      address: "3724 Saint Lawrence Ave,Reading, PA 19606",
      price: 309900,
      type: "Townhouse",
      images: ["house9_1.jpg","house9_1.jpg"]
    },
    {
      address: "919 Philadelphia Ave, Reading, PA 19607",
      price: 299999,
      type: "Single Family Residence",
      images: ["house10_1.jpg", "house10_2.jpg", "house10_3.jpg"]
    },
    {
      address: "322 Walnut St, Reading, PA 19601",
      price: 415000,
      type: "Townhouse",
      images: ["house11_1.jpg"]
    },
    {
      address: "141 Schuylkill Ave, Reading, PA 19601",
      price: 165000,
      type: "Single Family Residence",
      images: ["house12_1.jpg","house12_2.jpg"]
    },
    {
      address: "136 Robeson St, Reading, PA 19601",
      price: 325000,
      type: "Single Family Residence",
      images: ["house13_1.jpg","house13_2.jpg"]
    },
    {
      address: "711 Lehigh St, Reading, PA 19601",
      price: 279900,
      type: "Single Family Residence",
      images: ["house14_1.jpg","house14_2.jpg"]
    },
    {
      address: "5 Jeffrey Rd, Reading, PA 19601",
      price: 349900,
      type: "Single Family Residence",
      images: ["house15_1.jpg","house15_2.jpg"]
    },
    {
      address: "1804 Bernville Rd, Reading, PA 19601",
      price: 875000,
      type:"Single Family Residence",
      images: ["house16_1.jpg","house16_2.jpg"]
    },
    {
      address: "218 Hudson St, Reading,2 PA 19601",
      price: 109900,
      type: "Townhouse",
      images: ["house17_1.jpg","house17_2.jpg"]
    },
    {
      address: "1236 Carbon St, Reading, PA 19601",
      price: 225000,
      type: "Townhouse",
      images: ["house18_1.jpg","house18_2.jpg"]
    },
    {
      address: "437 Cedar St, Reading, PA 19601",
      price:120000,
      type: "Townhouse",
      images: ["house19_1.jpg","house19_2.jpg"]
    },
    {
      address: "306 Oley St, Reading, PA 19601",
      price: 250000,
      type: "Townhouse",
      images:["house20_1.jpg","house20_2.jpg"]
    },
    {
      address: "539 Oley St, Reading, PA 19601",
      price: 229900,
      type: "Townhouse",
      images:["house21_1.jpg"]
    },
    {
      address: "1342 Allegheny Ave, Reading, PA 19601",
      price: 250000,
      type: "Single Family Residence",
      images: ["house22_1.jpg","house22_2.jpg"]
    },
    {
      address: "405 Walnut St, West Reading, PA 19601",
      price: 438000,
      type: "Single Family Residence",
      images: ["house23_1.jpg","house23_2.jpg"]
    },
    {
      address: "1317 Church St, Reading, PA 19601",
      price: 210000,
      type: "Townhouse",
      images: ["house24_1.jpg","house24_2.jpg"]
    },
    {
      address: "318 Hollenbach St, Reading, PA 19601",
      price: 168000,
      type: "Townhouse",
      images: ["house25_1.jpg","house25_2.jpg"]
    }
  ];
  const handleSearch = () => {
    const userPin = area.trim().slice(-5);
    const results = houses.filter(house => {
      const pin = house.address.match(/\b\d{5}\b/);
      return (
        pin && pin[0] === userPin &&
        (!houseType || house.type === houseType) &&
        house.price <= maxInvestment[0]
      );
    });
    setFilteredHouses(results);
  };

  if (selectedHouse) {
    return <HouseDetails house={selectedHouse} onBack={() => setSelectedHouse(null)} />;
  }

  return (
    <div className="roi-prediction-container">
      <div className="roi-content">

        {/* BACK BUTTON */}
        <div className="back-button-container">
          <button onClick={() => navigate(-1)} className="back-button">←</button>
        </div>
        

        <div className="roi-header">
          <h1>ROI Analysis</h1>
          <p>Search for properties in your desired area.</p>
        </div>

        <div className="search-filters">
          <input
            type="text"
            className="search-input"
            placeholder="Enter area (e.g., Reading, PA)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <select 
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            className="type-select"
          >
            <option value="">All Types</option>
            <option value="Single Family Residence">Single Family</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Condo">Condo</option>
          </select>
        </div>

        <div className="range-container">
          <p>Max Investment: ${maxInvestment[0].toLocaleString()}</p>
          <Range
            step={50000}
            min={50000}
            max={1000000}
            values={maxInvestment}
            onChange={(values) => setMaxInvestment(values)}
            renderTrack={({ props, children }) => (
              <div {...props} className="range-track">{children}</div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className="range-thumb" />
            )}
          />
        </div>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        {filteredHouses.length > 0 && (
          <div className="results-section">
            <h2>Available Houses</h2>
            <div className="houses-grid">
              {filteredHouses.map((house, index) => (
                <div key={index} className="house-card" onClick={() => setSelectedHouse(house)}>
                  {house.images.map((img, i) => (
                    <img key={i} src={`/images/${img}`} alt={`House ${index + 1}`} />
                  ))}
                  <div className="details">
                    <h3>{house.address}</h3>
                    <p><strong>Price:</strong> ${house.price.toLocaleString()}</p>
                    <p><strong>Type:</strong> {house.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredHouses.length > 0 && (
          <div style={{ marginTop: "50px" }}>
            <RoiInsights houses={filteredHouses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Roiprediction;
  