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


const apiKey = 'b7024835d12443c3950e05df4c5db1ff';

// Function to fetch recipes based on cuisine, diet, and available ingredients
async function fetchRecipesByCriteria(cuisine, diet, ingredients) {
  const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';
  const params = new URLSearchParams({
    apiKey,
    cuisine,
    diet,
    includeIngredients: ingredients.join(','),
    number: 3, // Number of recipes to return
    ranking: 2, //Minimize missing ingredients
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

// Function to handle form submission and return the list of ingredients
function getIngredientsList() {
  // Get the value of the ingredients input field
  const input = document.getElementById('ingredientsForm');
  const value = input.value.trim();
  
  // Split the input string by commas to create an array of ingredients
  const ingredients = value.split(',').map(ingredient => ingredient.trim());
  
  // Optional: You can clear the input field after submission if needed
  input.value = '';

  // Return the array of ingredients
  return ingredients;
}

// Function to handle radio input selection and return the selected cuisine
function handleRadioSelection(event, callback) {
  // Get the text content of the selected radio input
  const selectedText = event.target.nextSibling.textContent.trim();

  // Invoke the callback function with the selected cuisine
  callback(selectedText);

  // Log the selected text to the console
  console.log('Selected Cuisine:', selectedText);
}

function handleRadioSelectionDiet(event, callback) {
  const selectedDiet = event.target.nextSibling.textContent.trim();
  
  // Invoke the callback function with the selected diet
  callback(selectedDiet);

  console.log('Selected Diet:', selectedDiet);
}

function showResults() {
  document.getElementById("resultsTitle").innerHTML = "Results";
}



var ingredientsList;
var cuisine = '';
var diet = '';

// Event listener to call the function when the form is submitted
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submitIngredients').addEventListener('submit', function(event) {
      // Prevent default form submission behavior
      event.preventDefault();
      
      // Get the list of ingredients
      ingredientsList = getIngredientsList();
      
      // Log the ingredients list to the console
      //console.log('Ingredients List:', ingredientsList);
  });
});

// Event listeners for radio inputs
document.querySelectorAll('input[name="Cuisine"]').forEach(radio => {
  radio.addEventListener('change', function(event) {
      handleRadioSelection(event, function(selectedCuisine) {
          // You can use the selected cuisine here
          cuisine = selectedCuisine;
      });
  });
});

// Event listeners for radio inputs
document.querySelectorAll('input[name="Diet"]').forEach(radio => {
  radio.addEventListener('change', function(event) {
      handleRadioSelectionDiet(event, function(selectedDiet) {
          // You can use the selected diet inside this callback function
          diet = selectedDiet;
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the generate button
  document.getElementById('generateButton').addEventListener('click', async function() {
    try {
      
      console.log(cuisine);
      console.log(diet);
      console.log(ingredientsList);

      // Fetch recipes based on selected criteria
      const recipes = await fetchRecipesByCriteria(cuisine, diet, ingredientsList);

      if (recipes.length === 0) {
        console.log('No recipes found based on the provided criteria.');
      } else {
        console.log('Suggested Recipes:');
        recipes.forEach(recipe => {
          console.log(recipe.title, '- URL:', recipe.sourceUrl);
        });
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  });
});

document.getElementById("generateButton").addEventListener("click", showResults);



/* const resultsTitleContainer = document.querySelector("#resultsTitleContainer");

const resultsTitle = document.createElement('div');
resultsTitle.id = resultsTitle;
resultsTitle.value = "Results"

resultsTitleContainer.appendChild(resultsTitle); */

