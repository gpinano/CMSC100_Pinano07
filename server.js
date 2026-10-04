// Import Express so I can create a server.
const express = require("express");

// Create an Express application.
const app = express();

// Use port 3000 for the local server.
const PORT = 3000;

// Serve all files inside the "public" folder as static files.
// This allows the HTML, CSS, and JavaScript files to be accessed through URLs.
app.use(express.static("public"));

// Start the server.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
