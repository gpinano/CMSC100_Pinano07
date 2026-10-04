# CMSC 100 Exercise 07 - Front-end scripting

## Project Title
Practice Front-end Scripting

## Author
Gewell Piñano

## Code Description
This project is a simple favorite food page made for CMSC 100 Exercise 07.

The project uses:
- HTML for the page structure
- CSS for the interface and layout
- JavaScript DOM manipulation for the food cards
- Express.js to serve the static files

The user can add a food by entering:
- Food name
- Description
- Image URL
- Rank

The submitted food cards are automatically arranged according to rank. Each card also has a Delete button that removes the card from the page.

## How to Use

### 1. Install dependencies
Open the project folder in the terminal and run:

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

### 3. Open the website

Go to:

```text
http://localhost:3000
```

### 4. Add a food
Fill in all four fields and click **Add Food**.

### 5. Test the rank
Add foods with different ranks. The card with the lowest rank should appear first.

### 6. Test Delete
Click the **Delete** button on any food card. The selected card should disappear.

## Files
- `server.js` - Express server
- `public/index.html` - HTML interface
- `public/style.css` - CSS styling
- `public/form.js` - DOM functionality
- `package.json` - project configuration and dependency
- `.gitignore` - prevents `node_modules/` from being uploaded
