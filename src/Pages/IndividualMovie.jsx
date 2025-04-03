import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import CastCard from '../components/CastCard';
import ReviewCard3 from '../components/ReviewCard3';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { useUser } from "../Pages/UserContext";

function IndividualMovie() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [actors, setActors] = useState([]);
  const [nonActors, setNonActors] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { user }= useUser(); // Replace with actual user ID

  useEffect(() => {
    if (!movieId) return;

    fetch(`http://localhost:5000/moviedetails/${movieId}`)
      .then(res => res.json())
      .then(data => setMovieDetails(data))
      .catch(err => console.error("Error fetching movie details:", err));

    fetch(`http://localhost:5000/actors/${movieId}`)
      .then(res => res.json())
      .then(data => setActors(data.actors || []))
      .catch(err => console.error("Error fetching actors:", err));

    fetch(`http://localhost:5000/non-actors/${movieId}`)
      .then(res => res.json())
      .then(data => setNonActors(data.actors || []))
      .catch(err => console.error("Error fetching non-actors:", err));

    fetch(`http://localhost:5000/similar-movies/${movieId}`)
      .then(res => res.json())
      .then(data => setSimilarMovies(data.similar_movies || []))
      .catch(err => console.error("Error fetching similar movies:", err));

    fetch(`http://localhost:5000/reviews/${movieId}`)
      .then(res => res.json())
      .then(data => setReviews(data.reviews || []))
      .catch(err => console.error("Error fetching reviews:", err));
  }, [movieId]);

  const handleWatchNow = async () => {
    console.log("User ID:", user?.id);
    console.log("Movie ID:", movieId);

    if (!user?.id || !movieId) {
        console.error("User ID or Movie ID is missing");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/watch-now', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id, movie_id: movieId })
        });

        if (response.ok) {
            console.log("Watch history updated");
        } else {
            console.error("Failed to update watch history");
        }
    } catch (err) {
        console.error("Error updating watch history:", err);
    }
};


  return (
    <div className='w-screen h-screen relative font-[Inter] text-red-50 bg-gradient-to-br from-black to-red-950'>
      <Navbar2 />

      {movieDetails && (
        <div 
          className='pt-30 w-screen h-[700px] bg-cover bg-center' 
          style={{ backgroundImage: `url(${movieDetails.image_url})` }}
        >
          <div className='p-15 absolute top-45'>
            <img 
              className='w-96 h-60 object-cover border border-red-50 rounded-2xl' 
              src={movieDetails.image_url} 
              alt="Movie Poster" 
            />
            <div className='w-96 flex text-3xl justify-between'>
              <div className='font-semibold font-[Montserrat]'>{movieDetails.title}</div>
              <div className='flex items-center justify-center'>
                <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626" }}></i>
                <div>{movieDetails.avg_rating || "N/A"}</div>
                <div className='absolute left-125 text-sm flex gap-2'>
                  <button 
                    className="w-28 h-10 bg-red-600 rounded-2xl text-black"
                    onClick={handleWatchNow}
                  >
                    Watch
                  </button>
                  <button className='w-28 h-10 rounded-2xl outline outline-white text-red-50/75 bg-inherit'>
                    Review
                  </button>
                </div>
              </div>
            </div>
            <div className='text-left text-red-50/50 w-96'>
              {movieDetails.release_year} | {movieDetails.genre}
            </div>
          </div>

          <div className='p-15 absolute -bottom-3 flex flex-col justify-evenly '>
            <div className='font-[Montserrat] text-4xl font-medium text-left'>Description</div>
            <div className='text-sm text-red-50/50 text-left'>{movieDetails.description}</div>
          </div>
        </div>
      )}

      <div className='bg-gradient-to-br from-black to-red-950 p-15'>
        <div className='text-3xl font-[Montserrat] text-left'>Cast</div>
        <div className='flex gap-2 h-75 items-center overflow-x-auto'>
          {actors.map(actor => (
            <CastCard key={actor.individual_id} actorName={actor.name} image={actor.image} role="Actor" />
          ))}
        </div>
      </div>

      <div className='bg-gradient-to-br from-black to-red-950 p-15'>
        <div className='text-3xl font-[Montserrat] text-left'>Crew</div>
        <div className='flex gap-2 h-75 items-center overflow-x-auto'>
          {nonActors.map(crew => (
            <CastCard key={crew.individual_id} actorName={crew.name} image={crew.image} role="Crew" />
          ))}
        </div>
      </div>

      <div className='bg-gradient-to-br from-black to-red-950 p-15'>
        <div className='text-3xl font-[Montserrat] text-left'>Reviews</div>
        <div className='flex gap-2 h-75 items-center overflow-x-auto'>
          {reviews.map(review => (
            <ReviewCard3 key={review.review_id} review={review} />
          ))}
        </div>
      </div>

      {/* Similar Movies Section */}
<div className='bg-gradient-to-br from-black to-red-950 p-15'>
  <div className='text-3xl font-[Montserrat] text-left'>Similar Movies</div>
  <div className='flex gap-2 h-75 items-center overflow-x-auto'>
    {similarMovies.length > 0 ? (
      similarMovies.map(movie => (
        <MovieCard key={movie.movie_id} movieId={movie.movie_id} />
      ))
    ) : (
      <p className='text-white'>No similar movies available.</p>
    )}
  </div>
</div>

      

      <Footer />
    </div>
  );
}

export default IndividualMovie;
