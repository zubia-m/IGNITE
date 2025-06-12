import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import './resultsTab.css';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ResultsTabs({ data, beforeImg, afterImg, formattedAddress }) {
  const [imageLoadError, setImageLoadError] = useState(false);
  const [contractors, setContractors] = useState([]);
  const [loadingContractors, setLoadingContractors] = useState(false);
  const [contractorError, setContractorError] = useState(null);
  const [shortlisted, setShortlisted] = useState([]);
  const [contractorsFetched, setContractorsFetched] = useState(false);
  const [user] = useAuthState(auth);

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
      setContractorsFetched(true);

      const response = await fetch('http://4.157.15.37/contractors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formattedAddress }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const contractorsData = await response.json();
      console.log('Contractor API Response:', contractorsData);


      if (!Array.isArray(contractorsData.contractors)) {
        throw new Error('Contractors data is not an array');
      }

      setContractors(contractorsData.contractors);
    } catch (error) {
      setContractorError(error.message || 'Failed to find contractors');
    } finally {
      setLoadingContractors(false);
    }
  };

  const valueIncrease = data.postRenovationValue - data.currentPrice;
  const roiPercentage = data.roi?.toFixed(2) || '0.00';

  const toggleShortlist = async (contractor) => {
    if (!user) {
      alert('Please sign in to shortlist contractors');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      // Check if contractor already exists in Firestore
      const userDoc = await getDoc(userDocRef);
      const existingContractors = userDoc.exists() ? userDoc.data().shortlistedContractors || [] : [];
      const alreadyShortlisted = existingContractors.some(c => c.name === contractor.name);

      if (alreadyShortlisted) {
        // Remove from shortlist
        await updateDoc(userDocRef, {
          shortlistedContractors: existingContractors.filter(c => c.name !== contractor.name)
        });
        setShortlisted(prev => prev.filter(c => c.name !== contractor.name));
      } else {
        // Add to shortlist
        const contractorData = {
          name: contractor.name,
          rating: contractor.rating,
          address: contractor.address,
          phone: contractor.phone_number,
          website: contractor.website,
          shortlistedAt: new Date().toISOString()
        };

        await updateDoc(userDocRef, {
          shortlistedContractors: arrayUnion(contractorData)
        }, { merge: true });

        setShortlisted(prev => [...prev, contractorData]);
      }
    } catch (error) {
      console.error("Error updating shortlist:", error);
      setContractorError('Failed to update shortlist');
    }
  };

  const handleFinishRenovation = async () => {
    if (!user) {
      alert('Please sign in to save your renovation');
      return;
    }

    const storedGeneratedImage = sessionStorage.getItem('generatedImage');

    const newRenovation = {
      address: data.formattedAddress,
      renovationType: data.renovation_type,
      beforeImg: beforeImg,
      afterImg: afterImg || storedGeneratedImage,
      financials: {
        currentPrice: data.currentPrice,
        postValue: data.postRenovationValue,
        renovationCost: data.renovation_cost,
        roi: data.roi,
        roiPositiveYear: data.roiPositiveYear,
        itemized_costs: data.itemized_costs,
      },
      shortlistedContractors: shortlisted,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        renovations: arrayUnion(newRenovation)
      }, { merge: true });

      // Also save to localStorage for immediate access
      const existing = JSON.parse(localStorage.getItem('myRenovations')) || [];
      localStorage.setItem('myRenovations', JSON.stringify([...existing, newRenovation]));

      window.location.href = '/profilePage';
    } catch (error) {
      console.error("Error saving renovation:", error);
      setContractorError('Failed to save renovation');
    }
  };

  return (
    <div className="results-container">
      <Tabs>
        <TabList>
          <Tab>Visual Comparison</Tab>
          <Tab>Cost Breakdown</Tab>
          <Tab>Financial Summary</Tab>
          <Tab>ROI Prediction</Tab>
          <Tab>Contractor Marketplace</Tab>
        </TabList>

        <TabPanel>
          <div className="visuals-section">
            {/* <h2>Before & After</h2> */}
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
                {(sessionStorage.getItem('generatedImage')) ? (
                  <img
                    src={sessionStorage.getItem('generatedImage')}
                    alt="After renovation"
                    className="result-image"
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
                <span className="cost-category">Total Renovation Cost:</span>
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
              <p className="gain-amount">${valueIncrease.toLocaleString()}</p>
              <p className="gain-description">
                Potential increase in property value after renovation
              </p>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="contractors-section">
            {contractorsFetched && (
              <button
                className="finish-renovation-btn"
                onClick={handleFinishRenovation}
              >
                FINISH RENOVATION!
              </button>
            )}
            <h2 className="header-cont">Find Local Contractors</h2>
            <p>Get quotes from professionals in your area</p>

            {contractors.length === 0 ? (
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
                <h3>Available Contractors Near {formattedAddress}</h3>
                <div className="contractors-grid">
                  {contractors.map((contractor, i) => (
                    <div key={i} className="contractor-card">
                      <h4>{contractor?.name}</h4>
                      <p>⭐ {contractor?.rating} ({contractor.user_rating_total} reviews)</p>
                      <p>📞 {contractor?.phone_number}</p>
                      <p>📍 {contractor?.address}</p>
                      <p>
                        🌐 <a 
                              href={contractor?.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#163D69', textDecoration: 'underline' }}
                          >
                              {contractor?.website}
                          </a>
                      </p>

                      <button
                        className={`shortlist-btn ${shortlisted.find(c => c.name === contractor.name) ? 'shortlisted' : ''}`}
                        onClick={() => toggleShortlist(contractor)}
                      >
                        {shortlisted.find(c => c.name === contractor.name) ? 'Shortlisted' : 'Shortlist'}
                      </button>
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
