
 // I get the form and the section where the food cards will be displayed.
 // I use document.getElementById() to access specific HTML elements through their IDs.
 // The foodForm variable refers to the form where the user enters the food information.
 // The foodCards variable refers to the section where the submitted food cards will appear.
 // The message variable refers to the element where I display success or error messages.
const foodForm = document.getElementById("foodForm");
const foodCards = document.getElementById("foodCards");
const message = document.getElementById("message");

// I keep the submitted food objects in an array so I can sort them by rank.
// An array allows me to store multiple food entries in one variable.
// Each food entry will be represented by an object containing its ID, name,
// description, image URL, and rank.
// I use let because I may reassign the foods array when deleting a food entry.
let foods = [];

// This function displays all food cards in rank order.
// I separate this process into a function so I can reuse it whenever I add
// or delete a food entry instead of repeating the same code.
// The function reads the current foods array and updates the HTML page.
function displayFoods() {
    // I clear the food card section before displaying the cards again.
    // I use an empty string to remove the existing HTML content inside this section.
    // This prevents duplicate cards when I redraw the list after adding or deleting food.
    // Clearing the HTML does not delete the objects stored in the foods array.
    foodCards.innerHTML = "";

    // I sort the foods array from the lowest rank to the highest rank.
    // The sort() method compares two food objects, represented by a and b.
    // Subtracting a.rank from b.rank puts smaller rank values first.
    // For example, rank 1 appears before rank 2, and rank 2 appears before rank 3.
    // This means the food with the best numerical rank is displayed first.
    foods.sort((a, b) => a.rank - b.rank);

    // I use forEach() to go through every food object in the foods array.
    // The variable food represents the current food object being processed.
    // For each object, I create a new card and fill it with the food's information.
    foods.forEach((food) => {
        // I create a new article element to serve as the container for one food card.
        // createElement() creates an HTML element through JavaScript.
        const card = document.createElement("article");

        // I add the food-card CSS class to the article element.
        // The class allows my CSS file to apply the design and layout of each card.
        card.classList.add("food-card");

        // I create an image element for the food card.
        const image = document.createElement("img");

        // I set the image source to the image URL provided by the user.
        // The browser uses this URL to load the image displayed on the card.
        image.src = food.imageUrl;

        // I set the alternative text of the image to the food's name.
        // This helps describe the image if it cannot be displayed and supports accessibility.
        image.alt = food.name;

        // If the image URL does not load, I use a simple placeholder image instead.
        // The onerror event handler runs when the browser encounters an image-loading error.
        image.onerror = function () {
            // I use this to refer to the image element that encountered the error.
            // I replace its source with a placeholder image URL so the card can still
            // show an image area even when the original image cannot be loaded.
            this.src = "https://via.placeholder.com/300x180?text=Image";
        };

        // I create an h3 heading element to display the food's name.
        const name = document.createElement("h3");

        // I use textContent to place the food name inside the heading as plain text.
        // This displays the submitted name without interpreting it as HTML markup.
        name.textContent = food.name;

        // I create a paragraph element to display the food's description.
        const description = document.createElement("p");

        // I set the paragraph's text to the description stored in the food object.
        // This lets each card display the description entered by the user.
        description.textContent = food.description;

        // I create another paragraph element to display the food's rank.
        const rank = document.createElement("p");

        // I add the rank CSS class so I can style the rank separately if needed.
        rank.classList.add("rank");

        // I use a template literal to combine the text "Rank: " with the food's rank.
        // The ${food.rank} expression inserts the actual rank value into the string.
        // For example, if the rank is 1, the displayed text becomes "Rank: 1".
        rank.textContent = `Rank: ${food.rank}`;

        // I create a button for deleting the food entry.
        const deleteButton = document.createElement("button");

        // I set the text displayed on the button to "Delete".
        deleteButton.textContent = "Delete";

        // I add a CSS class so I can style the Delete button separately.
        deleteButton.classList.add("delete-button");

        // I add a click event listener to detect when the user clicks the Delete button.
        // The function below runs whenever this particular button is clicked.
        deleteButton.addEventListener("click", function () {
            // I use filter() to create a new array containing the food entries
            // whose IDs are different from the ID of the food selected for deletion.
            // Each item represents a food object, and item.id accesses its ID.
            // The !== operator checks whether the two IDs are not strictly equal.
            // As a result, the selected food is excluded while the other foods remain.
            foods = foods.filter((item) => item.id !== food.id);

            // I call displayFoods() again to update the page after deleting the food.
            // The function clears the old cards, sorts the remaining foods,
            // and creates the updated cards in the correct rank order.
            displayFoods();
        });

        // I add the image, name, description, rank, and Delete button to the card.
        // appendChild() places each element inside the card in the order listed below.
        // This determines the order in which these elements appear in the card's HTML structure.
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(rank);
        card.appendChild(deleteButton);

        // I add the completed card to the foodCards section on the page.
        // Before this line, the card was created in JavaScript but was not yet
        // attached to the visible page.
        // appendChild() inserts the card into the HTML document so the user can see it.
        foodCards.appendChild(card);
    });
}

