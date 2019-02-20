function init() {
  //put any page initialization/handlebars initialization here

  // Set up recipe form
  renderRecipeForm();

  // Register partials
  Handlebars.registerPartial('recipeDetailsPartial', document.getElementById("recipe-details-partial").innerHTML);

  // Register helpers
  Handlebars.registerHelper('displayIngredient', function() {
    return new Handlebars.SafeString('<li name="ingredients">' + this + '</li>');
  });
}
document.addEventListener("DOMContentLoaded", function(event) {
  init()
})

function renderRecipeForm() {
  let main = document.getElementById('main');
  let recipeFormTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
  let recipeFormHTML = recipeFormTemplate();

  main.innerHTML += recipeFormHTML;
}

function handleSubmit() {
  buildRecipeData();
}

function buildRecipeData() {
  let title = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let ingredientNodes = document.getElementsByName("ingredients");
  let ingredients = [];

  for (let i = 0; i < ingredientNodes.length; i++) {
    ingredients.push(ingredientNodes[i].value);
  }

  let recipe = {
    title: title,
    description: description,
    ingredients: ingredients
  }
  return recipe;
}
