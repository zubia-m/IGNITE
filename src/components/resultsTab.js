import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import './resultsTab.css';

export default function ResultsTabs({ data, beforeImg, afterImg, userAddress }) {
  const [imageLoadError, setImageLoadError] = useState(false);
  const [contractors, setContractors] = useState([]);
  const [loadingContractors, setLoadingContractors] = useState(false);
  const [contractorError, setContractorError] = useState(null);

  if (!data) {
    return (
      <div className="loading-message">
        <p>Loading renovation data...</p>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const findContractors = async () => {
    try {
      setLoadingContractors(true);
      setContractorError(null);

      const requestBody = {
        formattedAddress: userAddress,
        // renovation_type: data?.renovation_type
      };

      console.log("Sending request to backend:", JSON.stringify(requestBody)); // Added console.log

      const response = await fetch('https://919a-172-172-186-25.ngrok-free.app/contractors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const contractorsData = await response.json();
      setContractors(contractorsData);
    } catch (error) {
      console.error('Error fetching contractors:', error);
      setContractorError(error.message || 'Failed to find contractors');
    } finally {
      setLoadingContractors(false);
    }
  };


  // Calculate derived values
  const valueIncrease = data.postRenovationValue - data.currentPrice;
  const roiPercentage = data.roi?.toFixed(2) || '0.00';

  return (
    <div className="results-container">
      <Tabs>
        <TabList>
          <Tab>Visual Comparison</Tab>
          <Tab>Cost Breakdown</Tab>
          <Tab>Financial Summary</Tab>
          <Tab>ROI Analysis</Tab>
          <Tab>Find Contractors</Tab>  {/* New Tab */}

        </TabList>
         
        <TabPanel>
          <div className="visuals-section">
            <h2>Before & After</h2>
            <div className="image-comparison">
              <div className="image-wrapper">
                <h3>Current</h3>
                {beforeImg ? (
                  <img 
                    src={beforeImg} 
                    alt="Before renovation" 
                    className="result-image"
                    onError={() => setImageLoadError(true)}
                  />
                ) : (
                  <div className="no-image">No original image available</div>
                )}
              </div>
              <div className="image-wrapper">
                <h3>Proposed</h3>
                {afterImg ? (
                  <img 
                  src="https://919a-172-172-186-25.ngrok-free.app/generated/generated_kitchenOld.jpg" 
                  alt="Test Image" 
 
                    className="result-image"
                    // style={{
                    //   maxWidth: '100%', 
                    //   display: 'block', 
                    //   margin: '0 auto'
                    // }} 
                    onError={() => console.error("Image failed to load:", afterImg)}
                  />
                ) : (
                  <div className="no-image">No generated image available</div>
                )}
              </div>
              
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="costs-section">
            <h2>Itemized Costs</h2>
            <div className="costs-grid">
              {Object.entries(data.itemized_costs || {}).map(([category, cost]) => (
                <div key={category} className="cost-card">
                  <span className="cost-category">{category}</span>
                  <span className="cost-amount">${cost.toLocaleString()}</span>
                </div>
              ))}
              <div className="cost-card total">
                <span className="cost-category">Total Renovation Cost: </span>
                <span className="cost-amount">${data.renovation_cost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="summary-section">
            <h2>Property Details</h2>
            <div className="detail-card">
              <p><strong>Address:</strong> {data.formattedAddress}</p>
              <p><strong>Renovation Type:</strong> {data.renovation_type}</p>
            </div>

            <h2>Valuation</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-label">Current Value</span>
                <span className="metric-value">${data.currentPrice.toLocaleString()}</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Future Value</span>
                <span className="metric-value">${data.postRenovationValue.toLocaleString()}</span>
              </div>
              <div className="metric-card highlight">
                <span className="metric-label">Value Increase</span>
                <span className="metric-value">${valueIncrease.toLocaleString()}</span>
              </div>
              {/* <div className="metric-card">
                <span className="metric-label">Renovation Cost</span>
                <span className="metric-value">${data.renovation_cost.toLocaleString()}</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">ROI</span>
                <span className="metric-value">{data.roi.toLocaleString()}</span>
              </div>
              <div className="metric-card highlight">
                <span className="metric-label">Positive ROI Year</span>
                <span className="metric-value">{data.roiPositiveYear}</span>
              </div> */}
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="roi-section">
            <h2>Investment Analysis</h2>
            <div className="roi-metrics">
              <div className="roi-card">
                <span>Total Investment</span>
                <strong>${data.renovation_cost.toLocaleString()}</strong>
              </div>
              <div className="roi-card highlight">
                <span>Return on Investment (ROI)</span>
                <strong>{roiPercentage}%</strong>
              </div>
              <div className="roi-card">
                <span>Break-Even Year</span>
                <strong>{data.roiPositiveYear}</strong>
              </div>
            </div>
            
            <div className="value-gain">
              <h3>Net Value Gain</h3>
              <p className="gain-amount">
                ${valueIncrease.toLocaleString()}
              </p>
              <p className="gain-description">
                Potential increase in property value after renovation
              </p>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="contractors-section">
            <h2 className='header-cont'>Find Local Contractors</h2>
            <p>Get quotes from professionals in your area</p>
            
            {!contractors ? (
              <div className="contractors-init">
                <button 
                  onClick={findContractors}
                  disabled={loadingContractors}
                  className="find-contractors-btn"
                >
                  {loadingContractors ? 'Searching...' : 'Find Contractors'}
                </button>
                {contractorError && <p className="error-message">{contractorError}</p>}
              </div>
            ) : (
              <div className="contractors-list">
                <h3>Available Contractors Near {userAddress}</h3>
                <div className="contractors-grid">
                  {contractors.map((contractor, index) => (
                    <div key={index} className="contractor-card">
                      <h4>{contractor.name}</h4>
                      <p>⭐ {contractor.rating} ({contractor.reviews} reviews)</p>
                      <p>📞 {contractor.phone}</p>
                      <p>📍 {contractor.distance} miles away</p>
                      <p>💵 {contractor.price_range}</p>
                      <a href={`mailto:${contractor.email}`} className="contact-btn">Contact</a>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={findContractors}
                  className="refresh-contractors-btn"
                >
                  Refresh Results
                </button>
              </div>
            )}
          </div>
        </TabPanel>
        
      </Tabs>
    </div>
  );
}