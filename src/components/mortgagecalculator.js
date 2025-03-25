import { useState } from "react";
import { motion } from "framer-motion";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const calculateMortgage = () => {
    if (!homePrice || !downPayment || !interestRate) {
      alert("Please enter all values!");
      return;
    }

    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let payment;
    if (monthlyRate === 0) {
      payment = principal / numPayments;
    } else {
      payment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numPayments));
    }

    setMonthlyPayment(payment.toFixed(2));
    setShowPopup(true);
  };

  return (
    <div className="calculator-container">
      <h2 className="title">Mortgage Calculator</h2>

      <div className="input-group">
        <label>Home Price ($)</label>
        <input
          type="number"
          value={homePrice}
          onChange={(e) => setHomePrice(parseFloat(e.target.value) || "")}
          placeholder="Enter home price"
        />
      </div>

      <div className="input-group">
        <label>Down Payment ($)</label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(parseFloat(e.target.value) || "")}
          placeholder="Enter down payment"
        />
      </div>

      <div className="input-group">
        <label>Interest Rate (%)</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value) || "")}
          placeholder="Enter interest rate"
        />
      </div>

      <div className="input-group">
        <label>Loan Term</label>
        <select
          value={loanTerm}
          onChange={(e) => setLoanTerm(parseInt(e.target.value))}
        >
          <option value="15">15 years</option>
          <option value="20">20 years</option>
          <option value="30">30 years</option>
        </select>
      </div>

      <button className="calculate-btn" onClick={calculateMortgage}>
        Calculate Now
      </button>

      {/* Pop-up message for results */}
      {showPopup && (
        <motion.div
          className="popup"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <p>Estimated Monthly Payment: <strong>${monthlyPayment}</strong></p>
          <button onClick={() => setShowPopup(false)} className="close-popup">
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MortgageCalculator;