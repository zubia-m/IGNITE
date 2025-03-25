import React from 'react';
import MortgageCalculator from '../components/mortgagecalculator'; // Import the Mortgage Calculator
import './finance.css';  

const Finance = () => {
  return (
    <div className="finance-container">
      <h1>Financing & Loans</h1>
      <MortgageCalculator /> {/* Use the Mortgage Calculator component */}
    </div>
  );
};

export default Finance;