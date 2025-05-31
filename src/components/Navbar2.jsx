import React from "react";
import Robot from "../assets/Robot.png";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../Pages/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar2() {
  const [loggingOut, setLoggingOut] = useState(false);
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setLoggingOut(true);
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  return (
    <div className=" relative z-30 text-white font-[Inter] ">
      {loggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-red-600 text-xl text-center">
            Logging out...
          </div>
        </div>
      )}
      <div className="w-full h-20 bg-red-50/10 backdrop-blur-md fixed top-0 left-0 flex justify-between p-3 items-center ">
        {" "}
        {/* Navbar */}
        <div className="font-[Aclonica] text-xl">BhatFlix</div>
        <div className="flex gap-3">
          <div className="flex gap-3 items-center">
            <button
              className="w-20 text-white bg-red-600 p-2 rounded-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
            <div
              onClick={() => {
                scrollToSection("watched-recently");
              }}
              className="hover:cursor-pointer"
            >
              Watched Recently
            </div>
            <div
              onClick={() => {
                scrollToSection("top-rated");
              }}
              className="hover:cursor-pointer"
            >
              Top Rated
            </div>
            <div
              onClick={() => {
                scrollToSection("trending");
              }}
              className="hover:cursor-pointer"
            >
              Trending
            </div>
            <div
              onClick={() => {
                scrollToSection("recommendations");
              }}
              className="hover:cursor-pointer"
            >
              Recommendations
            </div>
            <Link to="/userprofile">
              <img className="h-10 w-10 rounded-full" src={Robot} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
