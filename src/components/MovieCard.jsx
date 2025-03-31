import React from 'react'
import Robot from '../assets/Robot.png'
function MovieCard() {
  return (
    <div>
        <div className='w-48 h-80 relative bg-gradient-to-br from-black to-red-950 rounded-2xl flex flex-col font-[Inter] text-white '>  {/* entire card */}
        <img className="w-full h-52 object-cover rounded-t-2xl m-0 p-0" src={Robot} alt="" />


        <div className='flex justify-between px-2  text-sm'>  {/* movie name,stars */}
        <div>MOVIE NAME</div>
        <div className='flex justify-center  items-center gap-1'>
        <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626" }}></i>
        <div>8.8</div> 
        </div>
        </div>

        <div className='text-stone-300 text-xs flex items-center px-2 justify-start gap-2'>  {/* year,genre */}
            <div>2020</div>
            <div>Genre</div>
        </div>
        
        <div className='flex justify-center'> {/*button*/}
        <button className='w-44 h-8 p-3 flex justify-center items-center rounded-xl bg-red-600 text-black outline outline-black text-sm absolute bottom-3 hover: cursor-pointer'>More info</button>
        </div>
        
     </div>
    </div>
  )
}

export default MovieCard