import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Heart, HeartOff } from "lucide-react";
import "./HouseDetails.css";
import { useWishlist } from "../context/wishlistcontext";

const HouseDetails = ({ house, onBack }) => {
  const [predictedROI, setPredictedROI] = useState(null);
  const [marketTrends, setMarketTrends] = useState([]);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(house.address);

  const generateMarketTrends = () => {
    const year = new Date().getFullYear();
    const trends = [];
    let basePrice = house.price * 0.7;

    for (let i = -5; i <= 0; i++) {
      trends.push({
        year: `${year + i}`,
        price: Math.round(basePrice + Math.random() * house.price * 0.15)
      });
      basePrice += house.price * 0.05;
    }

    return trends;
  };

  useEffect(() => {
    if (!house) return;

    const fetchPredictedROI = async () => {
      try {
        const response = await fetch("http://localhost:5000/predict-roi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "Current Price": house.price,
            "2020 Price": house.history["2020"],
            "2021 Price": house.history["2021"],
            "2022 Price": house.history["2022"],
            "2023 Price": house.history["2023"],
            "2024 Price": house.history["2024"],
            "Est. Monthly Rent": house.rent,
            "Type of House": house.type
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Flask backend error:", errorText);
          return;
        }

        const data = await response.json();
        if (data.predicted_roi !== undefined && !isNaN(data.predicted_roi)) {
          setPredictedROI(data.predicted_roi.toFixed(2));
        } else {
          console.error("Unexpected ROI prediction format:", data);
        }
      } catch (err) {
        console.error("Error fetching ROI:", err);
      }
    };

    fetchPredictedROI();
    setMarketTrends(generateMarketTrends());
  }, [house]);

  if (!house) return null;

  const projectedROI = {
    3: ((house.price * 1.15 - house.price) / house.price),
    5: ((house.price * 1.3 - house.price) / house.price),
    10: ((house.price * 1.6 - house.price) / house.price)
  };

  const rentalIncomePerYear = house.price * 0.06;
  const rentalROI = (rentalIncomePerYear / house.price) * 100;
  const mortgageEMI = (house.price * 0.0075).toFixed(0);

  const appreciationHistory = [
    { year: "2019", price: house.price * 0.75 },
    { year: "2021", price: house.price * 0.9 },
    { year: "2023", price: house.price * 1.05 },
    { year: "2025", price: house.price }
  ];

  const toggleWishlist = () => {
    wishlisted ? removeFromWishlist(house.address) : addToWishlist(house);
  };

  return (
    <div className="house-details">
      <button className="back-button mb-4" onClick={onBack}>
        ← Back to listings
      </button>

      <div className="flex justify-between items-start mb-2">
        <h2 className="house-title">{house.address}</h2>
        <button onClick={toggleWishlist} className="text-red-500">
          {wishlisted ? <HeartOff /> : <Heart />}
        </button>
      </div>

      <div className="house-image-container">
        <img
          src={`/images/${house.images[0]}`}
          alt="House"
          className="house-image"
        />
      </div>

      <div className="info-card">
        <p><strong>Type:</strong> {house.type}</p>
        <p><strong>Price:</strong> ${house.price.toLocaleString()}</p>
      </div>

      <div className="info-card">
        <h3>🔮 Predicted ROI</h3>
        <p>
          {predictedROI !== null ? (
            <span className="text-green-700 font-semibold">{predictedROI}%</span>
          ) : (
            <span className="text-gray-500 italic">Loading prediction...</span>
          )}
        </p>
      </div>

      <div className="info-card">
        <h3>📜 House History (Appreciation)</h3>
        <ul className="list-disc list-inside">
          {appreciationHistory.map(({ year, price }) => (
            <li key={year}>
              {year}: ${Math.round(price).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="info-card">
        <h3>📈 Projected ROI (Selling)</h3>
        <ul className="list-disc list-inside">
          <li>3 years: {(projectedROI[3] * 100).toFixed(1)}%</li>
          <li>5 years: {(projectedROI[5] * 100).toFixed(1)}%</li>
          <li>10 years: {(projectedROI[10] * 100).toFixed(1)}%</li>
        </ul>
      </div>

      <div className="info-card">
        <h3>🏠 ROI from Renting</h3>
        <p>Yearly Rental Income: ${Math.round(rentalIncomePerYear)}</p>
        <p>Rental ROI: {rentalROI.toFixed(2)}%</p>
      </div>

      <div className="info-card">
        <h3>💰 Estimated Mortgage EMI</h3>
        <p>~ ${mortgageEMI}/month (approx)</p>
      </div>

      <div className="market-chart">
        <h3>📉 Real-Time Market Trends</h3>
        <ResponsiveContainer height={250}>
          <LineChart data={marketTrends}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HouseDetails;