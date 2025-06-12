import React, { useState, useEffect } from 'react';
import { auth, db, doc, getDoc, updateDoc } from '../firebase.js';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './profilePage.css';

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const [notification, setNotification] = useState(null);
  const [renovations, setRenovations] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    memberSince: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [addressHistory, setAddressHistory] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState('');
  const [shortlistedContractors, setShortlistedContractors] = useState([]);
  const navigate = useNavigate();

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        setNotification({ message: "You have been signed out successfully", type: "success" });
        console.log("User signed out.");
      })
      .catch((error) => {
        setNotification({ message: "Error signing out", type: "error" });
        console.error("Error signing out:", error);
      });
  };

  const Notification = ({ message, type }) => {
    useEffect(() => {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }, []);

    return <div className={`profile-notification ${type}`}>{message}</div>;
  };

  useEffect(() => {
    console.log("Current Firebase user:", user?.uid);
  }, [user]);

    useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfileData({
              name: data.name || '',
              email: user.email || '',
              address: data.address || '',
              memberSince: user.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : ''
            });

            const formatted = data.formattedAddress;
            setAddressHistory(
              Array.isArray(formatted) ? formatted : formatted ? [formatted] : []
            );

            // Load shortlisted contractors from Firestore
            if (data.shortlistedContractors) {
              setShortlistedContractors(data.shortlistedContractors);
            }
          }

          setLoadingProfile(false);
        } catch (err) {
          console.error("Error fetching profile data:", err);
          setError('Failed to load profile data');
          setLoadingProfile(false);
        }
      }
    };

    fetchProfileData();
  }, [user]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('myRenovations')) || [];
    setRenovations(saved);
  }, []);


  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        name: profileData.name,
        address: profileData.address
      });
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError('Failed to update profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwordData.newPassword);

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      setNotification({ message: 'Password updated successfully!', type: 'success' });
    } catch (err) {
      console.error("Error changing password:", err);
      setError(err.message);
    }
  };

  const handleRemoveRenovation = (indexToRemove) => {
    const updatedRenovations = renovations.filter((_, idx) => idx !== indexToRemove);
    setRenovations(updatedRenovations);
    localStorage.setItem('myRenovations', JSON.stringify(updatedRenovations));
    setNotification({ message: "Renovation removed successfully", type: "success" });
  };

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (loading || loadingProfile) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/")}>
          ←
        </button>
      </div>

      {notification && <Notification message={notification.message} type={notification.type} />}

      <h1 className='header-myprofile'>My Profile</h1>
      {error && <div className="error-message">{error}</div>}

      {/* Personal Information */}
