// I get the form and the section where the food cards will be displayed.
const foodForm = document.getElementById("foodForm");
const foodCards = document.getElementById("foodCards");
const message = document.getElementById("message");

// I keep the submitted food objects in an array so I can sort them by rank.
let foods = [];

// This function displays all food cards in rank order.
function displayFoods() {
    // Clear the section first so the cards can be redrawn in the correct order.
    foodCards.innerHTML = "";

    // Sort the foods from the lowest rank to the highest rank.
    foods.sort((a, b) => a.rank - b.rank);

    // Create a card for every food using DOM methods.
    foods.forEach((food) => {
        const card = document.createElement("article");
        card.classList.add("food-card");

        const image = document.createElement("img");
        image.src = food.imageUrl;
        image.alt = food.name;

        // If the image URL does not load, use a simple placeholder.
        image.onerror = function () {
            this.src = "https://via.placeholder.com/300x180?text=Image";
        };

        const name = document.createElement("h3");
        name.textContent = food.name;

        const description = document.createElement("p");
        description.textContent = food.description;

        const rank = document.createElement("p");
        rank.classList.add("rank");
        rank.textContent = `Rank: ${food.rank}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // When Delete is clicked, remove this food from the array and redraw the cards.
        deleteButton.addEventListener("click", function () {
            foods = foods.filter((item) => item.id !== food.id);
            displayFoods();
        });

        // Add all elements to the card.
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(rank);
        card.appendChild(deleteButton);

        // Add the completed card to the page.
        foodCards.appendChild(card);
    });
}

// This runs when the user clicks the Submit button.
foodForm.addEventListener("submit", function (event) {
    // Prevent the page from refreshing when the form is submitted.
    event.preventDefault();

    // Get the values entered by the user.
    const foodName = document.getElementById("foodName").value.trim();
    const description = document.getElementById("description").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const rankValue = document.getElementById("rank").value.trim();

    // Convert the rank input into a number.
    const rank = Number(rankValue);

    // Check that no input is empty.
    if (!foodName || !description || !imageUrl || !rankValue) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    // Check that rank is a valid number.
    if (Number.isNaN(rank)) {
        message.textContent = "Rank must be a number.";
        return;
    }

    // Create a food object from the submitted information.
    const newFood = {
        id: Date.now(),
        name: foodName,
        description: description,
        imageUrl: imageUrl,
        rank: rank
    };

    // Add the new food to the array.
    foods.push(newFood);

    // Display the cards again so they are sorted by rank.
    displayFoods();

    // Clear the form after a successful submission.
    foodForm.reset();

    message.textContent = "Food added successfully!";
});
