import React, { useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return { name: 'Underweight', color: '#f59e0b' };
    if (bmiValue < 25) return { name: 'Normal Weight', color: '#10b981' };
    if (bmiValue < 30) return { name: 'Overweight', color: '#f59e0b' };
    return { name: 'Obese', color: '#ef4444' };
  };

  const calculateBMI = () => {
    setError('');

    if (!height || !weight) {
      setError('Please enter both height and weight');
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
      setError('Please enter valid positive numbers');
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmiValue * 10) / 10;
    
    setBmi(roundedBMI);
    setCategory(getBMICategory(bmiValue));
  };

  return (
    <div className="calculator-container">
      <h1>⚖️ BMI Calculator</h1>
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in centimeters"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kilograms"
          />
        </div>

        <button onClick={calculateBMI}>Calculate BMI</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {bmi && !error && (
        <div className="calculator-grid">
          <div className="calculator-item">
            <div className="calculator-label">Your BMI</div>
            <div className="calculator-value">{bmi}</div>
            <div className="calculator-note">Body Mass Index</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Category</div>
            <div className="calculator-value" style={{ color: category.color }}>
              {category.name}
            </div>
            <div className="calculator-note">Weight classification</div>
          </div>
        </div>
      )}

      {bmi && !error && (
        <div className="water-tip">
          💡 BMI is a useful screening tool, but it doesn't directly measure body fat or account for muscle mass. Consider consulting with a healthcare professional for a complete health assessment.
        </div>
      )}
    </div>
  );
};

export default BMICalculator; 