<section className="profile-section">
  <div className="section-header">
    <h2>Personal Information</h2>
    {!editMode && (
      <button onClick={() => setEditMode(true)} className="edit-button">
        Edit Profile
      </button>
    )}
  </div>

  {editMode ? (
    <form onSubmit={handleProfileUpdate}>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={profileData.address}
          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
        />
      </div>

      {/* Change Password integrated into edit mode */}
      <div className="password-change-section">
        <div 
          className="section-header clickable" 
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          style={{ marginTop: '20px', marginBottom: '10px' }}
        >
          <h3>Change Password</h3>
          <span>{showPasswordForm ? '▼' : '▶'}</span>
        </div>

        {showPasswordForm && (
          <div className="password-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
                minLength="6"
              />
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="save-button">Save Changes</button>
        <button 
          type="button" 
          onClick={() => {
            setEditMode(false);
            setShowPasswordForm(false);
            setPasswordData({
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
          }} 
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <div className="profile-details">
      <p><strong>Full Name:</strong> {profileData.name || 'Not provided'}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Address:</strong> {profileData.address || 'Not provided'}</p>
      <p><strong>Member Since:</strong> {profileData.memberSince}</p>
      
      {/* Change Password toggle in view mode */}
      <div 
        className="section-header clickable" 
        onClick={() => setShowPasswordForm(!showPasswordForm)}
        style={{ marginTop: '20px' }}
      >
        <h3>Change Password</h3>
        <span>{showPasswordForm ? '▼' : '▶'}</span>
      </div>

      {showPasswordForm && (
        <form onSubmit={handlePasswordChange} className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
              minLength="6"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">Update Password</button>
            <button
              type="button"
              onClick={() => {
                setShowPasswordForm(false);
                setPasswordData({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                });
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )}
</section>

      {/* Address History */}
      {/* {addressHistory.length > 0 && (
        <section className="profile-section">
          <h2>Addresses Used</h2>
          <ul className="address-history">
            {addressHistory.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </section>
      )} */}

      {/* My Renovations */}
      <section className="profile-section">
        <h2 className='header-renovations'>My Renovations</h2>
        {renovations.length === 0 ? (
          <div className="placeholder-section">
            <p>Your renovation projects will appear here once you start planning.</p>
            <button className="cta-button" onClick={() => navigate("/renovation")}>
              Start a Renovation Project
            </button>
          </div>
        ) : (
          <div className="renovation-list">
            {renovations.map((reno, index) => (
              <div 
                className={`reno-card ${expandedCards[index] ? 'expanded' : ''}`} 
                key={index}
              >
                <div className="card-header" onClick={() => toggleCard(index)}>
                  <div>
                    <h3>{reno.address}</h3>
                    <p><strong>Type:</strong> {reno.renovationType}</p>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="remove-button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveRenovation(index);
                      }}
                    >
                      ×
                    </button>
                    <span className={`expand-arrow ${expandedCards[index] ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {expandedCards[index] && (
                  <div className="card-content">
                    <div className="reno-images">
                      <img src={reno.beforeImg} alt="Before Renovation" />
                      <img src={reno.afterImg} alt="After Renovation" />
                    </div>
                    <div className="financials">
                      <p><strong>Current Value:</strong> ${reno.financials?.currentPrice?.toLocaleString()}</p>
                      <p><strong>Future Value:</strong> ${reno.financials?.postValue?.toLocaleString()}</p>
                      <p><strong>Renovation Cost:</strong> ${reno.financials?.renovationCost?.toLocaleString()}</p>
                      <p><strong>ROI:</strong> {reno.financials?.roi}% (Positive by {reno.financials?.roiPositiveYear})</p>
                    </div>
                    {/* <h4>Shortlisted Contractors:</h4>
                    <ul>
                      {reno.shortlistedContractors?.map((c, i) => (
                        <li key={i}>{c.name} - {c.address}</li>
                      ))}
                    </ul> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

       {/* Shortlisted Contractors */}
      <section className="profile-section">
        <h2 className='header-portfolio'>Shortlisted Contractors</h2>
        {shortlistedContractors.length === 0 ? (
          <div className="placeholder-section">
            <p>You haven't shortlisted any contractors yet.</p>
            {/* <button className="cta-button" onClick={() => navigate("/contractors")}>
              Browse Contractors
            </button> */}
          </div>
        ) : (
          <div className="contractors-list">
            {shortlistedContractors.map((contractor, index) => (
              <div className="contractor-card" key={index}>
                <div className="contractor-header">
                  <h3>{contractor.name}</h3>
                  {contractor.rating && (
                    <div className="contractor-rating">
                      <span className="stars">{'★'.repeat(Math.round(contractor.rating))}</span>
                      <span className="rating-value">({contractor.rating.toFixed(1)})</span>
                    </div>
                  )}
                </div>
                
                <div className="contractor-details">
                  <p><strong>Address:</strong> {contractor.address}</p>
                  {contractor.phone && <p><strong>Phone:</strong> {contractor.phone}</p>}
                  {contractor.website && (
                    <p>
                      <strong>Website:</strong> 
                      <a href={contractor.website.startsWith('http') ? contractor.website : `https://${contractor.website}`} 
                         target="_blank" 
                         rel="noopener noreferrer">
                        {contractor.website}
                      </a>
                    </p>
                  )}
                  {contractor.specialties && (
                    <p><strong>Specialties:</strong> {contractor.specialties.join(', ')}</p>
                  )}
                </div>

                <div className="contractor-actions">
                  <button 
                    className="contact-button"
                    onClick={() => window.location.href = `tel:${contractor.phone}`}
                    disabled={!contractor.phone}
                  >
                    Call
                  </button>
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveContractor(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sign Out */}
      <button onClick={onSignOut} className="profile-signout-button">Sign Out</button>
    </div>
  );

  function handleRemoveContractor(index) {
    const updatedContractors = [...shortlistedContractors];
    updatedContractors.splice(index, 1);
    setShortlistedContractors(updatedContractors);
    
    // Update Firestore
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      updateDoc(docRef, {
        shortlistedContractors: updatedContractors
      }).then(() => {
        setNotification({ message: "Contractor removed successfully", type: "success" });
      }).catch(err => {
        console.error("Error updating contractors:", err);
        setNotification({ message: "Failed to remove contractor", type: "error" });
      });
    }
  }
};

export default ProfilePage;