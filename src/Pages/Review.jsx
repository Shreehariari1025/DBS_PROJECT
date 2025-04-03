import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { FaStar } from 'react-icons/fa';
import ReviewCard4 from '../components/ReviewCard4';
import { useUser } from '../Pages/UserContext';
import { Link } from 'react-router-dom';
import Robot from '../assets/Robot.png'
function Review() {
  const { movieId } = useParams();
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  // Fetch movie and reviews data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`http://localhost:5000/movies/${movieId}`);
        if (!movieResponse.ok) throw new Error('Failed to fetch movie');
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch reviews
        const reviewsResponse = await fetch(`http://localhost:5000/reviews/${movieId}`);
        if (!reviewsResponse.ok) throw new Error('Failed to fetch reviews');
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please log in to submit a review');
      return;
    }

    if (!headline.trim() || !content.trim() || rating === 0) {
      setError('Please fill all fields and provide a rating');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/sendreviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          movie_id: movieId,
          review_heading: headline,
          review_text: content,
          rating: rating
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }

      // Refresh reviews after successful submission
      const newResponse = await fetch(`http://localhost:5000/reviews/${movieId}`);
      const newData = await newResponse.json();
      setReviews(newData);
      
      // Reset form
      setHeadline('');
      setContent('');
      setRating(0);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!movie) {
    return (
      <div className="pt-30 w-screen min-h-screen flex flex-col bg-black text-red-50">
        <Navbar2 />
        <div className="flex-grow flex items-center justify-center">
          {error ? <p className="text-red-500">{error}</p> : <p>Loading movie details...</p>}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-30 w-screen min-h-screen flex flex-col bg-black text-red-50">
      <div className="relative z-30 text-white font-[Inter]">
                <div className="w-full h-20 bg-red-50/10 backdrop-blur-md fixed top-0 left-0 flex justify-between p-3 items-center">
                    <div className="font-[Aclonica] text-xl">BhatFlix</div>
                    <div className="flex gap-3">
                        <div className="flex gap-3 items-center">
                            <Link to="/dashboard">Home</Link>
                            <Link to="/userprofile">
                                <img className="h-10 w-10 rounded-full" src={Robot} alt="User Profile" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

      <div className="flex-grow">
        <div className="flex flex-wrap justify-between px-16 py-8">
          {/* Left Section (Review Form) */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6">
            <h1 className="text-3xl font-semibold">Review</h1>

             <p className="text-red-500">{error}</p>

            <div>
              <label className="text-xl font-medium block text-left">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full h-12 bg-gradient-to-b from-red-50 to-red-600 rounded-2xl px-4 text-black"
                placeholder="Your review title"
              />
            </div>

            <div>
              <label className="text-xl font-medium block text-left">Review Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-28 bg-gradient-to-b from-red-50 to-red-600 rounded-2xl px-4 text-black"
                placeholder="Write your review here..."
              ></textarea>
            </div>

            {/* Star Rating Section */}
            <div>
              <div className="text-xl font-medium text-left">Rate</div>
              <div className="flex space-x-1 mt-2">
                {[...Array(10)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        className="cursor-pointer text-3xl"
                        color={ratingValue <= (hover || rating) ? "#e10000" : "#ccc"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
              <div className="text-sm text-red-50/75 mt-1">
                {rating > 0 ? `You rated this ${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-28 h-10 bg-red-600 rounded-2xl outline outline-black hover:bg-red-700 transition"
              disabled={!user}
            >
              {user ? 'Submit' : 'Login to Review'}
            </button>
          </div>

          {/* Right Section (Movie Info) */}
          <div className="w-full md:w-1/2 flex flex-col items-center mt-8 md:mt-0">
            <img
              className="w-[470px] h-72 rounded-2xl shadow-lg border border-red-50 object-cover"
              src={movie.image_url || "https://placehold.co/470x278"}
              alt={movie.title}
            />
            <h2 className="text-4xl font-semibold mt-4">{movie.title}</h2>
            <p className="text-xl text-red-50/75">
              {movie.release_year} | {movie.genre} | {movie.language}
            </p>
            <div className="flex items-center mt-2">
              <FaStar className="text-red-500 mr-1" />
              <span>{movie.avg_rating || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Existing Reviews */}
        <div className="px-16 py-8">
          <h2 className="text-2xl font-semibold mb-6">Recent Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard4 key={review.review_id} review={review} />
            ))
          ) : (
            <p className="text-red-50/75">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Review;