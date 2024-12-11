import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="navbar sticky top-0">
      <div className="navbar-left">
        <img src={Logo} alt="PharmaFind Logo" className="navbar-logo" />
        <span className="navbar-brand">PharmaFind</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">Home</Link>

        <Link to="/login" className="navbar-link">Login</Link>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;