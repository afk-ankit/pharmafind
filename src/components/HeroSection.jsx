import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const [medicineName, setMedicineName] = useState("");
  const [pincode, setPincode] = useState("");
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

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
    setIsSearchEnabled(medicine.trim() !== "" && /^\d{6}$/.test(pin));
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (isSearchEnabled) {
      // Navigate with query parameters
      navigate(
        `/search?medicine=${encodeURIComponent(medicineName)}&pincode=${pincode}`,
      );
    }
  };
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="main-title">Your medicines at better prices </h1>
        <p className="customer-count">
          Find the best deals on medicines—locally and online, all in one place!
        </p>

        <form onSubmit={handleSearch} className="search-container">
          <div className="search-box">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter medicine name"
                className="search-input text-black"
                value={medicineName}
                onChange={handleMedicineNameChange}
                required
              />
              <input
                type="text"
                placeholder="Enter pincode"
                className="search-input text-black"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
