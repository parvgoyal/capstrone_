import React, { useState } from 'react';

const IdealWeightCalculator = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [idealWeight, setIdealWeight] = useState(null);
  const [error, setError] = useState('');

  const calculateIdealWeight = () => {
    setError('');

    if (!height) {
      setError('Please enter your height');
      return;
    }

    const heightNum = parseFloat(height);

    if (isNaN(heightNum) || heightNum <= 0) {
      setError('Please enter a valid height');
      return;
    }

    const heightInCm = heightNum;
    const heightInInches = heightInCm / 2.54;
    const heightInMeters = heightInCm / 100;

    // Calculate ideal weight using different formulas
    const calculations = {
      bmi: {
        name: 'BMI-Based',
        value: Math.round(22 * heightInMeters * heightInMeters * 10) / 10,
        description: 'Based on BMI of 22'
      },
      devine: {
        name: 'Devine Formula',
        value: gender === 'male' 
          ? Math.round((50 + 2.3 * (heightInInches - 60)) * 10) / 10
          : Math.round((45.5 + 2.3 * (heightInInches - 60)) * 10) / 10,
        description: 'Most commonly used'
      },
      robinson: {
        name: 'Robinson Formula',
        value: gender === 'male'
          ? Math.round((52 + 1.9 * (heightInInches - 60)) * 10) / 10
          : Math.round((49 + 1.7 * (heightInInches - 60)) * 10) / 10,
        description: 'Modified Devine'
      },
      miller: {
        name: 'Miller Formula',
        value: gender === 'male'
          ? Math.round((56.2 + 1.41 * (heightInInches - 60)) * 10) / 10
          : Math.round((53.1 + 1.36 * (heightInInches - 60)) * 10) / 10,
        description: 'Most recent formula'
      }
    };

    setIdealWeight(calculations);
  };

  return (
    <div className="calculator-container">
      <h1>🎯 Ideal Weight Calculator</h1>
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height in centimeters"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <button onClick={calculateIdealWeight}>Calculate Ideal Weight</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {idealWeight && (
        <div className="calculator-grid">
          <div className="calculator-item">
            <div className="calculator-label">{idealWeight.bmi.name}</div>
            <div className="calculator-value">{idealWeight.bmi.value} kg</div>
            <div className="calculator-note">{idealWeight.bmi.description}</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">{idealWeight.devine.name}</div>
            <div className="calculator-value">{idealWeight.devine.value} kg</div>
            <div className="calculator-note">{idealWeight.devine.description}</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">{idealWeight.robinson.name}</div>
            <div className="calculator-value">{idealWeight.robinson.value} kg</div>
            <div className="calculator-note">{idealWeight.robinson.description}</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">{idealWeight.miller.name}</div>
            <div className="calculator-value">{idealWeight.miller.value} kg</div>
            <div className="calculator-note">{idealWeight.miller.description}</div>
          </div>
        </div>
      )}
      
      {idealWeight && (
        <div className="water-tip">
          💡 Note: These are estimates based on different scientific formulas. Individual factors like muscle mass, bone density, and overall health should be considered. Consult with a healthcare professional for personalized advice.
        </div>
      )}
    </div>
  );
};

export default IdealWeightCalculator; 