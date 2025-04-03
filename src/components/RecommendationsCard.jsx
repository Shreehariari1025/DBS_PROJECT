import React, { useEffect, useState } from 'react';
import Robot from '../assets/Robot.png'
function RecommendationsCard({ movieId }) {
  const [movie, setMovie] = useState(null);
// Initialize navigate function
  
    useEffect(() => {
      fetch(`http://localhost:5000/movies/${movieId}`)
        .then(res => res.json())
        .then(data => setMovie(data))
        .catch(err => console.error('Error fetching movie:', err));
    }, [movieId]);
  
    if (!movie) return <div>Loading...</div>;
  return (
    <div>
            <div className='lg:w-96 h-96 sm:w-50  relative bg-gradient-to-br from-black to-red-950 rounded-lg flex flex-col font-[Inter] text-white '>  {/* entire card */}
            <img className="w-full h-52 object-cover rounded-t-2xl m-0 p-0" src={movie.image_url} alt="" />
    
            <div className='text-stone-300 text-sm flex items-center p-2 justify-start gap-2'>  {/* year,genre */}
                <div>{movie.release_year}</div>
                <div>{movie.genre}</div>
            </div>
            
            <div className='flex justify-between p-2  text-2xl sm:text-sm'>  {/* movie name,stars */}
            <div >{movie.title}</div>
            <div className='flex justify-center  items-center gap-1'>
            <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626" }}></i>
            <div>{movie.avg_rating}</div> 
            </div>
            </div>
    
          <div className='flex justify-evenly items-center text-black text-sm px-2 absolute bottom-3 gap-3'>
            <button className='lg:w-44 h-10 sm:w-20 bg-red-600 rounded-2xl'>Watchlist</button>
            <button className='lg:w-44 h-10 sm:w-20 bg-white rounded-2xl'>More info</button>
          </div>
            
            
            
         </div>
        </div>
  )
}

export default RecommendationsCard