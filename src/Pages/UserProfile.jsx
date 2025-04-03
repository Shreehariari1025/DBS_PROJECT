import React, { useState, useEffect } from "react";
import { useUser } from "../Pages/UserContext";
import ReviewCard2 from "../components/ReviewCard2";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import Robot from "../assets/Robot.png";

function UserProfile() {
    const { user } = useUser(); // Get the logged-in user (contains user ID)
    const [userData, setUserData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/user/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched user data:", data);
    
                    // Ensure data is set correctly
                    if (data && typeof data === "object") {
                        setUserData(data);
                    } else {
                        console.error("Unexpected API response structure:", data);
                    }
    
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching user data:", err);
                    setError("Failed to fetch user data.");
                    setLoading(false);
                });
        }
    }, [user]);
    

    {console.log("Rendering UserProfile with userData:", userData)}

    

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

            <div className="px-20 pt-30 flex flex-col items-left gap-2 text-left">
                <div className="font-[Montserrat] text-left text-2xl font-medium">{userData?.name || "N/A"}</div>
            </div>

            <div className="grid grid-cols-3 p-20 gap-2 text-red-950 bg-gradient-to-br from-stone-950 to-black">
                <div className="flex flex-col items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2 row-span-2 relative">
                    <div className="text-xl">Personal details</div>
                    <div>Name: {userData.name}</div>
                    <div>Email: {userData.email}</div>
                    <div>Phone No: {userData.phone_no || "Not provided"}</div>
                    <i className="fa-solid fa-pen-to-square absolute top-2 right-2 hover:cursor-pointer" style={{ color: "#000000" }}></i>
                </div>
                <div className="flex flex-col items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2 col-span-2 relative">
                    <div className="text-xl">Preferences</div>
                    <div>Preferred languages: {userData.preferred_language?.join(", ") || "Not specified"}</div>
                    <div>Preferred genres: {userData.preferred_genre?.join(", ") || "Not specified"}</div>
                    <i className="fa-solid fa-pen-to-square absolute top-2 right-2 hover:cursor-pointer" style={{ color: "#000000" }}></i>
                </div>
                <div className="flex flex-col items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2">
                    <div className="text-xl">Total movies</div>
                    <div>Watched: {userData.watched_count || 0}</div>
                    <div>Rated: {userData.rated_count || 0}</div>
                </div>
                <div className="flex flex-col items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2">
                    <div className="text-xl">Favorites</div>
                    <div>Actor: {userData.favorite_actor || "Not specified"}</div>
                    <div>Actress: {userData.favorite_actress || "Not specified"}</div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20">
                <div className="text-3xl font-[Montserrat] text-left">Reviews</div>
                <div className="flex gap-2 items-center overflow-x-auto">
                    <ReviewCard2 />
                    <ReviewCard2 />
                    <ReviewCard2 />
                    <ReviewCard2 />
                </div>
            </div>

            <div className="w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20">
                <div className="text-3xl font-[Montserrat] text-left">Recently watched</div>
                <div className="flex gap-2 items-center overflow-x-auto">
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>
            </div>

            <div className="w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20">
                <div className="text-3xl font-[Montserrat] text-left">Favorite movies</div>
                <div className="flex gap-2 items-center overflow-x-auto">
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default UserProfile;
