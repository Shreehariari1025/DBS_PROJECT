import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Robot from "../assets/Robot.png";

function EditProfile() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_no: "",
        preferred_genre: "",
        preferred_language: "",
        favorite_actor: "",
        favorite_actress: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            // Fetch current user data to populate the form
            fetch(`http://localhost:5000/user/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setFormData({
                        name: data.name || "",
                        email: data.email || "",
                        phone_no: data.phone_no || "",
                        preferred_genre: data.preferred_genre?.join(", ") || "",
                        preferred_language: data.preferred_language?.join(", ") || "",
                        favorite_actor: data.favorite_actor || "",
                        favorite_actress: data.favorite_actress || ""
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching user data:", err);
                    setError("Failed to fetch user data.");
                    setLoading(false);
                });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare data for API
        const updatedData = {
            ...formData,
            preferred_genre: formData.preferred_genre.split(",").map(item => item.trim()),
            preferred_language: formData.preferred_language.split(",").map(item => item.trim())
        };

        fetch(`http://localhost:5000/update-user/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                navigate("/userprofile");
            } else {
                setError(data.error || "Failed to update profile");
            }
        })
        .catch(err => {
            console.error("Error updating profile:", err);
            setError("Failed to update profile");
        });
    };

    if (!user) {
        return <div className="text-red-500">Please log in first.</div>;
    }

    if (loading) {
        return <div className="text-red-500">Loading user data...</div>;
    }

    return (
        <div className="w-screen h-screen font-[Inter] bg-gradient-to-br from-black to-red-950 text-red-50">
            {/* Navbar */}
            <div className="relative z-30 text-white font-[Inter]">
                <div className="w-full h-20 bg-red-50/10 backdrop-blur-md fixed top-0 left-0 flex justify-between p-3 items-center">
                    <div className="font-[Aclonica] text-xl">BhatFlix</div>
                    <div className="flex gap-3">
                        <div className="flex gap-3 items-center">
                            <button onClick={() => navigate("/dashboard")}>Home</button>
                            <button onClick={() => navigate("/userprofile")}>
                                <img className="h-10 w-10 rounded-full" src={Robot} alt="User Profile" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <div className="px-20 pt-32 pb-20">
                <div className="bg-gradient-to-br from-stone-950 to-black p-10 rounded-xl border border-red-900">
                    <h1 className="text-3xl font-[Montserrat] mb-6">Edit Profile</h1>
                    
                    {error && <div className="text-red-300 mb-4">{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        {/* Personal Details */}
                        <div className="col-span-2 bg-gradient-to-br from-red-50/10 to-red-900/10 p-6 rounded-xl border border-red-900/50">
                            <h2 className="text-xl font-medium mb-4">Personal Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-red-50/5 border border-red-900/50 rounded p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-red-50/5 border border-red-900/50 rounded p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone_no"
                                        value={formData.phone_no}
                                        onChange={handleChange}
                                        className="w-full bg-red-50/5 border border-red-900/50 rounded p-2"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div className="bg-gradient-to-br from-red-50/10 to-red-900/10 p-6 rounded-xl border border-red-900/50">
                            <h2 className="text-xl font-medium mb-4">Preferences</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1">Preferred Genres (comma separated)</label>
                                    <input
                                        type="text"
                                        name="preferred_genre"
                                        value={formData.preferred_genre}
                                        onChange={handleChange}
                                        className="w-full bg-red-50/5 border border-red-900/50 rounded p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Preferred Languages (comma separated)</label>
                                    <input
                                        type="text"
                                        name="preferred_language"
                                        value={formData.preferred_language}
                                        onChange={handleChange}
                                        className="w-full bg-red-50/5 border border-red-900/50 rounded p-2"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Favorites
                        <div className="bg-gradient-to-br from-red-50/10 to-red-900/10 p-6 rounded-xl border border-red-900/50">
                            <h2 className="text-xl font-medium mb-4">Favorites</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1">Favorite Actor</label>
                                    <input
                                        type="text"
                                        name="favorite_actor"
                                        value={formData.favorite_actor}
                                        onChange={handleChange}
                                        className="w-full bg-red-50/5 border border-red-900/50 rounded p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Favorite Actress</label>
                                    <input
                                        type="text"
                                        name="favorite_actress"
                                        value={formData.favorite_actress}
                                        onChange={handleChange}
                                        className="w-full bg-red-50/5 border border-red-900/50 rounded p-2"
                                    />
                                </div>
                            </div>
                        </div> */}

                        <div className="col-span-2 flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/userprofile")}
                                className="px-6 py-2 bg-transparent border border-red-500 rounded hover:bg-red-500/10 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default EditProfile;
