import { useState } from "react";
import { color, motion } from "framer-motion";
import "./mortgagecalculator.css";

const MortgageCalculator = () => {
  const [activeTab, setActiveTab] = useState("calculator");

  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [rateFilter, setRateFilter] = useState("");
  const [termFilter, setTermFilter] = useState("");

  const lenders = [
    { name: "Rocket Mortgage", rate: 6.2, termOptions: [15, 30], contact: "www.rocketmortgage.com" },
    { name: "Better.com", rate: 5.95, termOptions: [20, 30], contact: "www.better.com" },
    { name: "Bank of America", rate: 6.5, termOptions: [15, 30], contact: "www.bankofamerica.com" },
    { name: "Wells Fargo", rate: 6.45, termOptions: [20, 30], contact: "www.wellsfargo.com" },
  ];

  const filteredLenders = lenders.filter((lender) => {
    const matchesRate = !rateFilter || lender.rate <= parseFloat(rateFilter);
    const matchesTerm = !termFilter || lender.termOptions.includes(parseInt(termFilter));
    return matchesRate && matchesTerm;
  });

  const calculateMortgage = () => {
    if (!homePrice || !downPayment || !interestRate) {
      alert("Please enter all values!");
      return;
    }

    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let payment = monthlyRate === 0
      ? principal / numPayments
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));

    setMonthlyPayment(payment.toFixed(2));
    setShowPopup(true);
  };

  return (
    <div className="calculator-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "calculator" ? "active" : ""}`}
          onClick={() => setActiveTab("calculator")}
        >
          Calculator
        </button>
        <button
          className={`tab ${activeTab === "lenders" ? "active" : ""}`}
          onClick={() => setActiveTab("lenders")}
        >
          Lenders
        </button>
      </div>

      {activeTab === "calculator" && (
        <>
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
            <select value={loanTerm} onChange={(e) => setLoanTerm(parseInt(e.target.value))}>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>

          <button className="calculate-btn" onClick={calculateMortgage}>
            Calculate Now
          </button>

          {showPopup && (
            <motion.div
              className="popup"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                Estimated Monthly Payment: <strong>${monthlyPayment}</strong>
              </p>
              <button onClick={() => setShowPopup(false)} className="close-popup">
                Close
              </button>
            </motion.div>
          )}
        </>
      )}

      {activeTab === "lenders" && (
        <div className="lenders-section">
          <h3 className="lenders-title">Available Lenders & Financers</h3>

          <div className="filter-group">
            <input
              type="number"
              placeholder="Max Interest Rate (%)"
              value={rateFilter}
              onChange={(e) => setRateFilter(e.target.value)}
            />
            <select
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value)}
            >
              <option value="">All Terms</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>

          <div className="lenders-list">
            {filteredLenders.length > 0 ? (
              filteredLenders.map((lender, index) => (
                <div key={index} className="lender-card">
                  <h4>{lender.name}</h4>
                  <p>
                    Current Rate: <strong>{lender.rate}%</strong>
                  </p>
                  <a
                    href={`https://${lender.contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                  </a>
                </div>
              ))
            ) : (
              <p>No lenders match the selected criteria.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
