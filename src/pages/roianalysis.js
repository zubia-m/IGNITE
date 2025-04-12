import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from 'react-router-dom';
import './roianalysis.css'; 


const RoiAnalysis = () => {
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    if (!pincode) {
      alert("Please enter a valid pincode.");
      return;
    }
    fetchMarketData(pincode);
  };

  const fetchMarketData = async (pincode) => {
    console.log(`Fetching data for pincode: ${pincode}`);
    
    // Simulated real estate data
    const sampleData = [
      { address: "123 Main St", price: 500000, roi3yr: 8, roi5yr: 15 },
      { address: "456 Elm St", price: 450000, roi3yr: 6, roi5yr: 12 },
      { address: "789 Oak St", price: 600000, roi3yr: 10, roi5yr: 18 },
    ];
    
    setData(sampleData);
  };

  return (
    
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
      <h1>ROI Analysis</h1>
      <p>Enter a pincode to see available properties and projected returns.</p>
      
      <input 
        type="text" 
        placeholder="Enter Pincode" 
        value={pincode} 
        onChange={(e) => setPincode(e.target.value)} 
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px", fontSize: "16px" }}>
        Search
      </button>

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h2>Market Trends</h2>
          {data.map((house, index) => (
            <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
              <h3>{house.address}</h3>
              <p>Price: ${house.price.toLocaleString()}</p>
              <p>ROI in 3 years: {house.roi3yr}%</p>
              <p>ROI in 5 years: {house.roi5yr}%</p>
            </div>
          ))}

          <h2>ROI Projection Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="address" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="roi3yr" fill="#8884d8" name="3-Year ROI (%)" />
              <Bar dataKey="roi5yr" fill="#82ca9d" name="5-Year ROI (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default RoiAnalysis;