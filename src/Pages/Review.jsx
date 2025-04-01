import React, { useState } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { FaStar } from 'react-icons/fa';
import ReviewCard4 from '../components/ReviewCard4';

function Review() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className="pt-30 w-screen min-h-screen flex flex-col bg-black text-red-50">
      <Navbar2 />

      {/* Main Content Wrapper (Allows Additional Content Below) */}
      <div className="flex-grow">
        <div className="flex flex-wrap justify-between px-16 py-8">
          {/* Left Section (Inputs, Ratings) */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6">
            <h1 className="text-3xl font-semibold">Review</h1>

            <div>
              <label className="text-xl font-medium block text-left">Headline</label>
              <input
                type="text"
                className="w-full h-12 bg-gradient-to-b from-red-50 to-red-600 rounded-2xl px-4 text-black"
              />
            </div>

            <div>
              <label className="text-xl font-medium block text-left">Review Content</label>
              <textarea
                className="w-full h-28 bg-gradient-to-b from-red-50 to-red-600 rounded-2xl px-4 text-black"
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
            </div>

            <button className="w-28 h-10 bg-red-600 rounded-2xl outline outline-black hover:bg-red-700 transition">
              Submit
            </button>
          </div>

          {/* Right Section (Image and Movie Info) */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <img
              className="w-[470px] h-72 rounded-2xl shadow-lg border border-red-50"
              src="https://placehold.co/470x278"
              alt="Movie Poster"
            />
            <h2 className="text-4xl font-semibold mt-4">Movie Name</h2>
            <p className="text-xl text-red-50/75">Year | Genre | Language</p>
          </div>
        </div>

        {/* Additional Content Can Be Added Here */}
        <div className="px-16 py-8">
          <ReviewCard4/>
        </div>
      </div>

      {/* Footer at the Bottom */}
      <Footer />
    </div>
  );
}

export default Review;
