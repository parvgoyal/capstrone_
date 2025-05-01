import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          Health Calculator
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'mobile-menu' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/bmi-calculator" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            BMI Calculator
          </Link>
          <Link to="/calorie-calculator" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Calorie Calculator
          </Link>
          <Link to="/water-intake-calculator" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Water Intake
          </Link>
          <Link to="/ideal-weight-calculator" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Ideal Weight
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 