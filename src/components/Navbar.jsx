import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/meal-tracker', label: 'Meal Tracker', icon: '📱', protected: true },
    { path: '/meal-planner', label: 'Meal Planner', icon: '📅', protected: true },
    { path: '/nutrition-info', label: 'Nutrition Info', icon: '📊', protected: true },
    { path: '/calorie-calculator', label: 'Calculator', icon: '🔥', protected: true },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">🥗</div>
          <span className="brand-text">NutriTrack</span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          {navItems.map((item) => (
            <React.Fragment key={item.path}>
              {item.protected ? (
                <SignedIn>
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.label}</span>
                  </Link>
                </SignedIn>
              ) : (
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="navbar-actions">
          <SignedOut>
            <div className="auth-buttons">
              <Link to="/sign-in" className="btn btn-ghost">
                Sign In
              </Link>
              <Link to="/sign-up" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </SignedOut>
          
          <SignedIn>
            <div className="user-section">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'user-avatar-enhanced',
                    userButtonPopoverCard: 'user-popover-enhanced'
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>

        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'mobile-menu-btn-open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar; 