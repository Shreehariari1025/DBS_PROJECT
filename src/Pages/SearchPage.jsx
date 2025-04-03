SearchPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    language: '',
    minRating: 0,
    year: ''
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial search query from URL if coming from dashboard
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    searchMovies(query, filters);
  }, [location.search]);

  const searchMovies = async (query, filters) => {
    try {
      // Construct query params
      const params = new URLSearchParams({
        q: query,
        ...filters
      }).toString();

      const response = await fetch(`http://localhost:5000/search?${params}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    searchMovies(searchQuery, filters);
    // Update URL without reload
    navigate(`/search?q=${searchQuery}&genre=${filters.genre}&language=${filters.language}&minRating=${filters.minRating}&year=${filters.year}`, { replace: true });
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
            onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
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
                {/* Add more genres */}
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
                {/* Add more languages */}
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
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Release Year</label>
              <input
                type="number"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="Year"
                className="w-full bg-stone-800 border border-stone-700 rounded-md p-2"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
          <button
            onClick={applyFilters}
            className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map(movie => (
                <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
              ))}
            </div>
          ) : (
            <p className="text-stone-400">No movies found. Try different search terms or filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
