const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // To handle JSON requests

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

// Sample API route
app.get("/movies", (req, res) => {
    db.query("SELECT * FROM Movie", (err, results) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(results);
    });
  });

// app.get('/movies/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [movie] = await db.promise().query("SELECT * FROM Movie WHERE movie_id = ?", [id]);
//         if (movie.length === 0) return res.status(404).json({ error: 'Movie not found' });
//         res.json(movie[0]);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch movie' });
//     }
// });

// app.get("/movies/:id", (req, res) => {
//     const { id } = req.params;
//     db.query(("SELECT * FROM Movie where id = ?",[id]), (err, results) => {
//       if (err) res.status(500).json({ error: err.message });
//       else res.json(results);
//     });
//   });

app.get("/movies/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching movie with ID: ${id}`);  // Log request
    
    try {
        const [movie] = await db.promise().query("SELECT * FROM movie m JOIN movieimages i on i.movie_id= m.movie_id WHERE m.movie_id = ?", [id]);
        
        console.log("Query Result:", movie);  // Log DB response
        
        if (movie.length === 0) {
            console.log("Movie not found");
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json(movie[0]);
    } catch (error) {
        console.error("Database error:", error);  // Log error
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
});


  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
