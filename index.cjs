const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');


dotenv.config();

const app = express();
app.use(express.json()); // To handle JSON requests

app.use(cors({
    origin: "http://localhost:5173", // Allow only your frontend URL
}));


let user;
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
        const [movie] = await db.promise().query("SELECT m.title, m.genre, m.release_year, CONCAT('/', i.image_url) AS image_url, round(avg(r.rating),1) as avg_rating FROM movie m JOIN movieimages i on i.movie_id= m.movie_id join reviews r on r.movie_id = m.movie_id WHERE m.movie_id = ? group by m.title, m.genre, m.release_year, i.image_url", [id]);
        
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
  app.get("/reviews/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [reviews] = await db.promise().query(`
            SELECT r.*, u.name as user_name 
            FROM reviews r
            JOIN user u ON r.user_id = u.user_id
            WHERE r.movie_id = ?
            ORDER BY r.review_date DESC
        `, [id]);
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

app.post('/sendreviews', (req, res) => {
    const { user_id, movie_id, review_heading, review_text, rating } = req.body;
  
    // Validate required fields
    if (!user_id || !movie_id || !review_heading || !review_text || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    console.log({
      user_id,
      movie_id,
      review_heading,
      review_text,
      rating
    });
  
    // Step 1: Verify user exists
    const userCheckQuery = `SELECT user_id FROM User WHERE user_id = ?`;
    
    db.execute(userCheckQuery, [user_id], (err, userResult) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ error: 'Database error occurred' });
      }
  
      if (userResult.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Step 2: Verify movie exists
      const movieCheckQuery = `SELECT movie_id FROM movie WHERE movie_id = ?`;
      
      db.execute(movieCheckQuery, [movie_id], (err, movieResult) => {
        if (err) {
          console.error('Error checking movie:', err);
          return res.status(500).json({ error: 'Database error occurred' });
        }
  
        if (movieResult.length === 0) {
          return res.status(404).json({ error: 'Movie not found' });
        }
  
        // Step 3: Insert the review
        const reviewQuery = `
          INSERT INTO reviews 
          (user_id, movie_id, review_heading, review_text, rating, review_date)
          VALUES (?, ?, ?, ?, ?, NOW())
        `;
  
        db.execute(reviewQuery, 
          [user_id, movie_id, review_heading, review_text, rating], 
          (err, reviewResult) => {
            if (err) {
              console.error('Error inserting review:', err);
              return res.status(500).json({ error: 'Failed to add review' });
            }
  
            
          }
        );
      });
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
                ur.preferred_genre, 
                ur.preferred_language,
                count(r.review_id) as rated,
                count(w.movie_id) as watched
            FROM user u
            join watchhistory w on w.user_id = u.user_id
            join reviews r on r.user_id = u.user_id
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

       // console.log("Recommended Movies for User ID:", userId, results);
        res.json(results);
    });
});

app.get("/watch-history/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const [movies] = await db.promise().query(
            `SELECT m.movie_id, m.title, m.genre, m.release_year, i.image_url, 
                    ROUND(AVG(r.rating), 1) AS avg_rating 
             FROM watchhistory wh
             JOIN movie m ON wh.movie_id = m.movie_id
             JOIN movieimages i ON i.movie_id = m.movie_id
             LEFT JOIN reviews r ON r.movie_id = m.movie_id
             WHERE wh.user_id = ?
             GROUP BY m.movie_id, m.title, m.genre, m.release_year, i.image_url`,
            [userId]
        );

        if (movies.length === 0) {
            console.log("No watch history found for user:", userId);
            return res.status(404).json({ error: "No watch history found" });
        }

        

        res.json(movies); // Return array if multiple movies exist
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch watch history" });
    }
});


app.get("/search", async (req, res) => {
    const { q, genre, language, minRating, year } = req.query;
    
    console.log(`Search request - Query: ${q}, Filters:`, {
      genre,
      language,
      minRating,
      year
    });
  
    try {
      // Base query
      let query = `
        SELECT DISTINCT 
          m.movie_id,
          m.title, 
          m.genre, 
          m.release_year, 
          m.language,
          mi.image_url,
          ROUND(AVG(r.rating),1) AS avg_rating
        FROM movie m
        JOIN movieimages mi ON mi.movie_id = m.movie_id
        LEFT JOIN reviews r ON r.movie_id = m.movie_id
      `;
  
      // WHERE conditions array
      const conditions = [];
      const params = [];
  
      // Search term
      if (q) {
        conditions.push("(m.title LIKE ? OR m.description LIKE ?)");
        params.push(`%${q}%`, `%${q}%`);
      }
  
      // Genre filter
      if (genre) {
        conditions.push("m.genre = ?");
        params.push(genre);
      }
  
      // Language filter
      if (language) {
        conditions.push("m.language = ?");
        params.push(language);
      }
  
      // Year filter
      if (year) {
        conditions.push("YEAR(m.release_year) = ?");
        params.push(year);
      }
  
      // Add WHERE clause if any conditions exist
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
  
      // Group by and rating filter
      query += " GROUP BY m.movie_id, m.title, m.genre, m.release_year, m.language, mi.image_url";
      
      if (minRating) {
        query += " HAVING avg_rating >= ?";
        params.push(minRating);
      }
  
      //console.log("Final Query:", query);
      //console.log("Params:", params);
  
      const [movies] = await db.promise().query(query, params);
  
      //console.log(`Found ${movies.length} movies`);
      res.json(movies);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: 'Failed to search movies' });
    }

  });
  
  app.post('/watch-now', async (req, res) => {
    try {
        const { user_id, movie_id } = req.body;
        if (!user_id || !movie_id) {
            return res.status(400).json({ message: "User ID and Movie ID are required" });
        }

        // Insert into watch history (avoid duplicate entries)
        const [rows] = await db.promise().query(`
            INSERT INTO watchhistory (user_id, movie_id, watch_date)
            VALUES (?, ?, NOW())
            ON DUPLICATE KEY UPDATE watch_date = NOW()`, 
            [user_id, movie_id]
        );

        res.json({ message: "Watch history updated successfully" });
    } catch (err) {
        console.error("Error updating watch history:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//Based on userID
app.get("/getreviews/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const [reviews] = await db.promise().query(
            `SELECT r.review_id, r.movie_id, r.rating, r.review_text, r.review_date, r.review_heading, 
                    m.title, m.genre, i.image_url
             FROM reviews r
             JOIN movie m ON r.movie_id = m.movie_id
             JOIN movieimages i ON i.movie_id = m.movie_id
             WHERE r.user_id = ?`,
            [userId]
        );

        if (reviews.length === 0) {
            console.log(`No reviews found for user: ${userId}`);
            return res.status(404).json({ error: "No reviews found" });
        }

        res.json(reviews);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

app.delete("/deletereviews/:reviewId", async (req, res) => {
    const { reviewId } = req.params;

    try {
        const [result] = await db.promise().query(
            "DELETE FROM reviews WHERE review_id = ?",
            [reviewId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Failed to delete review" });
    }
});

app.put("/editreview/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    const { review_heading, review_text, rating } = req.body;

    try {
        const [result] = await db.promise().query(
            "UPDATE reviews SET review_heading = ?, review_text = ?, rating = ? WHERE review_id = ?",
            [review_heading, review_text, rating, reviewId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json({ message: "Review updated successfully" });
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: "Failed to update review" });
    }
});

app.get('/specificreview/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        console.log("Fetching review with ID:", reviewId); // Debugging
        const query = 'SELECT * FROM reviews WHERE review_id = ?';
        const [review] = await db.promise().execute(query, [reviewId]);

        console.log("Review Query Result:", review); // Debugging

        if (review.length === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json(review[0]);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put('/update-user/:userId', (req, res) => {
    const userId = req.params.userId;
    const {
        name,
        email,
        phone_no,
        preferred_genre,
        preferred_language
        
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone_no) {
        return res.status(400).json({ error: 'Name, email, and phone number are required' });
    }

    // Start transaction
    db.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }

        // Update User table
        const updateUserQuery = `
            UPDATE User 
            SET name = ?, email = ?, phone_no = ?
            WHERE user_id = ?
        `;
        
        db.execute(updateUserQuery, [name, email, phone_no, userId], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    console.error('Error updating User:', err);
                    res.status(500).json({ error: 'Failed to update user details' });
                });
            }

            // Update or insert preferences
            const upsertPrefsQuery = `
                INSERT INTO UserPreferences (user_id, preferred_genre, preferred_language)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    preferred_genre = VALUES(preferred_genre),
                    preferred_language = VALUES(preferred_language)
                    
            `;
            
            db.execute(upsertPrefsQuery, [
                userId,
                preferred_genre,
                preferred_language
            ], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Error updating preferences:', err);
                        res.status(500).json({ error: 'Failed to update preferences' });
                    });
                }

                // Commit transaction
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Error committing transaction:', err);
                            res.status(500).json({ error: 'Failed to save changes' });
                        });
                    }
                    
                    res.json({ success: true, message: 'Profile updated successfully' });
                });
            });
        });
    });
});




app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
