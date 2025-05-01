import React, { useState } from 'react';

const CalorieCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState(null);
  const [error, setError] = useState('');

  const calculateCalories = () => {
    // Reset error
    setError('');

    // Validate inputs
    if (!age || !height || !weight) {
      setError('Please fill in all fields');
      return;
    }

    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum)) {
      setError('Please enter valid numbers');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,      // Little or no exercise
      light: 1.375,        // Light exercise 1-3 days/week
      moderate: 1.55,       // Moderate exercise 3-5 days/week
      active: 1.725,       // Hard exercise 6-7 days/week
      veryActive: 1.9      // Very hard exercise & physical job or training twice per day
    };

    let tdee = bmr * activityMultipliers[activityLevel];

    // Adjust for goal
    const goalAdjustments = {
      lose: -500,    // Weight loss (deficit)
      maintain: 0,   // Maintenance
      gain: 500      // Weight gain (surplus)
    };

    tdee += goalAdjustments[goal];

    setCalories(Math.round(tdee));
  };

  return (
    <div className="calculator-card">
      <h2 className="calculator-title">Calorie Calculator</h2>
      
      <div className="form-group">
        <label className="form-label">Age</label>
        <input
          type="number"
          className="form-input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Gender</label>
        <select 
          className="form-input" 
          value={gender} 
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

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

      <div className="form-group">
        <label className="form-label">Activity Level</label>
        <select 
          className="form-input" 
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
        <label className="form-label">Goal</label>
        <select 
          className="form-input" 
          value={goal} 
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="lose">Weight Loss</option>
          <option value="maintain">Maintenance</option>
          <option value="gain">Weight Gain</option>
        </select>
      </div>

      <button className="btn btn-block" onClick={calculateCalories}>
        Calculate Calories
      </button>

      {error && (
        <div className="result result-error">
          {error}
        </div>
      )}

      {calories && !error && (
        <div className="result result-success">
          <h3>Your Daily Calorie Needs: {calories} calories</h3>
          <p>
            {goal === 'lose' && 'This is a calorie deficit to help you lose weight.'}
            {goal === 'maintain' && 'This will help you maintain your current weight.'}
            {goal === 'gain' && 'This is a calorie surplus to help you gain weight.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator; 