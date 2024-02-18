/*
// Replace 'YOUR_API_KEY' with your actual Spoonacular API key
const apiKey = 'f218b2cd26904e5e8a8684fd9aae53b0';

// Function to fetch recipes based on cuisine and available ingredients
async function fetchRecipesByCuisineAndIngredients(cuisine, ingredients) {
  const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';
  const params = new URLSearchParams({
    apiKey,
    cuisine,
    includeIngredients: ingredients.join(','),
    number: 5, // Number of recipes to return
    instructionsRequired: true // Ensure instructions are included in response
  });
  const url = `${endpoint}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to prompt the user for input
function getUserInput() {
  return new Promise((resolve, reject) => {
    const cuisine = prompt('Enter the type of cuisine (or leave blank for any):');
    const ingredients = prompt('Enter the ingredients you have (comma-separated):');
    if (ingredients !== null) {
      const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
      resolve({ cuisine, ingredients: ingredientList });
    } else {
      reject(new Error('No ingredients entered'));
    }
  });
}

// Main function to execute the program
async function main() {
  try {
    const { cuisine, ingredients } = await getUserInput();
    console.log('Fetching recipes based on cuisine:', cuisine || 'any', 'and ingredients:', ingredients);
    const recipes = await fetchRecipesByCuisineAndIngredients(cuisine, ingredients);
    if (recipes.length === 0) {
      console.log('No recipes found based on the provided criteria.');
    } else {
      console.log('Suggested Recipes:');
      recipes.forEach(recipe => {
        console.log(recipe.title, '- URL:', recipe.sourceUrl);
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Execute the main function
main();
*/

// Replace 'YOUR_API_KEY' with your actual Spoonacular API key
const apiKey = 'f218b2cd26904e5e8a8684fd9aae53b0';

// Function to fetch recipes based on available ingredients
async function fetchRecipesByIngredients(ingredients) {
  const endpoint = 'https://api.spoonacular.com/recipes/findByIngredients';
  const params = new URLSearchParams({
    apiKey,
    ingredients: ingredients.join(','),
    number: 5, // Number of recipes to return
    ranking: 1 // Whether to rank by popularity
  });
  const url = `${endpoint}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to prompt the user for input
function getUserInput() {
  return new Promise((resolve, reject) => {
    const ingredients = prompt('Enter the ingredients you have (comma-separated):');
    if (ingredients) {
      resolve(ingredients.split(',').map(ingredient => ingredient.trim()));
    } else {
      reject(new Error('No ingredients entered'));
    }
  });
}

// Main function to execute the program
async function main() {
  try {
    const ingredients = await getUserInput();
    console.log('Fetching recipes based on ingredients:', ingredients);
    const recipes = await fetchRecipesByIngredients(ingredients);
    if (recipes.length === 0) {
      console.log('No recipes found based on the provided ingredients.');
    } else {
      console.log('Suggested Recipes:');
      recipes.forEach(recipe => {
        console.log(recipe.title, '- URL:', recipe.sourceUrl);
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Execute the main function
main();