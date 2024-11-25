import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="logo-circle">⚕</div>
          <div className="logo-text">
            <span className="pharmacy-text">PharmaFind</span>
            <span className="store-text">store</span>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/blog">Blog & News</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="/educational">Educational</a></li>
              <li><a href="/mental-health">Mental Health Resources</a></li>
              <li><a href="/nutrition">Nutrition</a></li>
              <li><a href="/medication-guides">Medication Guides</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Our Social Media</h3>
            <div className="social-links">
              <a href="#" className="social-button">Instagram</a>
              <a href="#" className="social-button">Youtube</a>
              <a href="#" className="social-button">Facebook</a>
              <a href="#" className="social-button">LinkedIn</a>
              <a href="#" className="social-button">Twitter</a>
              <a href="#" className="social-button">Tik Tok</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2024 PharmaFind | Design by Praptipriyaph</p>
          <div className="footer-links">
            <a href="/terms">Terms of Use</a>
            <span className="separator">|</span>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;