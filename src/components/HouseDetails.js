// src/components/HouseDetails.js
import React from "react";
import "./HouseDetails.css";
const HouseDetails = ({ house, onBack }) => {
  if (!house) return null;

  // Placeholder calculations
  const projectedROI = {
    3: ((house.price * 1.15) - house.price) / house.price,
    5: ((house.price * 1.3) - house.price) / house.price,
    10: ((house.price * 1.6) - house.price) / house.price
  };

  const rentalIncomePerYear = house.price * 0.06; // Assume 6% rental yield
  const rentalROI = (rentalIncomePerYear / house.price) * 100;

  const mortgageEMI = (house.price * 0.0075).toFixed(0); // Approximate for now

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <button className="text-blue-500 mb-4" onClick={onBack}>← Back to listings</button>

      <h2 className="text-xl font-bold mb-2">{house.address}</h2>
      <div className="mb-4">
      <img src={`/images/${house.images[0]}`} alt="House" className="rounded-lg" />
      </div>
      <p><strong>Type:</strong> {house.type}</p>
      <p><strong>Price:</strong> ${house.price.toLocaleString()}</p>

      <hr className="my-4" />

      <h3 className="font-semibold text-lg mb-2">Predicted ROI (Placeholder):</h3>
      <p>🔮 ROI Prediction: 8.4% (placeholder)</p>

      <h3 className="font-semibold text-lg mt-4 mb-2">House History (Appreciation):</h3>
      <ul className="list-disc list-inside">
        <li>2019: ${Math.round(house.price * 0.75)}</li>
        <li>2021: ${Math.round(house.price * 0.9)}</li>
        <li>2023: ${Math.round(house.price * 1.05)}</li>
        <li>2025: ${house.price}</li>
      </ul>

      <h3 className="font-semibold text-lg mt-4 mb-2">Projected ROI (Sell in future):</h3>
      <ul className="list-disc list-inside">
        <li>3 years: {(projectedROI[3] * 100).toFixed(1)}%</li>
        <li>5 years: {(projectedROI[5] * 100).toFixed(1)}%</li>
        <li>10 years: {(projectedROI[10] * 100).toFixed(1)}%</li>
      </ul>

      <h3 className="font-semibold text-lg mt-4 mb-2">ROI for Renting:</h3>
      <p>Yearly Rental Income Estimate: ${Math.round(rentalIncomePerYear)}</p>
      <p>Rental ROI: {rentalROI.toFixed(2)}%</p>

      <h3 className="font-semibold text-lg mt-4 mb-2">Market Trend Graph:</h3>
      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        📉 Placeholder Market Graph
      </div>

      <h3 className="font-semibold text-lg mt-4 mb-2">Estimated Mortgage EMI:</h3>
      <p>💰 ~ ${mortgageEMI}/month (approx)</p>
    </div>
  );
};

export default HouseDetails; 