function init() {
  //put any page initialization/handlebars initialization here
  let main = document.getElementById('main');

  // Set up recipe form
  let recipeFormHTML = buildRecipeForm();
  main.innerHTML += recipeFormHTML;

  // Register partials
  Handlebars.registerPartial('recipeDetailsPartial', document.getElementById("recipe-details-partial").innerHTML);

  // Register helpers
  Handlebars.registerHelper('displayIngredient', function(ingredient) {
    return new Handlebars.SafeString('<li name="ingredients">' + ingredient + '</li>');
  });
}
document.addEventListener("DOMContentLoaded", function(event) {
  init()
})

function buildRecipeForm() {
  let recipeFormTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
  return recipeFormTemplate();
}

function handleSubmit() {
  let recipe = buildRecipeData();

  // Recipe template
  let recipeTemplate = Handlebars.compile(document.getElementById('recipe-template').innerHTML);
  let recipeHTML = recipeTemplate(recipe);

  main.innerHTML = recipeHTML;
}

function buildRecipeData() {
  let name = document.getElementById("recipeName").value;
  let description = document.getElementById("recipeDescription").value;
  let ingredientNodes = document.getElementsByName("ingredients");
  let ingredients = [];

  for (let i = 0; i < ingredientNodes.length; i++) {
    ingredients.push(ingredientNodes[i].value);
  }

  let recipe = {
    name: name,
    description: description,
    ingredients: ingredients
  }

  return recipe;
}

function displayEditForm() {
  // get data for form from current recipe
  let recipeName = document.getElementById("name").innerHTML;
  let recipeDescription = document.getElementById('description').innerHTML;
  let ingredientNodes = document.querySelectorAll('li[name="ingredients"]');
  let ingredients = [];

  for (let i = 0; i < ingredientNodes.length; i++) {
    ingredients.push(ingredientNodes[i].innerHTML);
  }

  // add the recipe form
  let recipeFormHTML = buildRecipeForm();
  main.innerHTML = recipeFormHTML;

  // Fill the form
  document.getElementById("recipeName").value = recipeName;
  document.getElementById("recipeDescription").value = recipeDescription;

  let ingredientInputs = document.querySelectorAll('input[name="ingredients"]');

  function insertIngredientValue(ingredient, index, array) {
    ingredientInputs[index].value = ingredient;
  }
  ingredients.forEach(insertIngredientValue);
}
