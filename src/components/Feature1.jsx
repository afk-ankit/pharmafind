import React from 'react';
import '../styles/Feature1.css';

const Feature1 = () => {
  return (
    <div className="features-section">
      <div className="features-container">
        {/* Feature Cards */}
        <div className="feature-card">
          <div className="icon-container">
            <i className="icon">💰</i>
          </div>
          <h4>Lowest Price Guarantee</h4>
          <p>Find the best deals online and offline</p>
        </div>
        <div className="feature-card">
          <div className="icon-container">
            <i className="icon">✅</i>
          </div>
          <h4>Verified Vendors</h4>
          <p>Trusted sellers for your safety</p>
        </div>
        <div className="feature-card">
          <div className="icon-container">
            <i className="icon">📞</i>
          </div>
          <h4>24/7 Support</h4>
          <p>Ready to assist you anytime</p>
        </div>
        <div className="feature-card">
          <div className="icon-container">
            <i className="icon">🔍</i>
          </div>
          <h4>Comprehensive Inventory</h4>
          <p>Wide selection of medicines</p>
        </div>
      </div>

      {/* Promotional Banners */}
      <div className="promo-container">
        <div className="promo-card blue">
          <h3>Big Sale</h3>
          <h2>Get an Extra <span>50% Off</span></h2>
          <p>Libero diam auctor tristique hendrerit in eu vel id.</p>
        </div>
        <div className="promo-card dark-blue">
          <h3>Take the discount for the first shopping on our website</h3>
          <h2>30%</h2>
          <button className="shop-now">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Feature1;