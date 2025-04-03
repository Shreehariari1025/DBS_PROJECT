import React, { useState, useEffect } from "react";
import { useUser } from "../Pages/UserContext";
import ReviewCard2 from "../components/ReviewCard2";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import Robot from "../assets/Robot.png";

function UserProfile() {
    const { user } = useUser(); // Get the logged-in user (contains user ID)
    const [userData, setUserData] = useState(null);
    const [watchedRecently, setWatchedRecently] = useState([]); // Store watched movies
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        if (user) {
            // Fetch user details
            fetch(`http://localhost:5000/user/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching user data:", err);
                    setError("Failed to fetch user data.");
                    setLoading(false);
                });

            // Fetch watch history
            fetch(`http://localhost:5000/watch-history/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched watch history:", data);
                    setWatchedRecently(data);
                })
                .catch((err) => {
                    console.error("Error fetching watch history:", err);
                });
             
            fetch(`http://localhost:5000/getreviews/${user.id}`)
                .then((res) => res.json())
                .then((data) => setUserReviews(data))
                .catch((err) => console.error("Error fetching reviews:", err));    
        }
    }, [user]);

    const handleDeleteReview = (reviewId) => {
        setUserReviews(userReviews.filter((review) => review.review_id !== reviewId));
    };

    if (!user) {
        return <div className="text-red-500">Please log in first.</div>;
    }

    if (loading) {
        return <div className="text-red-500">Loading user data...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="w-screen h-screen font-[Inter] bg-gradient-to-br from-black to-red-950 text-red-50">
            {/* Navbar */}
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

            {/* User Info */}
            <div className="px-20 pt-30 flex flex-col items-left gap-2 text-left">
                <div className="font-[Montserrat] text-left text-2xl font-medium">{userData?.name || "N/A"}</div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-3 p-20 gap-2 text-red-950 bg-gradient-to-br from-stone-950 to-black">
                <div className="flex flex-col items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2 row-span-2 relative">
                    <div className="text-xl">Personal details</div>
                    <div>Name: {userData.name}</div>
                    <div>Email: {userData.email}</div>
                    <div>Phone No: {userData.phone_no || "Not provided"}</div>
                </div>
                <div className="flex flex-col items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2 col-span-2 relative">
                    <div className="text-xl">Preferences</div>
                    <div>Preferred languages: {userData.preferred_language?.join(", ") || "Not specified"}</div>
                    <div>Preferred genres: {userData.preferred_genre?.join(", ") || "Not specified"}</div>
                </div>
                <div className="flex flex-col items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2">
                    <div className="text-xl">Total movies</div>
                    <div>Watched: {userData.watched || 0}</div>
                    <div>Rated: {userData.rated || 0}</div>
                </div>
                <div className="flex flex-col items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2">
                    <div className="text-xl">Favorites</div>
                    <div>Actor: {userData.favorite_actor || "Not specified"}</div>
                    <div>Actress: {userData.favorite_actress || "Not specified"}</div>
                </div>
            </div>

            <div> 
    <Link 
        to="/edit-profile"
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
        Edit Profile
    </Link>
</div>


            {/* Reviews Section */}
            <div className="bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20">
                <div className="text-3xl font-[Montserrat] text-left">Your Reviews</div>
                <div className="flex gap-2 items-center overflow-x-auto">
                    {userReviews.length > 0 ? (
                        userReviews.map((review) => (
                            <ReviewCard2 key={review.review_id} review={review} onDelete={handleDeleteReview} />
                        ))
                    ) : (
                        <p className="text-white">You haven't reviewed any movies yet.</p>
                    )}
                </div>
            </div>

            {/* Watched Recently Section */}
            <div id="watched-recently" className="bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20">
                <div className="text-3xl font-[Montserrat] text-left">Watched Recently</div>
                <div className="flex gap-2 items-center overflow-x-auto">
                    {watchedRecently.length > 0 ? (
                        watchedRecently.map((movie) => (
                            <MovieCard
                                key={movie.movie_id}
                                movieId={movie.movie_id}
                            />
                        ))
                    ) : (
                        <p className="text-white">No recently watched movies available.</p>
                    )}
                </div>
            </div>


            <Footer />
        </div>
    );
}

export default UserProfile;
