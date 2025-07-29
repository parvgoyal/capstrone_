import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#api' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#privacy' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', href: 'https://github.com' },
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
    { name: 'Instagram', icon: '📸', href: 'https://instagram.com' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="brand-icon">🥗</div>
              <span className="brand-text">NutriTrack</span>
            </div>
            <p className="footer-description">
              Your complete nutrition companion. Track meals, plan your diet, and achieve your health goals with science-based insights.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links">
            <div className="footer-section">
              <h3 className="footer-title">Product</h3>
              <ul className="footer-list">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Company</h3>
              <ul className="footer-list">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Support</h3>
              <ul className="footer-list">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="footer-section">
              <h3 className="footer-title">Get Started</h3>
              <div className="footer-actions">
                <SignedOut>
                  <Link to="/sign-up" className="footer-cta">
                    Start Free Trial
                  </Link>
                  <Link to="/sign-in" className="footer-link">
                    Sign In
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link to="/meal-tracker" className="footer-cta">
                    Track Meals
                  </Link>
                  <Link to="/meal-planner" className="footer-link">
                    Plan Meals
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} NutriTrack. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#terms" className="footer-bottom-link">Terms of Service</a>
              <a href="#privacy" className="footer-bottom-link">Privacy Policy</a>
              <a href="#cookies" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 