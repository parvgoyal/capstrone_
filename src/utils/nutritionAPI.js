const API_KEY = 'GdIazqbe0wVg03DBjYsRg9dpiel78OxsDhlc3RNhuse';
const BASE_URL = 'https://api.spoonacular.com';

// Search for food items
export const searchFood = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/food/ingredients/search?query=${encodeURIComponent(query)}&number=20&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch food data');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching food:', error);
    throw error;
  }
};

// Get detailed nutrition information for a food item
export const getFoodNutrition = async (id, amount = 100, unit = 'grams') => {
  try {
    const response = await fetch(
      `${BASE_URL}/food/ingredients/${id}/information?amount=${amount}&unit=${unit}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch nutrition data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nutrition:', error);
    throw error;
  }
};



// Generate meal plan
export const generateMealPlan = async (timeFrame = 'week', targetCalories = 2000, diet = '') => {
  try {
    let url = `${BASE_URL}/mealplanner/generate?timeFrame=${timeFrame}&targetCalories=${targetCalories}&apiKey=${API_KEY}`;
    
    if (diet && diet !== 'balanced') {
      url += `&diet=${diet}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to generate meal plan');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
};

// Parse ingredients from text
export const parseIngredients = async (ingredientList) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/parseIngredients?apiKey=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `ingredientList=${encodeURIComponent(ingredientList)}&servings=1&includeNutrition=true`
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to parse ingredients');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error parsing ingredients:', error);
    throw error;
  }
};



// Autocomplete food search
export const autocompleteFood = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/food/ingredients/autocomplete?query=${encodeURIComponent(query)}&number=10&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to autocomplete food search');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error with food autocomplete:', error);
    throw error;
  }
};