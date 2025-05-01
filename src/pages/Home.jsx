import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Health Calculator</h1>
        <p>Calculate your health metrics with our easy-to-use calculators</p>
      </div>
      <div className="calculators-grid">
        <Link to="/bmi-calculator" className="calculator-card">
          <h2>BMI Calculator</h2>
          <p>Calculate your Body Mass Index and understand your weight category</p>
        </Link>
        <Link to="/calorie-calculator" className="calculator-card">
          <h2>Calorie Calculator</h2>
          <p>Calculate your daily calorie needs based on your activity level and goals</p>
        </Link>
      </div>
    </div>
  );
}

export default Home; 