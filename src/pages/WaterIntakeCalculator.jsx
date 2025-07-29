import React, { useState } from 'react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [climate, setClimate] = useState('temperate');
  const [waterIntake, setWaterIntake] = useState(null);
  const [error, setError] = useState('');

  const calculateWaterIntake = () => {
    setError('');

    if (!weight) {
      setError('Please enter your weight');
      return;
    }

    const weightNum = parseFloat(weight);

    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter a valid weight');
      return;
    }

    // Base calculation: 30-35ml per kg of body weight
    let baseWaterIntake = weightNum * 33;

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.3,
      veryActive: 1.5
    };

    baseWaterIntake *= activityMultipliers[activityLevel];

    // Climate multipliers
    const climateMultipliers = {
      temperate: 1.0,
      hot: 1.2,
      humid: 1.15,
      cold: 0.9
    };

    baseWaterIntake *= climateMultipliers[climate];

    const waterIntakeLiters = Math.round(baseWaterIntake / 1000 * 100) / 100;
    const waterIntakeCups = Math.round(baseWaterIntake / 240 * 10) / 10;

    setWaterIntake({
      liters: waterIntakeLiters,
      cups: waterIntakeCups,
      ml: Math.round(baseWaterIntake)
    });
  };

  return (
    <div className="calculator-container">
      <h1>💧 Water Intake Calculator</h1>
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight in kilograms"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="activity">Activity Level</label>
          <select
            id="activity"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
            <option value="veryActive">Very Active (hard exercise daily)</option>
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
            <option value="humid">Humid</option>
            <option value="cold">Cold</option>
          </select>
        </div>
        
        <button onClick={calculateWaterIntake}>Calculate Water Intake</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {waterIntake && (
        <div className="calculator-grid">
          <div className="calculator-item">
            <div className="calculator-label">Daily Water Intake</div>
            <div className="calculator-value">{waterIntake.liters} L</div>
            <div className="calculator-note">{waterIntake.ml} ml</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">In Cups</div>
            <div className="calculator-value">{waterIntake.cups}</div>
            <div className="calculator-note">8 fl oz cups</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Activity Level</div>
            <div className="calculator-value">{activityLevel.charAt(0).toUpperCase() + activityLevel.slice(1)}</div>
            <div className="calculator-note">Adjusted for lifestyle</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Climate</div>
            <div className="calculator-value">{climate.charAt(0).toUpperCase() + climate.slice(1)}</div>
            <div className="calculator-note">Environmental factor</div>
          </div>
        </div>
      )}
      
      {waterIntake && (
        <div className="water-tip">
          💡 Tip: Spread your water intake throughout the day. Start with a glass when you wake up and keep a water bottle nearby!
        </div>
      )}
    </div>
  );
};

export default WaterIntakeCalculator; 