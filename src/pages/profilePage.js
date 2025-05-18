// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { auth, db, doc, getDoc, updateDoc } from '../firebase.js';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import './profilePage.css';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
    
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();


  // Add this temporary check to your ProfilePage.jsx
useEffect(() => {
    console.log("Current Firebase user:", user);
    console.log("User UID:", user?.uid);
  }, [user]);

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
              memberSince: new Date(user.metadata.creationTime).toLocaleDateString()
            });
            
            // For address history (would come from renovations)
            setAddressHistory(data.formattedAddress || []);
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
      
      // Reauthenticate user
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, passwordData.newPassword);
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      alert('Password updated successfully!');
    } catch (err) {
      console.error("Error changing password:", err);
      setError(err.message);
    }
  };

  if (loading || loadingProfile) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
        <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <h1 className='header-myprofile'>My Profile</h1>
      
      {error && <div className="error-message">{error}</div>}

      {/* Personal Information Section */}
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
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={profileData.email}
                disabled
              />
              <small>(Email cannot be changed)</small>
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={profileData.address}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Member Since</label>
              <input
                type="text"
                value={profileData.memberSince}
                disabled
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-button">Save Changes</button>
              <button type="button" onClick={() => setEditMode(false)} className="cancel-button">
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
          </div>
        )}
      </section>

      {/* Change Password Section */}
      <section className="profile-section">
        <div 
          className="section-header clickable" 
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          <h2>Change Password</h2>
          <span>{showPasswordForm ? '▼' : '▶'}</span>
        </div>
        
        {showPasswordForm && (
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
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
      </section>

      {/* Address History Section */}
      {addressHistory.length > 0 && (
        <section className="profile-section">
          <h2>Addresses Used</h2>
          <ul className="address-history">
            {addressHistory.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Investment Portfolio Section (Placeholder) */}
      <section className="profile-section">
        <h2 className='header-portfolio'>Investment Portfolio</h2>
        <div className="placeholder-section">
          <p>Your investment portfolio will appear here once you start investing.</p>
          <button className="cta-button">Start Investing</button>
        </div>
      </section>

      {/* My Renovations Section (Placeholder) */}
      <section className="profile-section">
        <h2 className='header-renovations'>My Renovations</h2>
        <div className="placeholder-section">
          <p>Your renovation projects will appear here once you start planning.</p>
          <button className="cta-button">Start a Renovation Project</button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;