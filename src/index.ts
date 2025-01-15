
import app from './app';
import path from 'path';
// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Views folder path
const PORT = 3000;
// Middleware for parsing JSON and URL-encoded data

// Route to render EJS view


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});   