// This runs when the user submits the form by clicking the Submit button.
// I use a submit event listener so I can handle the form submission with JavaScript
// instead of allowing the browser to perform its usual form submission behavior.
foodForm.addEventListener("submit", function (event) {
    // I prevent the form's default submission behavior.
    // Normally, submitting a form may cause the page to reload or navigate.
    // preventDefault() allows me to validate the inputs and update the cards
    // without performing that default action.
    event.preventDefault();

    // I get the values entered by the user from the corresponding HTML input elements.
    // getElementById() finds each input using its HTML ID.
    // The value property retrieves the current input value.
    // trim() removes whitespace from the beginning and end of each string.
    // I store the values in separate variables so I can validate and use them later.
    const foodName = document.getElementById("foodName").value.trim();
    const description = document.getElementById("description").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const rankValue = document.getElementById("rank").value.trim();

    // I convert the rank input from a string into a number using Number().
    // HTML input values are generally retrieved as strings, even when the input
    // is intended for numeric data.
    // Converting the rank lets me compare and sort it numerically.
    // For example, the string "2" becomes the number 2.
    const rank = Number(rankValue);

    // I check whether any of the required input values are empty.
    // The ! operator checks whether a value is falsy, and || means logical OR.
    // If even one field is empty after trimming its whitespace, the condition is true.
    if (!foodName || !description || !imageUrl || !rankValue) {
        // I display an error message to tell the user to complete all fields.
        message.textContent = "Please fill in all fields.";

        // I use return to stop the function immediately.
        // This prevents the program from creating or adding a food object
        // when the required fields are incomplete.
        return;
    }

    // I check whether the converted rank is NaN, which means Not-a-Number.
    // Number.isNaN() returns true when the supplied value is NaN.
    // This prevents a non-numeric rank, such as "hello", from being accepted.
    if (Number.isNaN(rank)) {
        // I display an error message explaining that the rank must be numeric.
        message.textContent = "Rank must be a number.";

        // I stop the submission process when the rank is invalid.
        return;
    }

    // I create a new object to represent the food submitted by the user.
    // An object groups related information into named properties.
    // I use these properties later when sorting, displaying, and deleting foods.
    const newFood = {
        // I use Date.now() to generate an ID based on the current timestamp in milliseconds.
        // This ID helps me distinguish one food entry from another, even when
        // two entries have the same food name.
        id: Date.now(),

        // I store the food name entered by the user in the name property.
        name: foodName,

        // I store the submitted description in the description property.
        description: description,

        // I store the submitted image URL in the imageUrl property.
        imageUrl: imageUrl,

        // I store the converted numeric rank in the rank property.
        rank: rank
    };

    // I add the new food object to the end of the foods array using push().
    // The array now contains the newly submitted food along with the existing entries.
    // The cards are not displayed by this line alone; I call displayFoods() next.
    foods.push(newFood);

    // I call displayFoods() to refresh the food card section.
    // This displays the new entry together with the existing foods.
    // The function also sorts all the entries by rank before displaying them.
    displayFoods();

    // I reset the form after successfully adding the food.
    // reset() returns the form inputs to their default values, usually clearing them.
    // This makes it easier for the user to submit another food entry.
    foodForm.reset();

    // I display a success message to confirm that the food was added.
    // This message is shown only after the validation checks pass and the food is added.
    message.textContent = "Food added successfully!";
});
