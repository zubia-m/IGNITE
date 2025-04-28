import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import './resultsTab.css';

export default function ResultsTabs({ data, beforeImg, afterImg }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only consider data loaded if we have the essential fields
    if (data?.currentPrice && data?.postRenovationValue) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="loading-message">
        <p>Loading renovation data...</p>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Calculate derived values
  const valueIncrease = data.postRenovationValue - data.currentPrice;
  const roiPercentage = data.roi.toFixed(2);
  

  return (
    <div className="results-container">
      <Tabs>
        <TabList>
          <Tab>Financial Summary</Tab>
          <Tab>Visual Comparison</Tab>
          <Tab>ROI Analysis</Tab>
        </TabList>

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
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="visuals-section">
            <h2>Before & After</h2>
            <div className="image-comparison">
              <div className="image-wrapper">
                <h3>Current</h3>
                {beforeImg ? (
                  <img src={beforeImg} alt="Before renovation" className="result-image" />
                ) : (
                  <div className="no-image">No original image available</div>
                )}
              </div>
              <div className="image-wrapper">
                <h3>Proposed</h3>
                {afterImg ? (
                  <img src={afterImg} alt="After renovation" className="result-image" />
                ) : (
                  <div className="no-image">No generated image available</div>
                )}
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="roi-section">
            <h2>Investment Analysis</h2>
            <div className="roi-metrics">
              <div className="roi-card">
                <span>Total Renovation Cost</span>
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
      </Tabs>
    </div>
  );
}