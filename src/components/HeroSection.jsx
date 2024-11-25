import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const [medicineName, setMedicineName] = useState('');
  const [pincode, setPincode] = useState('');
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [includeOffline, setIncludeOffline] = useState(false);

  const navigate = useNavigate();

  const handleMedicineNameChange = (e) => {
    const value = e.target.value;
    setMedicineName(value);
    validateSearch(value, pincode);
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    setPincode(value);
    validateSearch(medicineName, value);
  };

  const validateSearch = (medicine, pin) => {
    // Check if medicine name is not empty and pincode is exactly 6 digits
    setIsSearchEnabled(
      medicine.trim() !== '' && 
      /^\d{6}$/.test(pin)
    );
  };

  const handleSearch = () => {
    if (isSearchEnabled) {
      navigate('/search', {
        state: {
          medicineName,
          pincode,
          includeOffline
        }
      });
    }
  };

  const handleOfflineCheckboxChange = (e) => {
    setIncludeOffline(e.target.checked);
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="main-title">Your trusted Medicine finding App</h1>
        <p className="customer-count">100k+ Satisfied Customers</p>
        
        <div className="search-container">
          <div className="search-box">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Enter medicine name"
                className="search-input"
                value={medicineName}
                onChange={handleMedicineNameChange}
              />
              <input 
                type="text" 
                placeholder="Enter pincode"
                className="search-input"
                value={pincode}
                onChange={handlePincodeChange}
              />
              <button 
                className="search-button"
                onClick={handleSearch}
                disabled={!isSearchEnabled}
              >
                <span>Search</span>
              </button>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox"
                  checked={includeOffline}
                  onChange={handleOfflineCheckboxChange}
                />
                <span>Include offline results</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
