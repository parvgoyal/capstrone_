import React, { useState } from 'react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [climate, setClimate] = useState('temperate');
  const [waterIntake, setWaterIntake] = useState(null);
  const [error, setError] = useState('');

  const calculateWaterIntake = () => {
    // Reset error
    setError('');

    // Validate inputs
    if (!weight) {
      setError('Please enter your weight');
      return;
    }

    const weightNum = parseFloat(weight);

    if (isNaN(weightNum)) {
      setError('Please enter a valid weight');
      return;
    }

    // Base calculation: 30-35ml per kg of body weight
    let baseWaterIntake = weightNum * 33; // Using 33ml as middle ground

    // Adjust for activity level
    const activityMultipliers = {
      sedentary: 1.0,    // No adjustment
      light: 1.1,        // +10%
      moderate: 1.2,     // +20%
      active: 1.3,       // +30%
      veryActive: 1.5    // +50%
    };

    baseWaterIntake *= activityMultipliers[activityLevel];

    // Adjust for climate
    const climateMultipliers = {
      temperate: 1.0,    // No adjustment
      hot: 1.2,          // +20%
      humid: 1.15,       // +15%
      cold: 0.9          // -10%
    };

    baseWaterIntake *= climateMultipliers[climate];

    // Convert to liters and round to 2 decimal places
    const waterIntakeLiters = Math.round(baseWaterIntake / 1000 * 100) / 100;
    
    // Convert to cups (1 cup = 240ml)
    const waterIntakeCups = Math.round(baseWaterIntake / 240 * 10) / 10;

    setWaterIntake({
      liters: waterIntakeLiters,
      cups: waterIntakeCups
    });
  };

  return (
    <div className="calculator-container">
      <h1>Water Intake Calculator</h1>
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>
        <div className="form-group">
          <label htmlFor="activity">Activity Level</label>
          <select
            id="activity"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very-active">Very Active</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="climate">Climate</label>
          <select
            id="climate"
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
          >
            <option value="temperate">Temperate</option>
            <option value="hot">Hot</option>
            <option value="very-hot">Very Hot</option>
          </select>
        </div>
        <button onClick={calculateWaterIntake}>Calculate</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {waterIntake && (
        <div className="calculator-grid">
          <div className="calculator-item">
            <div className="calculator-label">Daily Water Intake</div>
            <div className="calculator-value">{waterIntake.liters.toFixed(1)} L</div>
            <div className="calculator-note">({waterIntake.cups.toFixed(0)} cups)</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Activity Level</div>
            <div className="calculator-value">{activityLevel.charAt(0).toUpperCase() + activityLevel.slice(1)}</div>
            <div className="calculator-note">Climate: {climate.charAt(0).toUpperCase() + climate.slice(1)}</div>
          </div>
        </div>
      )}
      <div className="water-tip">
        Remember to spread your water intake throughout the day and adjust based on your thirst levels.
      </div>
    </div>
  );
};

export default WaterIntakeCalculator; 