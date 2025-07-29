import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';

function Home() {
  const { user } = useUser();

  const features = [
    {
      path: '/meal-tracker',
      title: 'Meal Tracker',
      description: 'Log your daily meals and track calorie intake with detailed nutritional breakdown',
      icon: '📱'
    },
    {
      path: '/meal-planner',
      title: 'Meal Planner',
      description: 'Generate personalized weekly and monthly meal plans for optimal nutrition',
      icon: '📅'
    },
    {
      path: '/nutrition-info',
      title: 'Nutrition Info',
      description: 'Get detailed nutritional information for thousands of food items',
      icon: '📊'
    },
    {
      path: '/calorie-calculator',
      title: 'Calorie Calculator',
      description: 'Calculate your daily calorie needs based on your goals and activity level',
      icon: '🔥'
    }
  ];

  return (
    <div className="home-container">
      <SignedOut>
        <div className="home-header">
          <h1>NutriTrack</h1>
          <p>Your complete nutrition companion. Track meals, plan your diet, and achieve your health goals with science-based insights.</p>
          <div className="cta-buttons">
            <Link to="/sign-up" className="cta-button primary">
              Get Started Free
            </Link>
            <Link to="/sign-in" className="cta-button secondary">
              Sign In
            </Link>
          </div>
        </div>
        
        <div className="features-preview">
          <div className="features-section">
            <h2>Powerful Features to Transform Your Health</h2>
            <div className="calculators-grid">
              {features.map((feature, index) => (
                <div key={index} className="calculator-card preview-card">
                  <div className="card-icon">{feature.icon}</div>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                  <div className="preview-overlay">
                    <Link to="/sign-up" className="preview-cta">
                      Sign Up to Access
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="home-content">
          <div className="home-header signed-in-header">
            <h1>Welcome back, {user?.firstName || 'there'}! 👋</h1>
            <p>Ready to continue your nutrition journey? Choose a tool below to get started.</p>
          </div>
          
          <div className="features-section">
            <div className="calculators-grid">
              {features.map((feature, index) => (
                <Link key={index} to={feature.path} className="calculator-card">
                  <div className="card-icon">{feature.icon}</div>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default Home; 