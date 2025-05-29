import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import RecommendationsCard from '../components/RecommendationsCard';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import SearchPage from './SearchPage';


function Dashboard() {


  
  const navigate = useNavigate();
  const [searchQuery,setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watchedRecently, setWatchedRecently] = useState([]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search`);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (!storedUser) {
      navigate("/signin");  // Redirect to signin if user is not found
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // ✅ Fetch Movies Only If User Exists
  useEffect(() => {
    console.log(user);
    if (user) {
      fetch("http://localhost:5000/trending")
        .then(res => res.json())
        .then(data => setTrendingMovies(data))
        .catch(err => console.error("Error fetching trending movies:", err));

      fetch("http://localhost:5000/top-rated")
        .then(res => res.json())
        .then(data => setTopRatedMovies(data))
        .catch(err => console.error("Error fetching top-rated movies:", err));

      fetch(`http://localhost:5000/recommended?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => setRecommendedMovies(data))
        .catch(err => console.error("Error fetching recommended movies:", err));
      
      fetch(`http://localhost:5000/watch-history/${user.id}`)
        .then(res => res.json())
        .then(data => setWatchedRecently(data))
        .catch(err => console.error("Error fetching watched recently movies:", err));
    }
  }, [user]);

  return (
    <div className="w-full h-screen text-red-50 bg-gradient-to-br from-stone-950 to-black font-[Inter]">
      <Navbar2 />
      <div className='pt-30 flex flex-col justify-evenly items-center gap-3'>
        <div className='lg:text-6xl sm:text-2xl font-semibold font-[Montserrat]'>
          Welcome back, {user?.name || "User"}
        </div>
        <div className='text-2xl'>Enjoy your time here!!</div>
        <div className="relative w-full max-w-md">
  <input
    type="search"
    onClick={() => navigate('/search')}  // Navigate immediately on click
    className="bg-red-50 rounded-3xl w-full h-12 text-gray-900 px-4 shadow-[0_0_15px_white] focus:outline-none cursor-pointer"
    placeholder="Search movies..."
    readOnly  // Makes the input non-editable
  />
  <div 
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  </div>
</div>


      </div>

      {/* Recommendations Section */}
      <div id='recommendations' className='bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
        <div className='text-3xl font-[Montserrat] text-left'>Recommendations</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
          {recommendedMovies.length > 0 ? (
            recommendedMovies.map((movie) => (
              <RecommendationsCard key={movie.movie_id} movieId={movie.movie_id} />
            ))
          ) : (
            <p className='text-white'>No recommendations available.</p>
          )}
        </div>
      </div>

      {/* Trending Movies Section */}
      <div id='trending' className='bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
        <div className='text-3xl font-[Montserrat] text-left'>Trending Movies</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
          {trendingMovies.length > 0 ? (
            trendingMovies.map((movie) => (
              <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
            ))
          ) : (
            <p className='text-white'>No trending movies available.</p>
          )}
        </div>
      </div>

      {/* Top Rated Movies Section */}
      <div id='top-rated' className='bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
        <div className='text-3xl font-[Montserrat] text-left'>Top Rated Movies</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
          {topRatedMovies.length > 0 ? (
            topRatedMovies.map((movie) => (
              <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
            ))
          ) : (
            <p className='text-white'>No top-rated movies available.</p>
          )}
        </div>
      </div>

      {/* Watched Recently Section */}
      <div id='watched-recently' className='bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
        <div className='text-3xl font-[Montserrat] text-left'>Watched Recently</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
          {watchedRecently.length > 0 ? (
            watchedRecently.map((movie) => (
              <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
            ))
          ) : (
            <p className='text-white'>No recently watched movies available.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
