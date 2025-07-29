import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const MealTracker = () => {
  const { user } = useUser();
  const [meals, setMeals] = useState([]);
  const [currentMeal, setCurrentMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast',
    date: new Date().toISOString().split('T')[0]
  });
  const [dailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  });

  // Load meals from localStorage on component mount (user-specific)
  useEffect(() => {
    if (user?.id) {
      const savedMeals = localStorage.getItem(`nutritrack-meals-${user.id}`);
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals));
      }
    }
  }, [user?.id]);

  // Save meals to localStorage whenever meals change (user-specific)
  useEffect(() => {
    if (user?.id && meals.length > 0) {
      localStorage.setItem(`nutritrack-meals-${user.id}`, JSON.stringify(meals));
    }
  }, [meals, user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMeal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addMeal = () => {
    if (!currentMeal.name || !currentMeal.calories) {
      alert('Please enter at least meal name and calories');
      return;
    }

    const newMeal = {
      ...currentMeal,
      id: Date.now(),
      calories: parseFloat(currentMeal.calories) || 0,
      protein: parseFloat(currentMeal.protein) || 0,
      carbs: parseFloat(currentMeal.carbs) || 0,
      fat: parseFloat(currentMeal.fat) || 0
    };

    setMeals(prev => [...prev, newMeal]);
    setCurrentMeal({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      mealType: 'breakfast',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteMeal = (id) => {
    setMeals(prev => prev.filter(meal => meal.id !== id));
  };

  const getTodaysMeals = () => {
    const today = new Date().toISOString().split('T')[0];
    return meals.filter(meal => meal.date === today);
  };

  const getTodaysNutrition = () => {
    const todaysMeals = getTodaysMeals();
    return todaysMeals.reduce((total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const todaysNutrition = getTodaysNutrition();
  const todaysMeals = getTodaysMeals();

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getMealsByType = (type) => {
    return todaysMeals.filter(meal => meal.mealType === type);
  };

  return (
    <div className="meal-tracker-container">
      <div className="page-header">
        <h1>📱 Meal Tracker</h1>
        {user && (
          <p className="welcome-text">
            Welcome, {user.firstName}! Track your daily nutrition here.
          </p>
        )}
      </div>
      
      {/* Daily Progress Overview */}
      <div className="daily-progress">
        <h2>Today's Progress</h2>
        <div className="progress-grid">
          <div className="progress-item">
            <div className="progress-label">Calories</div>
            <div className="progress-bar">
              <div 
                className="progress-fill calories" 
                style={{ width: `${getProgressPercentage(todaysNutrition.calories, dailyGoals.calories)}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {Math.round(todaysNutrition.calories)} / {dailyGoals.calories} kcal
            </div>
          </div>
          
          <div className="progress-item">
            <div className="progress-label">Protein</div>
            <div className="progress-bar">
              <div 
                className="progress-fill protein" 
                style={{ width: `${getProgressPercentage(todaysNutrition.protein, dailyGoals.protein)}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {Math.round(todaysNutrition.protein)} / {dailyGoals.protein} g
            </div>
          </div>
          
          <div className="progress-item">
            <div className="progress-label">Carbs</div>
            <div className="progress-bar">
              <div 
                className="progress-fill carbs" 
                style={{ width: `${getProgressPercentage(todaysNutrition.carbs, dailyGoals.carbs)}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {Math.round(todaysNutrition.carbs)} / {dailyGoals.carbs} g
            </div>
          </div>
          
          <div className="progress-item">
            <div className="progress-label">Fat</div>
            <div className="progress-bar">
              <div 
                className="progress-fill fat" 
                style={{ width: `${getProgressPercentage(todaysNutrition.fat, dailyGoals.fat)}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {Math.round(todaysNutrition.fat)} / {dailyGoals.fat} g
            </div>
          </div>
        </div>
      </div>

      {/* Add Meal Form */}
      <div className="add-meal-section">
        <h2>Log a Meal</h2>
        <div className="calculator-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Food Item</label>
              <input
                type="text"
                id="name"
                name="name"
                value={currentMeal.name}
                onChange={handleInputChange}
                placeholder="e.g., Grilled Chicken Breast"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mealType">Meal Type</label>
              <select
                id="mealType"
                name="mealType"
                value={currentMeal.mealType}
                onChange={handleInputChange}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="calories">Calories</label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={currentMeal.calories}
                onChange={handleInputChange}
                placeholder="250"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="protein">Protein (g)</label>
              <input
                type="number"
                id="protein"
                name="protein"
                value={currentMeal.protein}
                onChange={handleInputChange}
                placeholder="25"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="carbs">Carbs (g)</label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                value={currentMeal.carbs}
                onChange={handleInputChange}
                placeholder="30"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fat">Fat (g)</label>
              <input
                type="number"
                id="fat"
                name="fat"
                value={currentMeal.fat}
                onChange={handleInputChange}
                placeholder="10"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={currentMeal.date}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={addMeal} className="add-meal-btn">
            Add Meal
          </button>
        </div>
      </div>

      {/* Today's Meals */}
      <div className="todays-meals">
        <h2>Today's Meals</h2>
        
        {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => (
          <div key={mealType} className="meal-type-section">
            <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
            <div className="meals-list">
              {getMealsByType(mealType).length === 0 ? (
                <p className="no-meals">No {mealType} logged yet</p>
              ) : (
                getMealsByType(mealType).map(meal => (
                  <div key={meal.id} className="meal-item">
                    <div className="meal-info">
                      <h4>{meal.name}</h4>
                      <div className="meal-nutrition">
                        <span>{meal.calories} kcal</span>
                        <span>P: {meal.protein}g</span>
                        <span>C: {meal.carbs}g</span>
                        <span>F: {meal.fat}g</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteMeal(meal.id)}
                      className="delete-btn"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealTracker;