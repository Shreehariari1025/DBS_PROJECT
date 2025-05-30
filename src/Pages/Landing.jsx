import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero_img from "../assets/Hero_img.png";
import MovieCard from "../components/MovieCard";
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch trending movies from the API
    fetch("http://localhost:5000/trending")
      .then((res) => res.json())
      .then((data) => setTrendingMovies(data))
      .catch((err) => console.error("Error fetching trending movies:", err));

   
  }, []);

  return (
    <div className="text-white font-[Inter]  bg-gradient-to-b from-stone-950 to-red-700">
      <Navbar />
      <div
        className="w-screen h-[672px] bg-cover bg-center flex flex-col justify-center gap-y-20 bg-scroll"
        style={{ backgroundImage: `url(${Hero_img})` }}
      >
        {" "}
        {/* everthing on bg image*/}
        <div className=" relative z-10 font-[Angkor] text-center text-8xl text-red-600 [text-shadow:_0_4px_8px_rgb(0_0_0_/_1),_0_6px_12px_rgb(0_0_0_/_0.8)]">
          BhatFlix
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl text-red-50 font-bold drop-shadow-xl font-[Playfair_Display] [text-shadow:_0_4px_8px_rgb(255_255_255_/_0.8)]">
            Your Ultimate Movie Companion
          </div>
          <div className="text-lg text-center">
            Track your watchlist, get personalized recommendations, and find
            where to stream your favorite movies – all in one place!
          </div>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div
        id="trending"
        className="bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20"
      >
        <div className="text-3xl font-[Montserrat] text-left">
          Trending Movies
        </div>
        <div className="flex gap-2 items-center overflow-x-auto">
          {trendingMovies.length > 0 ? (
            trendingMovies.map((movie) => (
              <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
            ))
          ) : (
            <p className="text-white">No trending movies available.</p>
          )}
        </div>
      </div>

      <div
        id="about"
        className="flex flex-col justify-evenly  relative bg-gradient-to-l from-stone-950 to-black gap-3 p-20"
      >
        <div className="text-red-50 text-4xl text-left font-[Montserrat]">
          About website
        </div>
        <div className=" text-red-950 grid grid-cols-5 gap-2 ">
          <div className="bg-gradient-to-b from-red-50 to-red-400 rounded-2xl row-span-2 p-1.5">
            <div className="text-xl text-black font-medium">
              Track Your Watchlist
            </div>
            Never lose track of the movies you want to watch! Add films to your
            personal watchlist and access them anytime
          </div>
          <div className=" bg-gradient-to-l from-red-400 to-red-50  rounded-2xl p-1.5">
            <div className="text-xl text-black font-medium"> Rate & Review</div>
          </div>
          <div className="bg-gradient-to-bl from-red-50 to-red-400 rounded-2xl p-1.5">
            <div className="text-xl text-black font-medium">
              {" "}
              Discover Top Charts
            </div>
          </div>
          <div className="bg-gradient-to-b from-red-50 to-red-400 rounded-2xl col-span-2 p-1.5">
            <div className="text-xl text-black font-medium">
              {" "}
              Find out where to watch
            </div>
            No more searching endlessly! Instantly check where your favorite
            movies are streaming across streaming platforms.
          </div>
          <div className="bg-gradient-to-l from-red-400 to-red-50 rounded-2xl col-span-3 p-1.5">
            <div className="text-xl text-black font-medium">
              Personalized Recommendations
            </div>
            Discover movies tailored just for you! Our smart recommendation
            engine suggests films based on your watch history, ratings, and
            favorites—helping you find hidden gems and blockbuster hits
            effortlessly
          </div>
          <div className="bg-gradient-to-bl from-red-50 to-red-400 rounded-2xl p-1.5 ">
            <div className="text-xl text-black font-medium">
              Engage with Community
            </div>
            Join a thriving movie-loving community! Rate and review films,
            discuss plot twists, and see what others are watching.
          </div>
        </div>
      </div>

      {/* some reviews from DB?? */}
      <div
        id="reviews"
        className="flex flex-col justify-evenly  relative bg-gradient-to-l from-stone-950 to-black gap-3 p-20"
      >
        <div className="text-red-50 text-4xl text-left font-[Montserrat]">
          Reviews
        </div>
        <div className="flex items-center overflow-x-auto gap-2">
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-2 items-center bg-gradient-to-b from-stone-950 to-red-800 pb-4">
        <div className="text-2xl text-center">Join 50,000+ Movie Lovers!</div>
        <div>
          Track your watchlist, get smart recommendations, and engage with the
          community
        </div>
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className="bg-red-600 text-black text-center p-2 w-25 rounded-2xl"
        >
          Sign In
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
