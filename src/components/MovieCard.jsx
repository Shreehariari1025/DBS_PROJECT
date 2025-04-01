
import { useEffect, useState } from "react";
import Robot from '../assets/Robot.png'

//import axios from "axios";

function MovieCard({ movieId }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
      fetch(`http://localhost:5000/movies/${movieId}`)
          .then(res => res.json())
          .then(data => setMovie(data))
          .catch(err => console.error('Error fetching movie:', err));
  }, [movieId]);

    if (!movie) return <div>Loading...</div>;

  return (
    <div>
        <div className='w-48 h-80 relative bg-gradient-to-br from-black to-red-950 rounded-2xl flex flex-col font-[Inter] text-white '>  {/* entire card */}
        <img className="w-full h-52 object-cover rounded-t-2xl m-0 p-0" src={movie.image_url} alt="" />


        <div className='flex justify-between px-2  text-sm'>  {/* movie name,stars */}
        <div>{movie.title}</div>
        <div className='flex justify-center  items-center gap-1'>
        <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626" }}></i>
        <div>8.8</div> 
        </div>
        </div>

        <div className='text-stone-300 text-xs flex items-center px-2 justify-start gap-2'>  {/* year,genre */}
            <div>{movie.release_year}</div>
            <div>{movie.genre}</div>
        </div>
        
        <div className='flex justify-center'> {/*button*/}
        <button className='w-44 h-8 p-3 flex justify-center items-center rounded-xl bg-red-600 text-black outline outline-black text-sm absolute bottom-3 hover: cursor-pointer'>More info</button>
        </div>
        
     </div>
    </div>
  )
}

export default MovieCard