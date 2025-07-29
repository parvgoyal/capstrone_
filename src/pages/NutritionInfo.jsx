import React, { useState } from 'react';
import { searchFood, getFoodNutrition } from '../utils/nutritionAPI';

const NutritionInfo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Comprehensive food database with nutritional information
  const foodDatabase = [
    {
      id: 1,
      name: 'Chicken Breast (100g)',
      category: 'Protein',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
      sodium: 74,
      vitamins: {
        'Vitamin B6': '0.5mg (30% DV)',
        'Niacin': '14.8mg (74% DV)',
        'Phosphorus': '196mg (20% DV)',
        'Selenium': '22.5mcg (32% DV)'
      },
      benefits: ['High in protein', 'Low in fat', 'Rich in B vitamins', 'Supports muscle growth']
    },
    {
      id: 2,
      name: 'Salmon (100g)',
      category: 'Protein',
      calories: 208,
      protein: 25.4,
      carbs: 0,
      fat: 12.4,
      fiber: 0,
      sugar: 0,
      sodium: 59,
      vitamins: {
        'Omega-3': '2.3g',
        'Vitamin D': '11mcg (55% DV)',
        'Vitamin B12': '3.2mcg (133% DV)',
        'Selenium': '36.5mcg (52% DV)'
      },
      benefits: ['Rich in omega-3 fatty acids', 'High quality protein', 'Heart healthy', 'Brain function support']
    },
    {
      id: 3,
      name: 'Quinoa (100g cooked)',
      category: 'Grains',
      calories: 120,
      protein: 4.4,
      carbs: 22,
      fat: 1.9,
      fiber: 2.8,
      sugar: 0.9,
      sodium: 7,
      vitamins: {
        'Manganese': '0.6mg (30% DV)',
        'Phosphorus': '152mg (15% DV)',
        'Magnesium': '64mg (16% DV)',
        'Iron': '1.5mg (8% DV)'
      },
      benefits: ['Complete protein', 'Gluten-free', 'High in fiber', 'Rich in minerals']
    },
    {
      id: 4,
      name: 'Avocado (100g)',
      category: 'Fruits',
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      fiber: 7,
      sugar: 0.7,
      sodium: 7,
      vitamins: {
        'Vitamin K': '21mcg (26% DV)',
        'Folate': '81mcg (20% DV)',
        'Vitamin C': '10mg (17% DV)',
        'Potassium': '485mg (14% DV)'
      },
      benefits: ['Healthy monounsaturated fats', 'High in fiber', 'Heart healthy', 'Supports nutrient absorption']
    },
    {
      id: 5,
      name: 'Spinach (100g)',
      category: 'Vegetables',
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      sugar: 0.4,
      sodium: 79,
      vitamins: {
        'Vitamin K': '483mcg (604% DV)',
        'Vitamin A': '469mcg (52% DV)',
        'Folate': '194mcg (49% DV)',
        'Iron': '2.7mg (15% DV)'
      },
      benefits: ['Very low in calories', 'Rich in vitamins', 'High in antioxidants', 'Supports eye health']
    },
    {
      id: 6,
      name: 'Greek Yogurt (100g)',
      category: 'Dairy',
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
      sugar: 3.6,
      sodium: 36,
      vitamins: {
        'Calcium': '110mg (11% DV)',
        'Vitamin B12': '0.5mcg (21% DV)',
        'Riboflavin': '0.3mg (18% DV)',
        'Phosphorus': '135mg (14% DV)'
      },
      benefits: ['High in protein', 'Probiotic benefits', 'Low in fat', 'Supports bone health']
    },
    {
      id: 7,
      name: 'Sweet Potato (100g)',
      category: 'Vegetables',
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      fiber: 3,
      sugar: 4.2,
      sodium: 5,
      vitamins: {
        'Vitamin A': '709mcg (79% DV)',
        'Vitamin C': '2.4mg (4% DV)',
        'Potassium': '337mg (10% DV)',
        'Manganese': '0.3mg (15% DV)'
      },
      benefits: ['Rich in beta-carotene', 'High in fiber', 'Complex carbohydrates', 'Supports immune system']
    },
    {
      id: 8,
      name: 'Almonds (100g)',
      category: 'Nuts',
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 12,
      sugar: 4.4,
      sodium: 1,
      vitamins: {
        'Vitamin E': '25.6mg (128% DV)',
        'Magnesium': '270mg (68% DV)',
        'Riboflavin': '1.1mg (65% DV)',
        'Niacin': '3.6mg (18% DV)'
      },
      benefits: ['Healthy fats', 'High in vitamin E', 'Heart healthy', 'Supports brain health']
    },
    {
      id: 9,
      name: 'Broccoli (100g)',
      category: 'Vegetables',
      calories: 34,
      protein: 2.8,
      carbs: 7,
      fat: 0.4,
      fiber: 2.6,
      sugar: 1.5,
      sodium: 33,
      vitamins: {
        'Vitamin C': '89mg (149% DV)',
        'Vitamin K': '102mcg (127% DV)',
        'Folate': '63mcg (16% DV)',
        'Vitamin A': '31mcg (3% DV)'
      },
      benefits: ['Very high in vitamin C', 'Cancer-fighting compounds', 'High in fiber', 'Supports immune system']
    },
    {
      id: 10,
      name: 'Brown Rice (100g cooked)',
      category: 'Grains',
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      fiber: 1.8,
      sugar: 0.4,
      sodium: 5,
      vitamins: {
        'Manganese': '0.9mg (45% DV)',
        'Selenium': '10mcg (14% DV)',
        'Magnesium': '43mg (11% DV)',
        'Niacin': '1.5mg (8% DV)'
      },
      benefits: ['Whole grain', 'Good source of fiber', 'Sustained energy', 'Heart healthy']
    }
  ];

  const handleSearchFood = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const results = await searchFood(searchQuery);
      const formattedResults = results.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image ? `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` : null,
        category: 'Food Item'
      }));
      setSearchResults(formattedResults);
    } catch (err) {
      setError('Failed to search for food items. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchFood();
    }
  };

  const handleFoodSelect = async (food) => {
    setLoading(true);
    setError('');
    
    try {
      const nutritionData = await getFoodNutrition(food.id, 100, 'grams');
      
      // Format the nutrition data to match our component structure
      const formattedFood = {
        id: nutritionData.id,
        name: nutritionData.name,
        image: food.image,
        category: 'Food Item',
        calories: Math.round(nutritionData.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0),
        protein: Math.round(nutritionData.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 0),
        carbs: Math.round(nutritionData.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 0),
        fat: Math.round(nutritionData.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount || 0),
        fiber: Math.round(nutritionData.nutrition?.nutrients?.find(n => n.name === 'Fiber')?.amount || 0),
        sugar: Math.round(nutritionData.nutrition?.nutrients?.find(n => n.name === 'Sugar')?.amount || 0),
        sodium: Math.round(nutritionData.nutrition?.nutrients?.find(n => n.name === 'Sodium')?.amount || 0),
        vitamins: {},
        benefits: ['Rich in nutrients', 'Part of a balanced diet']
      };

      // Extract vitamins and minerals
      if (nutritionData.nutrition?.nutrients) {
        const vitamins = nutritionData.nutrition.nutrients.filter(nutrient => 
          ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Vitamin K', 'Vitamin B6', 'Vitamin B12', 'Folate', 'Niacin', 'Riboflavin', 'Thiamin', 'Calcium', 'Iron', 'Magnesium', 'Phosphorus', 'Potassium', 'Zinc', 'Selenium', 'Manganese'].includes(nutrient.name)
        );
        
        vitamins.forEach(vitamin => {
          formattedFood.vitamins[vitamin.name] = `${Math.round(vitamin.amount * 10) / 10}${vitamin.unit}`;
        });
      }

      setSelectedFood(formattedFood);
    } catch (err) {
      setError('Failed to fetch detailed nutrition information.');
    } finally {
      setLoading(false);
    }
  };

  const getFoodsByCategory = (category) => {
    return foodDatabase.filter(food => food.category === category);
  };

  const categories = ['Protein', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Nuts'];

  return (
    <div className="nutrition-info-container">
      <h1>📊 Nutrition Information</h1>
      
      {/* Search Section */}
      <div className="search-section">
        <div className="calculator-form">
          <div className="form-group">
            <label htmlFor="foodSearch">Search Food Items</label>
            <div className="search-input-group">
              <input
                type="text"
                id="foodSearch"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for food items (e.g., chicken, broccoli, quinoa)"
              />
              <button onClick={handleSearchFood} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="food-grid">
            {searchResults.map(food => (
              <div key={food.id} className="food-card" onClick={() => handleFoodSelect(food)}>
                <div className="food-category">{food.category}</div>
                {food.image && (
                  <img src={food.image} alt={food.name} className="food-image" />
                )}
                <h3>{food.name}</h3>
                <div className="food-note">Click for detailed nutrition info</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchQuery && searchResults.length === 0 && !loading && !error && (
        <div className="no-results">
          No food items found for "{searchQuery}". Try a different search term.
        </div>
      )}

      {/* Food Categories */}
      {!searchQuery && (
        <div className="categories-section">
          <h2>Browse by Category</h2>
          {categories.map(category => (
            <div key={category} className="category-section">
              <h3>{category}</h3>
              <div className="food-grid">
                {getFoodsByCategory(category).slice(0, 3).map(food => (
                  <div key={food.id} className="food-card" onClick={() => setSelectedFood(food)}>
                    <div className="food-category">{food.category}</div>
                    <h4>{food.name}</h4>
                    <div className="food-calories">{food.calories} calories</div>
                    <div className="food-macros">
                      <span>P: {food.protein}g</span>
                      <span>C: {food.carbs}g</span>
                      <span>F: {food.fat}g</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Food Detail Modal */}
      {selectedFood && (
        <div className="food-modal" onClick={() => setSelectedFood(null)}>
          <div className="food-detail" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedFood(null)}>×</button>
            
            <div className="food-header">
              <h2>{selectedFood.name}</h2>
              <div className="food-category-badge">{selectedFood.category}</div>
            </div>

            <div className="nutrition-overview">
              <div className="calories-display">
                <div className="calories-number">{selectedFood.calories}</div>
                <div className="calories-label">Calories per 100g</div>
              </div>
              
              <div className="macros-breakdown">
                <div className="macro-item">
                  <div className="macro-label">Protein</div>
                  <div className="macro-value">{selectedFood.protein}g</div>
                  <div className="macro-percentage">{Math.round((selectedFood.protein * 4 / selectedFood.calories) * 100)}%</div>
                </div>
                <div className="macro-item">
                  <div className="macro-label">Carbs</div>
                  <div className="macro-value">{selectedFood.carbs}g</div>
                  <div className="macro-percentage">{Math.round((selectedFood.carbs * 4 / selectedFood.calories) * 100)}%</div>
                </div>
                <div className="macro-item">
                  <div className="macro-label">Fat</div>
                  <div className="macro-value">{selectedFood.fat}g</div>
                  <div className="macro-percentage">{Math.round((selectedFood.fat * 9 / selectedFood.calories) * 100)}%</div>
                </div>
              </div>
            </div>

            <div className="detailed-nutrition">
              <div className="nutrition-section">
                <h3>Additional Nutrients</h3>
                <div className="nutrient-grid">
                  <div className="nutrient-item">
                    <span className="nutrient-label">Fiber</span>
                    <span className="nutrient-value">{selectedFood.fiber}g</span>
                  </div>
                  <div className="nutrient-item">
                    <span className="nutrient-label">Sugar</span>
                    <span className="nutrient-value">{selectedFood.sugar}g</span>
                  </div>
                  <div className="nutrient-item">
                    <span className="nutrient-label">Sodium</span>
                    <span className="nutrient-value">{selectedFood.sodium}mg</span>
                  </div>
                </div>
              </div>

              <div className="nutrition-section">
                <h3>Vitamins & Minerals</h3>
                <div className="vitamin-list">
                  {Object.entries(selectedFood.vitamins).map(([vitamin, amount]) => (
                    <div key={vitamin} className="vitamin-item">
                      <span className="vitamin-name">{vitamin}</span>
                      <span className="vitamin-amount">{amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nutrition-section">
                <h3>Health Benefits</h3>
                <ul className="benefits-list">
                  {selectedFood.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {!searchQuery && !selectedFood && (
        <div className="water-tip">
          💡 Use the search function to find detailed nutritional information for thousands of food items. All values are per 100g serving unless otherwise specified.
        </div>
      )}
    </div>
  );
};

export default NutritionInfo;