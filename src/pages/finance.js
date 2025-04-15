import React from 'react';
import MortgageCalculator from '../components/mortgagecalculator'; // Import the Mortgage Calculator
import './finance.css'; 
import { useNavigate } from 'react-router-dom';


const Finance = () => {
    const navigate = useNavigate();
  
  return (
    
    <div className="finance-container">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
      <h1>Financing & Loans</h1>
      <MortgageCalculator /> {/* Use the Mortgage Calculator component */}
    </div>
  );
};

export default Finance;