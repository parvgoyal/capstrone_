import React, { useState } from 'react';

const CalorieCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const calculateCalories = () => {
    setError('');

    if (!age || !height || !weight) {
      setError('Please fill in all fields');
      return;
    }

    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum) || 
        ageNum <= 0 || heightNum <= 0 || weightNum <= 0) {
      setError('Please enter valid positive numbers');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    // Goal adjustments
    const goalAdjustments = {
      lose: -500,
      maintain: 0,
      gain: 500
    };

    const targetCalories = tdee + goalAdjustments[goal];

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: Math.round(targetCalories),
      goal: goal
    });
  };

  const getGoalDescription = (goalType) => {
    switch(goalType) {
      case 'lose': return 'Weight Loss (500 cal deficit)';
      case 'maintain': return 'Weight Maintenance';
      case 'gain': return 'Weight Gain (500 cal surplus)';
      default: return '';
    }
  };

  return (
    <div className="calculator-container">
      <h1>🔥 Calorie Calculator</h1>
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
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
          <label htmlFor="goal">Goal</label>
          <select 
            id="goal"
            value={goal} 
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="lose">Weight Loss</option>
            <option value="maintain">Maintenance</option>
            <option value="gain">Weight Gain</option>
          </select>
        </div>

        <button onClick={calculateCalories}>Calculate Calories</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {results && !error && (
        <div className="calculator-grid">
          <div className="calculator-item">
            <div className="calculator-label">BMR</div>
            <div className="calculator-value">{results.bmr}</div>
            <div className="calculator-note">Basal Metabolic Rate</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">TDEE</div>
            <div className="calculator-value">{results.tdee}</div>
            <div className="calculator-note">Total Daily Energy</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Target Calories</div>
            <div className="calculator-value">{results.target}</div>
            <div className="calculator-note">For your goal</div>
          </div>
          <div className="calculator-item">
            <div className="calculator-label">Goal</div>
            <div className="calculator-value">{getGoalDescription(results.goal)}</div>
            <div className="calculator-note">Your selected target</div>
          </div>
        </div>
      )}

      {results && !error && (
        <div className="water-tip">
          💡 These calculations are based on the Mifflin-St Jeor equation. Individual needs may vary based on genetics, medical conditions, and other factors. Consider consulting with a nutritionist for personalized advice.
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator; 