import React, { useState, useRef, useEffect } from 'react';
import "./renovationn.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ReactGoogleAutocomplete from "react-google-autocomplete";

const Renovation = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedOption, setSelectedOption] = useState('');
  const [address, setAddress] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');
  const [error, setError] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(null); // For uploaded image
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(''); // For image preview
  const [generatedImage, setGeneratedImage] = useState(''); // For generated image from backend
  const tileGridRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // To track if camera is open
  const [isAddressFromHome, setIsAddressFromHome] = useState(false);

  const options = [
    { value: 'Kitchen Remodel', label: 'Kitchen Remodel' },
    { value: 'Bathroom Upgrade', label: 'Bathroom Upgrade' },
    { value: 'Full Home Remodel', label: 'Full Home Remodel' },
  ];

  // Helper function to get image URL based on renovation type
  const getImageForOption = (value) => {
    switch (value) {
      case 'Kitchen Remodel':
        return 'https://png.pngtree.com/background/20230520/original/pngtree-kitchen-with-some-rustic-style-picture-image_2676030.jpg';
      case 'Bathroom Upgrade':
        return 'https://png.pngtree.com/background/20230522/original/pngtree-clean-and-modern-white-bathroom-picture-image_2688744.jpg';
      case 'Full Home Remodel':
        return 'https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799681.jpg';
      default:
        return 'https://th.bing.com/th/id/OIP.8M18_Vu6DC0gZsjcQMKJoQHaEK?rs=1&pid=ImgDetMain';
    }
  };

  // Check for saved address from home page when component mounts
  useEffect(() => {
    const savedAddress = sessionStorage.getItem('savedAddress');
    if (savedAddress) {
      setFormattedAddress(savedAddress);
      setIsAddressFromHome(true);
    }
  }, []);

  // Function to handle address form submission
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      setError('Please enter a valid address.');
      return;
    }
    setFormattedAddress(address);
    alert("Address saved!");
    setError('');
    setAddress(""); // Clear input after saving

  // Save to sessionStorage if not from home page
  if (!isAddressFromHome) {
    sessionStorage.setItem('savedAddress', address);
  }
};

  // Function to abbreviate street suffixes
  const abbreviateStreetSuffix = (streetName) => {
    const suffixMap = {
      'Street': 'St',
      'Avenue': 'Ave',
      'Road': 'Rd',
      'Boulevard': 'Blvd',
      'Drive': 'Dr',
      'Court': 'Ct',
      'Lane': 'Ln',
      'Place': 'Pl',
      'Square': 'Sq',
      'Trail': 'Trl',
      'Parkway': 'Pkwy',
      'Highway': 'Hwy',
    };

    for (const [fullSuffix, abbreviation] of Object.entries(suffixMap)) {
      if (streetName.endsWith(fullSuffix)) {
        return streetName.replace(fullSuffix, abbreviation);
      }
    }

    return streetName;
  };

  // Function to handle renovation type selection
  const handleOptionSelect = (optionValue) => {
    setSelectedOption(optionValue);
  };

  // Function to handle the renovation request
  const handleRenovate = async () => {
    if (!formattedAddress || !selectedOption) {
      setError('Please enter an address and select a renovation type.');
      return;
    }

    try {
      const payload = {
        formattedAddress,
        renovation_type: selectedOption,
      };

      console.log('Payload being sent:', payload); // Debugging log

      const response = await fetch('http://172.210.82.75/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(`Backend error: ${errorData.error || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);

      // Format the backend response into a user-friendly string
      const formattedResponse = `
        Address: ${data.formattedAddress}
        Renovation Type: ${data.renovation_type}
        Current Price: $${data.currentPrice}
        Post-Renovation Value: $${data.postRenovationValue}
        Renovation Cost: $${data.renovation_cost}
        ROI: ${data.roi.toFixed(2)}%
        ROI Positive Year: ${data.roiPositiveYear}
      `;

      // Display the backend response in the popup
      setPopupMessage(formattedResponse);
      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
      setPopupMessage(error.message); // Display the error message
      setShowPopup(true);
    }
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (must be JPG)
      if (!file.type.startsWith('image/jpeg')) {
        setError('Please upload a JPG image.');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
      setError(''); // Clear any previous errors
    }
  };

  // Function to handle image generation
  const handleGenerate = async () => {
    if (!image) {
      setError('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://172.210.82.75:80/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate image.');
      }

// Handle the response as a blob (PNG image)
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob); // Create a URL for the blob

    // Display the generated image in the popup
    setGeneratedImage(imageUrl);
    setPopupMessage('Image generated successfully!');
      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
      setPopupMessage('Failed to generate image.');
      setShowPopup(true);
    }
  };

  // / Open camera
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true); // Set camera state to open
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 300, 200);
      setCapturedImage(canvasRef.current.toDataURL('image/png'));
      stopCamera();
      setIsCameraOpen(false); // Set camera state to closed
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

   // Remove uploaded image
   const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  // Remove captured image
  const removeCapturedImage = () => {
    setCapturedImage(null);
  };

  return (
    <div className="renovation-page">
      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* Address Input Section */}
      <div className="address-section">
        <h2>Enter Your Address</h2>
        {formattedAddress && isAddressFromHome ? (
          <div className="saved-address">
            <p>Given address: <strong>{formattedAddress}</strong></p>
            <button 
              className="change-address-button" 
              onClick={() => {
                setFormattedAddress('');
                setIsAddressFromHome(false);
                sessionStorage.removeItem('savedAddress');
              }}
            >
              Change Address
            </button>
          </div>
        ) : (

        <form onSubmit={handleAddressSubmit}>
          <ReactGoogleAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            onPlaceSelected={(place) => {
              const addressComponents = place.address_components;
              let streetNumber = '';
              let streetName = '';
              let city = '';
              let state = '';
              let zip = '';

              addressComponents.forEach(component => {
                if (component.types.includes('street_number')) {
                  streetNumber = component.long_name;
                }
                if (component.types.includes('route')) {
                  streetName = abbreviateStreetSuffix(component.long_name);
                }
                if (component.types.includes('locality')) {
                  city = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                  state = component.short_name;
                }
                if (component.types.includes('postal_code')) {
                  zip = component.long_name;
                }
              });

              const address = `${streetNumber} ${streetName}, ${city}, ${state} ${zip}`;
              setAddress(address);
              console.log('Constructed Address:', address);
            }}
            options={{ types: ['address'], componentRestrictions: { country: 'us' } }}
            placeholder="(e.g. 8 Leland Ave, Reading, PA, 19609)"
            className="google-autocomplete-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Save Address</button>
        </form>
        )}
      </div>

      {/* Renovation Type Section */}
      <div className="content">
        <h2 className="renovation-title">What do you want to renovate?</h2>
        <div className="tile-grid" ref={tileGridRef}>
          {options.map((option) => (
            <div key={option.value} className={`tile ${selectedOption === option.value ? 'selected' : ''}`} onClick={() => handleOptionSelect(option.value)}>
              <img src={getImageForOption(option.value)} alt={option.label} className="tile-image" />
              <span className="tile-label">{option.label}</span>
            </div>
          ))}
        </div>

        <button className="renovate-button" onClick={handleRenovate}>Renovate</button>
      </div>

      {/* Image Upload Section */}
      <div className="upload-section">
        <h2>Upload or Capture a Picture</h2>
        <p>Upload a picture, and our AI will generate a suggested renovation image for you.</p>
        <input
          type="file"
          accept="image/jpeg"
          capture="environment" // Enable camera capture
          onChange={handleImageUpload}
        />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" className="preview-image" />
            <button className="remove-image-button" onClick={removeImage}>×</button>
          </div>
        )}
        {/* Camera Capture */}
        <button onClick={openCamera} className="capture-button">Capture</button>
        {isCameraOpen && (
          <div className="camera-container">
            <video ref={videoRef} autoPlay style={{ width: '300px' }} />
            <button onClick={captureImage} className="capture-icon-button">📷</button>
          </div>
        )}
        {capturedImage && (
          <div className="captured-image-preview">
            <img src={capturedImage} alt="Captured" className="preview-image" />
            <button className="remove-image-button" onClick={removeCapturedImage}>×</button>
          </div>
        )}       
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" className="preview-image" />
          </div>
        )}
        <br />
        <br />

        <button onClick={handleGenerate} className="generate-button">Generate</button>
      </div>

      {/* Popup to display backend response */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Backend Response</h2>
            <pre>{popupMessage}</pre> {/* Use <pre> to preserve formatting */}
            {generatedImage && (
              <div className="generated-image-preview">
                <img src={generatedImage} alt="Generated Renovation" className="preview-image" />
              </div>
            )}
            <button className="close-button" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};



export default Renovation;