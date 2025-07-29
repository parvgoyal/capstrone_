import React, { useState } from 'react';
import { generateMealPlan } from '../utils/nutritionAPI';

const MealPlanner = () => {
  const [planType, setPlanType] = useState('week');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample meal database for planning
  const mealDatabase = {
    breakfast: [
      { name: 'Greek Yogurt Parfait', calories: 280, protein: 20, carbs: 35, fat: 8, dietary: ['vegetarian', 'high-protein'] },
      { name: 'Avocado Toast', calories: 320, protein: 12, carbs: 30, fat: 18, dietary: ['vegetarian', 'high-fiber'] },
      { name: 'Protein Smoothie', calories: 250, protein: 25, carbs: 20, fat: 8, dietary: ['high-protein', 'low-carb'] },
      { name: 'Oatmeal with Berries', calories: 300, protein: 10, carbs: 55, fat: 6, dietary: ['vegetarian', 'high-fiber'] },
      { name: 'Scrambled Eggs', calories: 220, protein: 18, carbs: 2, fat: 16, dietary: ['high-protein', 'low-carb', 'keto'] }
    ],
    lunch: [
      { name: 'Grilled Chicken Salad', calories: 320, protein: 35, carbs: 12, fat: 15, dietary: ['high-protein', 'low-carb'] },
      { name: 'Quinoa Buddha Bowl', calories: 450, protein: 18, carbs: 65, fat: 16, dietary: ['vegetarian', 'vegan', 'high-fiber'] },
      { name: 'Turkey Wrap', calories: 380, protein: 28, carbs: 35, fat: 14, dietary: ['high-protein'] },
      { name: 'Lentil Soup', calories: 280, protein: 16, carbs: 45, fat: 4, dietary: ['vegetarian', 'vegan', 'high-fiber'] },
      { name: 'Tuna Salad', calories: 300, protein: 30, carbs: 8, fat: 18, dietary: ['high-protein', 'low-carb'] }
    ],
    dinner: [
      { name: 'Salmon with Asparagus', calories: 380, protein: 42, carbs: 8, fat: 20, dietary: ['high-protein', 'low-carb', 'keto'] },
      { name: 'Chicken Stir Fry', calories: 350, protein: 35, carbs: 25, fat: 12, dietary: ['high-protein'] },
      { name: 'Vegetable Curry', calories: 320, protein: 12, carbs: 45, fat: 14, dietary: ['vegetarian', 'vegan'] },
      { name: 'Beef and Broccoli', calories: 400, protein: 38, carbs: 15, fat: 22, dietary: ['high-protein', 'low-carb'] },
      { name: 'Pasta Primavera', calories: 420, protein: 15, carbs: 65, fat: 12, dietary: ['vegetarian'] }
    ],
    snack: [
      { name: 'Apple with Almond Butter', calories: 180, protein: 6, carbs: 20, fat: 10, dietary: ['vegetarian', 'high-fiber'] },
      { name: 'Protein Bar', calories: 200, protein: 20, carbs: 15, fat: 8, dietary: ['high-protein'] },
      { name: 'Mixed Nuts', calories: 160, protein: 6, carbs: 6, fat: 14, dietary: ['vegetarian', 'keto'] },
      { name: 'Hummus with Veggies', calories: 120, protein: 5, carbs: 12, fat: 6, dietary: ['vegetarian', 'vegan'] },
      { name: 'Greek Yogurt', calories: 100, protein: 15, carbs: 8, fat: 0, dietary: ['vegetarian', 'high-protein'] }
    ]
  };

  const handleGenerateMealPlan = async () => {
    setLoading(true);
    setError('');
    
    try {
      const timeFrame = planType; // 'week' or 'month'
      const diet = dietaryPreference || '';
      
      const planData = await generateMealPlan(timeFrame, calorieGoal, diet);
      
      // Format the meal plan data
      let formattedPlan = [];
      
      if (planType === 'week' && planData.week) {
        // Weekly meal plan
        Object.keys(planData.week).forEach((day, index) => {
          const dayData = planData.week[day];
          const dayPlan = {
            day: index + 1,
            dayName: day,
            date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
            meals: {},
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0
          };

          // Process each meal type
          ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            if (dayData.meals && dayData.meals.length > 0) {
              // Find meal for this type or use first available
              const meal = dayData.meals.find(m => m.slot === mealType) || dayData.meals[0];
              
              if (meal) {
                dayPlan.meals[mealType] = {
                  id: meal.id,
                  name: meal.title,
                  calories: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0),
                  protein: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 0),
                  carbs: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 0),
                  fat: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount || 0),
                  readyInMinutes: meal.readyInMinutes || 30,
                  servings: meal.servings || 1
                };

                dayPlan.totalCalories += dayPlan.meals[mealType].calories;
                dayPlan.totalProtein += dayPlan.meals[mealType].protein;
                dayPlan.totalCarbs += dayPlan.meals[mealType].carbs;
                dayPlan.totalFat += dayPlan.meals[mealType].fat;
              }
            }
          });

          formattedPlan.push(dayPlan);
        });
      } else {
        // If API doesn't return expected format, create a simple plan
        const days = planType === 'week' ? 7 : 30;
        for (let i = 0; i < days; i++) {
          formattedPlan.push({
            day: i + 1,
            dayName: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i % 7],
            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
            meals: {
              breakfast: { name: 'Healthy Breakfast', calories: Math.round(calorieGoal * 0.25), protein: 20, carbs: 40, fat: 10 },
              lunch: { name: 'Nutritious Lunch', calories: Math.round(calorieGoal * 0.35), protein: 30, carbs: 50, fat: 15 },
              dinner: { name: 'Balanced Dinner', calories: Math.round(calorieGoal * 0.35), protein: 35, carbs: 45, fat: 18 }
            },
            totalCalories: calorieGoal,
            totalProtein: 85,
            totalCarbs: 135,
            totalFat: 43
          });
        }
      }

      setMealPlan(formattedPlan);
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error('Meal plan generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportPlan = () => {
    if (!mealPlan) return;

    const planText = mealPlan.map(day => {
      return `Day ${day.day} (${day.date}):
Breakfast: ${day.meals.breakfast.name} - ${day.meals.breakfast.calories} cal
Lunch: ${day.meals.lunch.name} - ${day.meals.lunch.calories} cal
Dinner: ${day.meals.dinner.name} - ${day.meals.dinner.calories} cal
Snack: ${day.meals.snack.name} - ${day.meals.snack.calories} cal
Total: ${Math.round(day.totalCalories)} calories
`;
    }).join('\n');

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meal-plan-${planType}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="meal-planner-container">
      <h1>📅 Meal Planner</h1>
      
      {/* Planning Options */}
      <div className="planning-options">
        <div className="calculator-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="planType">Plan Duration</label>
              <select
                id="planType"
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
              >
                <option value="week">Weekly (7 days)</option>
                <option value="day">Daily (1 day)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="calorieGoal">Daily Calorie Goal</label>
              <input
                type="number"
                id="calorieGoal"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(parseInt(e.target.value))}
                placeholder="2000"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dietary">Dietary Preference</label>
            <select
              id="dietary"
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
            >
              <option value="">Balanced Diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="paleo">Paleo</option>
              <option value="gluten free">Gluten Free</option>
            </select>
          </div>

          <button onClick={handleGenerateMealPlan} disabled={loading}>
            {loading ? 'Generating Plan...' : `Generate ${planType.charAt(0).toUpperCase() + planType.slice(1)}ly Plan`}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Generated Meal Plan */}
      {loading && (
        <div className="loading-section">
          <div className="loading">Creating your personalized meal plan...</div>
        </div>
      )}

      {mealPlan && !loading && (
        <div className="meal-plan-results">
          <div className="plan-header">
            <h2>{planType.charAt(0).toUpperCase() + planType.slice(1)} Meal Plan</h2>
            <button onClick={exportPlan} className="export-btn">
              Export Plan
            </button>
          </div>

          <div className="plan-overview">
            <div className="overview-stats">
              <div className="stat-item">
                <div className="stat-label">Average Daily Calories</div>
                <div className="stat-value">
                  {Math.round(mealPlan.reduce((sum, day) => sum + day.totalCalories, 0) / mealPlan.length)}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Plan Duration</div>
                <div className="stat-value">{mealPlan.length} days</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Dietary Focus</div>
                <div className="stat-value">{dietaryPreference.replace('-', ' ')}</div>
              </div>
            </div>
          </div>

          <div className="meal-plan-grid">
            {mealPlan.slice(0, planType === 'weekly' ? 7 : 14).map(day => (
              <div key={day.day} className="day-plan">
                <div className="day-header">
                  <h3>Day {day.day}</h3>
                  <span className="day-date">{day.date}</span>
                </div>
                
                <div className="day-meals">
                  {Object.entries(day.meals).map(([mealType, meal]) => (
                    <div key={mealType} className="meal-item">
                      <div className="meal-type">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</div>
                      <div className="meal-name">{meal.name}</div>
                      <div className="meal-calories">{meal.calories} cal</div>
                    </div>
                  ))}
                </div>
                
                <div className="day-totals">
                  <div className="total-calories">
                    Total: {Math.round(day.totalCalories)} cal
                  </div>
                  <div className="macros">
                    P: {Math.round(day.totalProtein)}g | 
                    C: {Math.round(day.totalCarbs)}g | 
                    F: {Math.round(day.totalFat)}g
                  </div>
                </div>
              </div>
            ))}
          </div>

          {planType === 'monthly' && mealPlan.length > 14 && (
            <div className="show-more">
              <p>Showing first 14 days. Export the full plan to see all {mealPlan.length} days.</p>
            </div>
          )}
        </div>
      )}

      {mealPlan && !loading && (
        <div className="water-tip">
          💡 This meal plan is generated based on your preferences and calorie goals. Feel free to swap similar meals or adjust portions based on your needs. Remember to stay hydrated and consult with a nutritionist for personalized advice.
        </div>
      )}
    </div>
  );
};

export default MealPlanner;