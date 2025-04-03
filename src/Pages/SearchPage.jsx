import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Robot from "../assets/Robot.png";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    genre: "",
    language: "",
    minRating: 0,
    year: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch search query and filters from URL on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    const genre = params.get("genre") || "";
    const language = params.get("language") || "";
    const minRating = params.get("minRating") || 0;
    const year = params.get("year") || "";

    setSearchQuery(query);
    setFilters({ genre, language, minRating: Number(minRating), year });

    fetchMovies(query, { genre, language, minRating, year });
  }, [location.search]);

  // Function to fetch movies from search API
  const fetchMovies = async (query, filters) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: query,
        genre: filters.genre,
        language: filters.language,
        minRating: filters.minRating,
        year: filters.year,
      }).toString();

      const response = await fetch(`http://localhost:5000/search?${params}`);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Could not fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply search & filters, updating the URL
  const applyFilters = () => {
    const params = new URLSearchParams({
      q: searchQuery,
      genre: filters.genre,
      language: filters.language,
      minRating: filters.minRating,
      year: filters.year,
    }).toString();

    navigate(`/search?${params}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 to-black text-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="bg-stone-800 border border-stone-700 rounded-full py-3 px-6 w-full max-w-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Search for movies..."
          />
        </div>

        {/* Filters Section */}
        <div className="bg-stone-900/50 p-6 rounded-xl mb-8 border border-stone-800">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Genre</label>
              <select
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                className="w-full bg-stone-800 border border-stone-700 rounded-md p-2"
              >
                <option value="">All Genres</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Romance">Romance</option>
                <option value="Historical">Historical</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Mystery">Mystery</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Sports">Sports</option>
                <option value="Drama">Drama</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
                className="w-full bg-stone-800 border border-stone-700 rounded-md p-2"
              >
                <option value="">All Languages</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Malayalam">Malayalam</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Min Rating</label>
              <select
                name="minRating"
                value={filters.minRating}
                onChange={handleFilterChange}
                className="w-full bg-stone-800 border border-stone-700 rounded-md p-2"
              >
                <option value="0">Any Rating</option>
                <option value="5">5+ Stars</option>
                <option value="7">7+ Stars</option>
                <option value="8.5">8.5+ Stars</option>
              </select>
            </div>

           
          </div>
          <button
            onClick={applyFilters}
            className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
        </div>

        {/* Search Results */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          {loading ? (
            <p className="text-red-400">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : movies.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-start">
              {movies.map((movie) => (
                <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <img src={Robot} alt="No results" className="w-32 h-32 opacity-70 mb-4" />
              <p className="text-stone-400 text-lg">No movies found matching your search</p>
              <p className="text-stone-500 text-sm">Try different keywords or adjust filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
