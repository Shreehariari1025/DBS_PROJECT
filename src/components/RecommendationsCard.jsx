import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Robot from "../assets/Robot.png";

function RecommendationsCard({ movieId }) {
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        fetch(`http://localhost:5000/movies/${movieId}`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error("Error fetching movie:", err));
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <div className="lg:w-96 h-96 sm:w-50 relative bg-gradient-to-br from-black to-red-950 rounded-lg flex flex-col font-[Inter] text-white">
                {/* Movie Image */}
                <img className="w-full h-52 object-cover rounded-t-2xl m-0 p-0" src={movie.image_url} alt={movie.title} />

                {/* Year & Genre */}
                <div className="text-stone-300 text-sm flex items-center p-2 justify-start gap-2">
                    <div>{movie.release_year}</div>
                    <div>{movie.genre}</div>
                </div>

                {/* Title & Rating */}
                <div className="flex justify-between p-2 text-2xl sm:text-sm">
                    <div>{movie.title}</div>
                    <div className="flex justify-center items-center gap-1">
                        <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626" }}></i>
                        <div>{movie.avg_rating}</div>
                    </div>
                </div>

                {/* More Info Button */}
                <div className="flex justify-center items-center text-black text-sm px-2 absolute bottom-3">
                    <button
                        className="w-90 h-10  bg-white rounded-2xl"
                        onClick={() => navigate(`/individualmovie/${movieId}`)} // Navigate to movie details page
                    >
                        More info
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecommendationsCard;
