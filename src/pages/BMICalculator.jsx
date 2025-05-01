import React, { useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = () => {
    // Reset error
    setError('');

    // Validate inputs
    if (!height || !weight) {
      setError('Please enter both height and weight');
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
      setError('Please enter valid numbers');
      return;
    }

    // Calculate BMI
    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmiValue * 10) / 10;
    setBmi(roundedBMI);

    // Determine category
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue < 25) {
      setCategory('Normal');
    } else if (bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  return (
    <div className="calculator-card">
      <h2 className="calculator-title">BMI Calculator</h2>
      
      <div className="form-group">
        <label className="form-label">Height (cm)</label>
        <input
          type="number"
          className="form-input"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height in centimeters"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Weight (kg)</label>
        <input
          type="number"
          className="form-input"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight in kilograms"
        />
      </div>

      <button className="btn btn-block" onClick={calculateBMI}>
        Calculate BMI
      </button>

      {error && (
        <div className="result result-error">
          {error}
        </div>
      )}

      {bmi && !error && (
        <div className="result result-success">
          <h3>Your BMI: {bmi}</h3>
          <p>Category: {category}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator; 