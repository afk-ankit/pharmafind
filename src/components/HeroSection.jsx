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

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (isSearchEnabled) {
      // Navigate with query parameters
      navigate(`/search?medicine=${encodeURIComponent(medicineName)}&pincode=${pincode}&offline=${includeOffline}`);
    }
  };

  const handleOfflineCheckboxChange = (e) => {
    setIncludeOffline(e.target.checked);
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="main-title">Your medicines, Better prices </h1>
        <p className="customer-count">Meds made simple.</p>

        <form onSubmit={handleSearch} className="search-container">
          <div className="search-box">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter medicine name"
                className="search-input"
                value={medicineName}
                onChange={handleMedicineNameChange}
                required
              />
              <input
                type="text"
                placeholder="Enter pincode"
                className="search-input"
                value={pincode}
                onChange={handlePincodeChange}
                pattern="\d{6}"
                required
              />
              <button
                type="submit"
                className="search-button"
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
                <span>Include online results</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;