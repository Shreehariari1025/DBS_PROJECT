import React, { useEffect, useState } from 'react';  // Import useState and useEffect from React
import Navbar2 from '../components/Navbar2';
import RecommendationsCard from '../components/RecommendationsCard';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

let username = 'Shreehari';

function Dashboard() {
  const [trendingMovies, setTrendingMovies] = useState([]); // Declare state for trending movies
  const [topRatedMovies, setTopRatedMovies] = useState([]); // Declare state for top-rated movies

  useEffect(() => {
    // Fetch trending movies from the API
    fetch("http://localhost:5000/trending")
      .then((res) => res.json())
      .then((data) => setTrendingMovies(data))
      .catch((err) => console.error("Error fetching trending movies:", err));

    // Fetch top-rated movies from the API
    fetch("http://localhost:5000/top-rated")
      .then((res) => res.json())
      .then((data) => setTopRatedMovies(data))
      .catch((err) => console.error("Error fetching top-rated movies:", err));
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div className="w-full h-screen text-red-50 bg-gradient-to-br from-stone-950 to-black font-[Inter]">
      <Navbar2 />
      <div className='pt-30 flex flex-col justify-evenly items-center gap-3'>
        <div className='lg:text-6xl sm:text-2xl font-semibold font-[Montserrat]'>
          Welcome back, {username}
        </div>
        <div className='text-2xl'>Enjoy your time here!!</div>
        <div>
          <input type="search" className="bg-red-50 rounded-3xl lg:w-128 h-12 sm:w-64 text-gray-900 p-2 shadow-[0_0_15px_white]" placeholder="Search... " />
        </div>
      </div>

      <div id='recommendations' className='bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
        <div className='text-3xl font-[Montserrat] text-left'>Recommendations</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
          <RecommendationsCard />
          <RecommendationsCard />
          <RecommendationsCard />
          <RecommendationsCard />
        </div>
      </div>

      <div id='trending2' className='w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
        <div className='text-3xl font-[Montserrat] text-left'>Trending movies</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
          ))}
        </div>
      </div>

      <div id='watchedrecently' className='w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
        <div className='text-3xl font-[Montserrat] text-left'>Recently watched</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
        ))}
        </div>
      </div>

      <div id='toprated' className='w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
        <div className='text-3xl font-[Montserrat] text-left'>Top rated</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
        {topRatedMovies.map((movie) => (
          <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
        ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
