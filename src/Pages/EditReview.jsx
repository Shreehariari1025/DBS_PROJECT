import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useUser } from "../Pages/UserContext";
import { Link } from "react-router-dom";
import Robot from "../assets/Robot.png";



function EditReview() {
  const { reviewId } = useParams(); // Get review ID from URL
  const { user } = useUser();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [hover, setHover] = useState(null);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  console.log("Review ID from URL:", reviewId);

  // Fetch existing review data

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://localhost:5000/specificreview/${reviewId}`);
        if (!response.ok) throw new Error("Failed to fetch review");
        const data = await response.json();
        setReview(data);
        setHeadline(data.review_heading);
        setContent(data.review_text);
        setRating(data.rating);

        // Fetch the movie associated with the review
        const movieResponse = await fetch(`http://localhost:5000/movies/${data.movie_id}`);
        if (!movieResponse.ok) throw new Error("Failed to fetch movie details");
        const movieData = await movieResponse.json();
        setMovie(movieData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleEditReview = async (e) => {
    e.preventDefault();

    if (!headline.trim() || !content.trim() || rating === 0) {
      setError("Please fill all fields and provide a rating");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/editreview/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review_heading: headline,
          review_text: content,
          rating: rating,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update review");
      }

      navigate(`/userprofile`); // Navigate back to the reviews page
    } catch (err) {
      setError(err.message);
    }
  };

  if (!review || !movie) {
    return <div className="text-white">Loading...</div>;
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

      <div className="flex-grow flex flex-col items-center px-16 py-8">
        <h1 className="text-3xl font-semibold">Edit Your Review</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col items-center">
          <img className="w-[470px] h-72 rounded-2xl shadow-lg border border-red-50 object-cover"
               src={movie.image_url || "https://placehold.co/470x278"} alt={movie.title} />
          <h2 className="text-4xl font-semibold mt-4">{movie.title}</h2>
          <p className="text-xl text-red-50/75">{movie.release_year} | {movie.genre} | {movie.language}</p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col space-y-6 mt-8">
          <div>
            <label className="text-xl font-medium block text-left">Headline</label>
            <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)}
                   className="w-full h-12 bg-gradient-to-b from-red-50 to-red-600 rounded-2xl px-4 text-black"
                   placeholder="Your review title" />
          </div>

          <div>
            <label className="text-xl font-medium block text-left">Review Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}
                      className="w-full h-28 bg-gradient-to-b from-red-50 to-red-600 rounded-2xl px-4 text-black"
                      placeholder="Write your review here..." />
          </div>

          <div>
            <div className="text-xl font-medium text-left">Rate</div>
            <div className="flex space-x-1 mt-2">
              {[...Array(10)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input type="radio" name="rating" className="hidden" value={ratingValue}
                           onClick={() => setRating(ratingValue)} />
                    <FaStar className="cursor-pointer text-3xl"
                            color={ratingValue <= (hover || rating) ? "#e10000" : "#ccc"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)} />
                  </label>
                );
              })}
            </div>
          </div>

          <button onClick={handleEditReview} className="w-28 h-10 bg-red-600 rounded-2xl outline outline-black hover:bg-red-700 transition">
            Update Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditReview;
