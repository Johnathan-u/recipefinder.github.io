const foodPicture = document.querySelector(".foodImage"); // Picture
const foodData = document.querySelector(".data"); // Description
const foodName = document.querySelector(".foodName"); // Food name
const mealsForm = document.querySelector(".mealsForm"); // Meals form
const mealsInput = document.querySelector(".mealsInput"); // Meals input field

mealsForm.addEventListener("submit", async event => {
    event.preventDefault();
    const meal = mealsInput.value;
    if (meal) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
            const data = await response.json();
            if (data.meals && data.meals.length > 0) {
                displayMeal(data.meals[0]);
            } else {
                displayError("Meal not found");
            }
        } catch (error) {
            displayError("Error fetching meal data");
        }
    }
});

function displayMeal(meal) {
    foodPicture.src = meal.strMealThumb;
    foodName.textContent = meal.strMeal;
    foodData.textContent = meal.strInstructions;
}

function displayError(message) {
    foodName.textContent = "";
    foodData.textContent = message;
    foodPicture.src = "";
}
