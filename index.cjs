const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const session = require("express-session");
const jwt = require("jsonwebtoken");
const MySQLStore = require("express-mysql-session")(session);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
    
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = decoded; // Store decoded user info in `req.user`
        next();
    });
};

dotenv.config();

const app = express();
app.use(express.json()); // To handle JSON requests

app.use(cors({
    origin: "http://localhost:5173", // Allow only your frontend URL
    credentials: true // Allow cookies & sessions
}));


let user;
// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Initialize session middleware
// app.use(session({
//     secret: "hari10",
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore,
//     cookie: {
//         httpOnly: true,
//         secure: false,   // Change to `true` in production with HTTPS
//         sameSite: "lax"  // Ensures cookies are shared correctly
//     }
// }));


db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});




app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const [users] = await db.promise().query(
            `SELECT User.user_id, User.name, User.email, Credentials.password 
             FROM User 
             JOIN Credentials ON User.user_id = Credentials.user_id 
             WHERE User.email = ?`, 
            [email]
        );

        if (!users || users.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const user = users[0];

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.json({
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.get("/movies/:id", async (req, res) => {
    const { id } = req.params;
   // console.log(`Fetching movie with ID: ${id}`);  // Log request
    
    try {
        const [movie] = await db.promise().query("SELECT m.title, m.genre, m.release_year, i.image_url, round(avg(r.rating),1) as avg_rating FROM movie m JOIN movieimages i on i.movie_id= m.movie_id join reviews r on r.movie_id = m.movie_id WHERE m.movie_id = ? group by m.title, m.genre, m.release_year, i.image_url", [id]);
        
       // console.log("Query Result:", movie);  // Log DB response
        
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
    console.log({
        name,
        email,
        phone_no,
        password,
        preferred_genre,
        preferred_language
      });
  
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
  

  

  
  // Updated API using JWT authentication
  app.get("/recommended", (req, res) => {
    const userId = req.query.user_id; // Get user_id from frontend request

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const query = `
        SELECT r.movie_id, r.title, r.genre, r.language, 
               AVG(re.rating) AS avg_rating, m.image_url, movie.release_year 
        FROM RecommendedMovies r
        JOIN movie ON movie.movie_id = r.movie_id
        JOIN reviews re ON re.movie_id = r.movie_id
        JOIN movieimages m ON m.movie_id = r.movie_id
        WHERE r.user_id = ? 
        GROUP BY r.movie_id, r.title, r.genre, r.language, m.image_url, movie.release_year
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching recommended movies:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Recommended Movies for User ID:", userId, results);
        res.json(results);
    });
});


  

// Server-side code for fetching trending movies
app.get('/trending', (req, res) => {
    const query = 'SELECT * FROM TrendingMovies';  // Query for trending movies
    //console.log('Fetching trending movies...');  // Check if this log appears
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching trending movies:', err);
        return res.status(500).json({ message: 'Failed to fetch trending movies.' });
      }
  
     // console.log('Query Result:', results);  // This should print the result of the query
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No trending movies found.' });
      }
  
      res.json(results);  // Send the query result as a response
    });
  });

  app.get('/top-rated', (req, res) => {
    const query = 'SELECT * FROM TopRatedMovies'; // Query the TopRatedMovies view
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching top-rated movies:', err);
        return res.status(500).json({ message: 'Error fetching top-rated movies' });
      }
      res.json(results);
    });
  });
  
  // A simple test route
app.get('/test', (req, res) => {
    console.log('Test route hit!');
    res.send('Test successful');
  });
  
  
  // Get Actors by Movie ID
app.get('/actors/:movie_id', (req, res) => {
    const movieId = req.params.movie_id;
  
    const query = `
      SELECT individuals.individual_id, individuals.name, individuals.image
      FROM cast
      JOIN individuals ON cast.individual_id = individuals.individual_id
      join role on role.individual_id = cast.individual_id
      WHERE cast.movie_id = ? AND role.role = 'Actor';
    `;
  
    db.query(query, [movieId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query error' });
      }
      res.json({ actors: results });
    });
  });

  app.get('/non-actors/:movie_id', (req, res) => {
    const movieId = req.params.movie_id;
  
    const query = `
      SELECT individuals.individual_id, individuals.name, individuals.image
      FROM cast
      JOIN individuals ON cast.individual_id = individuals.individual_id
      join role on role.individual_id = cast.individual_id
      WHERE cast.movie_id = ? AND role.role != 'Actor';
    `;
  
    db.query(query, [movieId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query error' });
      }
      res.json({ actors: results });
    });
  });

  // Get Similar Movies by Genre
app.get('/similar-movies/:movie_id', (req, res) => {
    const movieId = req.params.movie_id;
  
    // Step 1: Get the genre of the given movie
    const genreQuery = 'SELECT genre FROM movie WHERE movie_id = ?';
  
    db.query(genreQuery, [movieId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query error1' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      const genre = results[0].genre;
  
      // Step 2: Find similar movies based on the genre
      const similarMoviesQuery = `
        SELECT movie_id, title, genre, duration, language, release_year
        FROM movie
        WHERE genre = ? AND movie_id != ?;
      `;
  
      db.query(similarMoviesQuery, [genre, movieId], (err, similarMovies) => {
        if (err) {
          return res.status(500).json({ error: 'Database query error2' });
        }
  
        if (similarMovies.length === 0) {
          return res.status(404).json({ error: 'No similar movies found' });
        }
  
        res.json({ similar_movies: similarMovies });
      });
    });
  });
  
  // Get Reviews by Movie ID
app.get('/reviews/:movie_id', (req, res) => {
    const movieId = req.params.movie_id;
  
    const query = `
      SELECT review_id, review_heading, review_text, review_date, rating, user_id
      FROM reviews
      WHERE movie_id = ?;
    `;
  
    db.query(query, [movieId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'No reviews found for this movie' });
      }
  
      res.json({ reviews: results });
    });
  });
  
  app.get('/moviedetails/:movieId', (req, res) => {
    const movieId = req.params.movieId;

    const query = `
       SELECT m.title, m.genre, m.release_year, 
       CONCAT('/', i.image_url) AS image_url, 
       ROUND(AVG(r.rating), 1) AS avg_rating, 
       m.description 
FROM movie m 
JOIN movieimages i ON i.movie_id = m.movie_id 
JOIN reviews r ON r.movie_id = m.movie_id 
WHERE m.movie_id = ? 
GROUP BY m.title, m.genre, m.release_year, image_url, m.description;

    `;

    db.query(query, [movieId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(results[0]); // Send movie details as JSON
    });
});

  

app.get("/user/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const [rows] = await db.promise().query(
            `SELECT 
                u.user_id, 
                u.name, 
                u.email, 
                u.phone_no, 
                c.password, 
                ur.preferred_genre, 
                ur.preferred_language
            FROM user u
            JOIN credentials c ON u.user_id = c.user_id
            JOIN userPreferences ur ON ur.user_id = u.user_id  
            WHERE u.user_id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract first user object from array
        const user = rows[0];

        // Convert stored JSON strings into proper arrays
        user.preferred_genre = JSON.parse(user.preferred_genre || "[]");
        user.preferred_language = JSON.parse(user.preferred_language || "[]");

        res.json(user);  // Send only the first user object
    } catch (err) {
        console.error("Error fetching user details:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});





  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
