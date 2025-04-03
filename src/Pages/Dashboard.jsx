import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import RecommendationsCard from '../components/RecommendationsCard';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watchedRecently, setWatchedRecently] = useState([]);

  // ✅ Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/signin");  // Redirect to signin if user is not found
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // ✅ Fetch Movies Only If User Exists
  useEffect(() => {
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
      
      fetch(`http://localhost:5000/watched-recently?user_id=${user.id}`)
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
        <div>
          <input type="search" className="bg-red-50 rounded-3xl lg:w-128 h-12 sm:w-64 text-gray-900 p-2 shadow-[0_0_15px_white]" placeholder="Search... " />
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
          {trendingMovies.length > 0 ? (
            trendingMovies.map((movie) => (
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
