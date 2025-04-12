import React, { useState, useRef, useEffect } from 'react';
import "./renovation.css";
import { useNavigate } from 'react-router-dom';
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify'; // For user notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify styling

const Renovation = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [address, setAddress] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');
  const [error, setError] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagePreview, setImagePreview] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAddressFromHome, setIsAddressFromHome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backendData, setBackendData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const fileInputRef = useRef(null);

  const options = [
    { value: 'Kitchen Remodel', label: 'Kitchen Remodel' },
    { value: 'Bathroom Upgrade', label: 'Bathroom Upgrade' },
    { value: 'Full Home Remodel', label: 'Full Home Remodel' },
  ];

  const Notification = ({ message, type }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className={`notification ${type}`}>
        {message}
      </div>
    );
  };

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

  useEffect(() => {
    const savedAddress = sessionStorage.getItem('savedAddress');
    if (savedAddress) {
      setFormattedAddress(savedAddress);
      setIsAddressFromHome(true);
      console.log('Loaded saved address from session:', savedAddress);
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      const errorMsg = 'Please enter a valid address.';
      setError(errorMsg);
      setNotification({ message: errorMsg, type: 'error' });
      console.error('Address submission failed:', errorMsg);
      return;
    }
    setFormattedAddress(address);
    setNotification({ message: 'Address saved successfully!', type: 'success' });
    console.log('Address saved:', address);
    setError('');
    setAddress("");
    
    if (!isAddressFromHome) {
      sessionStorage.setItem('savedAddress', address);
      console.log('Address stored in session storage');
    }
  };

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

  const handleOptionSelect = (optionValue) => {
    setSelectedOption(optionValue);
    console.log('Renovation type selected:', optionValue);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    // Enhanced console log for debugging
    console.log('File selected:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date(file.lastModified).toLocaleString()
    });

    if (!file.type.startsWith('image/jpeg')) {
      const errorMsg = 'Please upload a JPG image.';
      setError(errorMsg);
      setNotification({ message: errorMsg, type: 'error' });
      console.error('Image upload failed:', errorMsg, 'File type:', file.type);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      const errorMsg = 'Image must be smaller than 5MB';
      setError(errorMsg);
      setNotification({ message: errorMsg, type: 'error' });
      console.error('Image too large:', (file.size / (1024*1024)).toFixed(2), 'MB');
      return;
    }

    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setOriginalImageUrl(imageUrl); // Store the original image URL
    
    // Success log with all details
    console.log('Image successfully uploaded:', {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      previewUrl: imageUrl,
      dimensions: 'Will be available after load'
    });
    
    // Optional: Log when the image is actually loaded
    const img = new Image();
    img.onload = () => {
      console.log('Image loaded:', {
        width: img.width,
        height: img.height,
        aspectRatio: (img.width/img.height).toFixed(2)
      });
    };
    img.src = imageUrl;

    setNotification({ message: 'Image uploaded successfully!', type: 'success' });
    setError('');
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
      console.log('Camera opened successfully');
    } catch (error) {
      const errorMsg = 'Could not access camera. Please check permissions.';
      console.error('Camera error:', error);
      setError(errorMsg);
      setNotification({ message: errorMsg, type: 'error' });
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 300, 200);
      const imageData = canvasRef.current.toDataURL('image/png');
      setCapturedImage(imageData);
      setOriginalImageUrl(imageData); // Store the original image URL

      
      // Close camera immediately after capture
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOpen(false);

      fetch(imageData)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'captured-image.png', { type: 'image/png' });
          setImage(file);
          setNotification({ message: 'Image captured successfully!', type: 'success' });
        })
        .catch(error => {
          console.error('Error processing captured image:', error);
          setNotification({ message: 'Error processing image', type: 'error' });
        });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => {
        track.stop();
        track.enabled = false;
      });
      videoRef.current.srcObject = null;
      console.log('Camera completely stopped and released');
    }
    setIsCameraOpen(false);
  };

  const removeImage = () => {
    stopCamera();
    setImage(null);
    setImagePreview('');
    setCapturedImage(null);
    setOriginalImageUrl('');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    console.log('Image removed and camera fully closed');
    setNotification({ message: 'Image removed', type: 'error' });
  };

  const saveDataToFile = () => {
    const pdf = new jsPDF();
    
    // Add text data
    pdf.setFontSize(12);
    pdf.text(popupMessage, 10, 20);
    
    // Add images if available
    let yPosition = 40;
    
    if (originalImageUrl) {
      pdf.text('Before Renovation', 10, yPosition);
      yPosition += 10;
      pdf.addImage(originalImageUrl, 'JPEG', 10, yPosition, 90, 60);
    }
    
    if (generatedImage) {
      pdf.text('After Renovation', 110, yPosition);
      yPosition += 10;
      pdf.addImage(generatedImage, 'JPEG', 110, yPosition, 90, 60);
    }
    
    pdf.save("renovation-report.pdf");
    toast.success("Report saved successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formattedAddress || !selectedOption || !image) {
      const errorMsg = 'Please complete all fields: address, renovation type, and image.';
      setError(errorMsg);
      setNotification({ message: errorMsg, type: 'error' });
      console.error('Submission failed:', errorMsg);
      return;
    }

    console.log('Starting renovation process with:', {
      formattedAddress: formattedAddress,
      renovation_type: selectedOption,
      image_data: image.name
    });

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('formattedAddress', formattedAddress);
      formData.append('renovation_type', selectedOption);

      const response = await fetch('https://f48c-20-185-56-188.ngrok-free.app/process_renovation', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process renovation.');
      }

      
    // Handle both JSON data and image blob
    const contentType = response.headers.get('content-type');
    let data, imageBlob;

    if (contentType.includes('application/json')) {
      // If response is JSON with image data
      data = await response.json();
      
      // Check if image is base64 encoded
      if (data.generated_image) {
        setGeneratedImage(`data:image/jpeg;base64,${data.generated_image}`);
      }
    } else if (contentType.includes('image/jpeg')) {
      // If response is direct image
      imageBlob = await response.blob();
      setGeneratedImage(URL.createObjectURL(imageBlob));
      data = {}; // You might need to get metadata another way
    }

      const formattedResponse = `
        Address: ${data.formattedAddress}
        Renovation Type: ${data.renovation_type}
        Current Price: $${data.currentPrice}
        Post-Renovation Value: $${data.postRenovationValue}
        Renovation Cost: $${data.renovation_cost}
        ROI: ${data.roi.toFixed(2)}%
        ROI Positive Year: ${data.roiPositiveYear}
      `;

      setPopupMessage(formattedResponse);
      setShowPopup(true);
      setNotification({ message: 'Renovation analysis complete!', type: 'success' });
    
    } catch (error) {
      console.error('Processing error during renovation:', error);
      setPopupMessage(error.message);
      setNotification({ message: error.message, type: 'error' });
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="renovation-page">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <form onSubmit={handleSubmit}>
        {/* Address Input Section */}
        <div className="address-section">
          <h2>Enter Your Address</h2>
          {formattedAddress && isAddressFromHome ? (
            <div className="saved-address">
              <p>Given address: <strong>{formattedAddress}</strong></p>
              <button 
                type="button"
                className="change-address-button" 
                onClick={() => {
                  setFormattedAddress('');
                  setIsAddressFromHome(false);
                  sessionStorage.removeItem('savedAddress');
                  console.log('Address changed, removed from session storage');
                }}
              >
                Change Address
              </button>
            </div>
          ) : (
            <div>
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
                  console.log('Address selected from Google:', address);
                }}
                options={{ types: ['address'], componentRestrictions: { country: 'us' } }}
                placeholder="(e.g. 8 Leland Ave, Reading, PA, 19609)"
                className="google-autocomplete-input"
              />
              <button 
                type="button" 
                className="submit-button" 
                onClick={handleAddressSubmit}
              >
                Save Address
              </button>
            </div>
          )}
        </div>

        {/* Renovation Type Section */}
        <div className="content">
          <h2 className="renovation-title">What do you want to renovate?</h2>
          <div className="tile-grid">
            {options.map((option) => (
              <div 
                key={option.value} 
                className={`tile ${selectedOption === option.value ? 'selected' : ''}`} 
                onClick={() => handleOptionSelect(option.value)}
              >
                <img src={getImageForOption(option.value)} alt={option.label} className="tile-image" />
                <span className="tile-label">{option.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="upload-section">
          <h2>Upload or Capture a Picture</h2>
          <p>Upload a picture of the area you want to renovate</p>
          
          <div className="image-input-options">
            <div className="upload-option">
              <input
                type="file"
                id="file-upload"
                accept="image/jpeg"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              <label htmlFor="file-upload" className="upload-button">
                Choose File
              </label>
            </div>
            
            <div className="capture-option">
              <button 
                type="button" 
                onClick={openCamera} 
                className="capture-button"
              >
                Capture Image
              </button>
            </div>
          </div>

          {isCameraOpen && (
            <div className={`camera-container ${isCameraOpen ? 'is-camera-active' : ''}`}>
              <video ref={videoRef} autoPlay style={{ width: '300px' }} />
              <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="200" />
              <div className="camera-controls">
                <button 
                  type="button" 
                  onClick={captureImage} 
                  className="capture-icon-button"
                  aria-label="Capture image"
                >
                </button>
              </div>
            </div>
          )}

          {(imagePreview || capturedImage) && (
            <div className="image-preview">
              <img 
                src={capturedImage || imagePreview} 
                alt="Preview" 
                className="preview-image" 
              />
              <button 
                type="button" 
                className="remove-image-button" 
                onClick={removeImage}
                aria-label="Remove image"
              />
            </div>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="submit-section">
          <button 
            type="submit" 
            className={`renovate-button ${isLoading ? 'loading' : ''}`}
            disabled={!formattedAddress || !selectedOption || !image || isLoading}
          >
            {isLoading ? (
              <div className="loading-content">
                <div className="spinner"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Renovate'
            )}
          </button>
        </div>
      </form>

      {/* Results Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button 
              className="close-popup-button" 
              onClick={() => setShowPopup(false)}
            >×
            </button>
            <h2>Renovation Results</h2>

            <div className="data-display">
              <pre>{popupMessage}</pre>
            </div>

            {/* Image Comparison Section */}
      <div className="image-comparison-container">
        {/* Original Image (Before) */}
        <div className="image-comparison-item">
          <h3>Before Renovation</h3>
          {originalImageUrl && (
            <img 
              src={originalImageUrl} 
              alt="Original Space" 
              className="comparison-image"
              onError={(e) => {
                console.error('Original image failed to load');
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
        
        {/* Generated Image (After) */}
        <div className="image-comparison-item">
          <h3>After Renovation</h3>
          {generatedImage ? (
            <img 
              src={generatedImage} 
              alt="Suggested Renovation" 
              className="comparison-image"
              onError={(e) => {
                console.error('Generated image failed to load');
                e.target.style.display = 'none';
                setNotification({
                  message: 'Failed to load generated image',
                  type: 'error'
                });
              }}
            />
          ) : (
            <div className="image-loading-placeholder">
              <p>Generating renovation preview...</p>
              <div className="spinner"></div>
            </div>
            )}
            </div>
            </div>


            <div className="popup-buttons">
              <button 
                className="save-data-button"
                onClick={saveDataToFile}
              >
                Save Results
              </button>
              {/* <button 
                className="close-button" 
                onClick={() => setShowPopup(false)}
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Renovation;