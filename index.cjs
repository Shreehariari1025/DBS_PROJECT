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

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt:", { email, password }); // Log entered data

    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Check if user exists
        const [user] = await db.promise().query(
            `SELECT User.user_id, User.name, Credentials.password 
             FROM User 
             JOIN Credentials ON User.user_id = Credentials.user_id 
             WHERE User.email = ?`, 
            [email]
        );

        if (user.length === 0) {
            console.log("User not found:", email);
            return res.status(404).json({ error: "User not found" });
        }

        // Compare passwords
        if (user[0].password !== password) {
            console.log("Invalid password for:", email);
            return res.status(401).json({ error: "Invalid password" });
        }

        console.log("Login successful for:", email);
        res.status(200).json({ message: "Login successful", user: { id: user[0].user_id, name: user[0].name } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/movies/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching movie with ID: ${id}`);  // Log request
    
    try {
        const [movie] = await db.promise().query("SELECT m.title, m.genre, m.release_year, i.image_url, round(avg(r.rating),1) as avg_rating FROM movie m JOIN movieimages i on i.movie_id= m.movie_id join reviews r on r.movie_id = m.movie_id WHERE m.movie_id = ? group by m.title, m.genre, m.release_year, i.image_url", [id]);
        
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

app.post('/register', (req, res) => {
    const { name, email, phone_no, password, preferred_genre, preferred_language } = req.body;
  
    // Validate required fields
    if (!name || !email || !phone_no || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
  
    // Step 1: Insert into the User table
    const userQuery = `INSERT INTO User (name, email, phone_no) VALUES (?, ?, ?)`;
    
    db.execute(userQuery, [name, email, phone_no], (err, result) => {
      if (err) {
        console.error('Error inserting into User table:', err);
        return res.status(500).json({ message: 'Database error occurred' });
      }
  
      // Step 2: Insert into the Credentials table (after getting the user_id)
      const user_id = result.insertId;
      const credentialsQuery = `INSERT INTO Credentials (user_id, password) VALUES (?, ?)`;
  
      db.execute(credentialsQuery, [user_id, password], (err, result) => {
        if (err) {
          console.error('Error inserting into Credentials table:', err);
          return res.status(500).json({ message: 'Database error occurred' });
        }
  
        // Step 3: Insert into the UserPreferences table
        const preferencesQuery = `INSERT INTO UserPreferences (user_id, preferred_genre, preferred_language) VALUES (?, ?, ?)`;
  
        db.execute(preferencesQuery, [user_id, preferred_genre, preferred_language], (err, result) => {
          if (err) {
            console.error('Error inserting into UserPreferences table:', err);
            return res.status(500).json({ message: 'Database error occurred' });
          }
  
          // Successfully inserted into all tables
          res.status(200).json({ message: 'Registration successful' });
        });
      });
    });
  });
  


  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
