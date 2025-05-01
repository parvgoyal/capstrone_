import React, { useState } from 'react';

const IdealWeightCalculator = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [idealWeight, setIdealWeight] = useState(null);
  const [error, setError] = useState('');

  const calculateIdealWeight = () => {
    // Reset error
    setError('');

    // Validate inputs
    if (!height) {
      setError('Please enter your height');
      return;
    }

    const heightNum = parseFloat(height);

    if (isNaN(heightNum)) {
      setError('Please enter a valid height');
      return;
    }

    // Convert height to cm if needed (assuming input is in cm)
    const heightInCm = heightNum;
    
    // Convert height to inches for some formulas
    const heightInInches = heightInCm / 2.54;
    
    // Convert height to meters for BMI-based calculation
    const heightInMeters = heightInCm / 100;

    // Calculate ideal weight using different formulas
    const calculations = {
      // BMI-based calculation (BMI of 22 is considered ideal)
      bmi: {
        name: 'BMI-based (BMI 22)',
        value: Math.round(22 * heightInMeters * heightInMeters * 10) / 10
      },
      
      // Devine Formula (1974)
      devine: {
        name: 'Devine Formula',
        value: gender === 'male' 
          ? Math.round((50 + 2.3 * (heightInInches - 60)) * 10) / 10
          : Math.round((45.5 + 2.3 * (heightInInches - 60)) * 10) / 10
      },
      
      // Robinson Formula (1983)
      robinson: {
        name: 'Robinson Formula',
        value: gender === 'male'
          ? Math.round((52 + 1.9 * (heightInInches - 60)) * 10) / 10
          : Math.round((49 + 1.7 * (heightInInches - 60)) * 10) / 10
      },
      
      // Miller Formula (1983)
      miller: {
        name: 'Miller Formula',
        value: gender === 'male'
          ? Math.round((56.2 + 1.41 * (heightInInches - 60)) * 10) / 10
          : Math.round((53.1 + 1.36 * (heightInInches - 60)) * 10) / 10
      }
    };

    setIdealWeight(calculations);
  };

  return (
    <div className="calculator-container">
      <h1>Ideal Weight Calculator</h1>
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
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
        <button onClick={calculateIdealWeight}>Calculate</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {idealWeight && (
        <div className="calculator-grid">
          <div className="calculator-item">
            <div className="calculator-label">BMI-Based Formula</div>
            <div className="calculator-value">{idealWeight.bmi.value} kg</div>
            <div className="calculator-note">Based on BMI of 22</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Devine Formula</div>
            <div className="calculator-value">{idealWeight.devine.value} kg</div>
            <div className="calculator-note">Most common formula</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Robinson Formula</div>
            <div className="calculator-value">{idealWeight.robinson.value} kg</div>
            <div className="calculator-note">Modified Devine formula</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Miller Formula</div>
            <div className="calculator-value">{idealWeight.miller.value} kg</div>
            <div className="calculator-note">Most recent formula</div>
          </div>
        </div>
      )}
      <div className="calculator-note">
        These are estimates based on different formulas. Consult with a healthcare professional for personalized advice.
      </div>
    </div>
  );
};

export default IdealWeightCalculator; 