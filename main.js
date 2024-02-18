/*(async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    const movies = await response.json();
    console.log(movies);
})(); */



/*
// Replace 'YOUR_API_KEY' with your actual Spoonacular API key
const apiKey = 'f218b2cd26904e5e8a8684fd9aae53b0';
const endpoint = 'https://api.spoonacular.com/recipes/random';

// Construct the URL with query parameters
const url = `${endpoint}?apiKey=${apiKey}`;

// Make the request using the Fetch API
fetch(url)
  .then(response => {
    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Parse JSON response
      return response.json();
    } else {
      throw new Error('Failed to fetch random recipe');
    }
  })
  .then(data => {
    // Extract necessary information
    const randomRecipe = data.recipes[0];
    console.log('Random Recipe:');
    console.log('Title:', randomRecipe.title);
    console.log('URL:', randomRecipe.sourceUrl);
  })
  .catch(error => {
    console.error(error);
  });
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