window.onload = function () {
    slideOne();
    slideTwo();
  };
  
  let sliderOne = document.getElementById("slider-1");
  let sliderTwo = document.getElementById("slider-2");
  let displayValOne = document.getElementById("range1");
  let displayValTwo = document.getElementById("range2");
  let minGap = 0;
  let sliderTrack = document.querySelector(".slider-track");
  let sliderMaxValue = document.getElementById("slider-1").max;
  
  function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
  }
  function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
  }
  function fillColor() {
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  }



// Replace 'YOUR_API_KEY' with your actual Spoonacular API key
const apiKey = 'f218b2cd26904e5e8a8684fd9aae53b0';

// Function to fetch recipes based on cuisine, diet, and available ingredients
async function fetchRecipesByCriteria(cuisine, diet, ingredients) {
  const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';
  const params = new URLSearchParams({
    apiKey,
    cuisine,
    diet,
    includeIngredients: ingredients.join(','),
    number: 3, // Number of recipes to return
    ranking: 2,
    instructionsRequired: true, // Ensure instructions are included in response
    addRecipeInformation: true
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
    const diet = prompt('Enter the type of diet (or leave blank for any):');
    const cuisine = prompt('Enter the type of cuisine (or leave blank for any):');
    const ingredients = prompt('Enter the ingredients you have (comma-separated):');
    if (ingredients !== null) {
      const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
      resolve({ cuisine, diet, ingredients: ingredientList });
    } else {
      reject(new Error('No ingredients entered'));
    }
  });
}

// Main function to execute the program
async function main() {
  try {
    const { diet, cuisine, ingredients } = await getUserInput();
    console.log('Fetching recipes based on diet:', diet || 'any', ', cuisine:', cuisine || 'any', ', and ingredients:', ingredients);
    const recipes = await fetchRecipesByCriteria(cuisine, diet, ingredients);
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



/*
// Replace 'YOUR_API_KEY' with your actual Spoonacular API key
const apiKey = 'f218b2cd26904e5e8a8684fd9aae53b0';

// Function to fetch recipes based on cuisine, diet, and available ingredients
async function fetchRecipesByDiet(diet, ingredients) {
  const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';
  const params = new URLSearchParams({
    apiKey,
    diet,
    includeIngredients: ingredients.join(','),
    number: 100, // Number of recipes to return
    ranking: 2,
    instructionsRequired: true, // Ensure instructions are included in response
    addRecipeInformation: true
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
function getUserInputDiet() {
  return new Promise((resolve, reject) => {
    const diet = prompt('Enter the type of diet (or leave blank for any):');
    const ingredients = prompt('Enter the ingredients you have (comma-separated):');
    if (ingredients !== null) {
      const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
      resolve({ diet, ingredients: ingredientList });
    } else {
      reject(new Error('No ingredients entered'));
    }
  });
}



// Function to fetch recipes based on cuisine, diet, and available ingredients
async function fetchRecipesByCuisine(cuisine, ingredients) {
  const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';
  const params = new URLSearchParams({
    apiKey,
    cuisine,
    includeIngredients: ingredients.join(','),
    number: 100, // Number of recipes to return
    ranking: 2,
    instructionsRequired: true, // Ensure instructions are included in response
    addRecipeInformation: true
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
function getUserInputCuisine(ingredients) {
  const cuisine = prompt('Enter the type of cuisine (or leave blank for any):');
  return cuisine;
    
}





// Main function to execute the program
async function main() {
  try {
    const { diet, ingredients } = await getUserInputDiet();
    const { cuisine } = await getUserInputCuisine();
    console.log('Fetching recipes based on diet:', diet || 'any', ', and ingredients:', ingredients);
    const recipes1 = await fetchRecipesByDiet(diet, ingredients);
    const recipes2 = await fetchRecipesByCuisine(cuisine, ingredients);
    const filteredRecipes = recipes1.filter(value => recipes2.includes(value));
    
    if (filteredRecipes.length === 0) {
      console.log('No recipes found based on the provided criteria.');
    } else {
      console.log('Suggested Recipes:');
      filteredRecipes.forEach(recipe => {
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
