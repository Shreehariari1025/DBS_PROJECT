import React from 'react'
import Robot from '../assets/Robot.png'
function RecommendationsCard() {
  return (
    <div>
            <div className='lg:w-96 h-96 sm:w-50  relative bg-gradient-to-br from-black to-red-950 rounded-lg flex flex-col font-[Inter] text-white '>  {/* entire card */}
            <img className="w-full h-52 object-cover rounded-t-2xl m-0 p-0" src={Robot} alt="" />
    
            <div className='text-stone-300 text-sm flex items-center p-2 justify-start gap-2'>  {/* year,genre */}
                <div>2020</div>
                <div>Genre</div>
            </div>
            
            <div className='flex justify-between p-2  text-2xl sm:text-sm'>  {/* movie name,stars */}
            <div >MOVIE NAME</div>
            <div className='flex justify-center  items-center gap-1'>
            <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626" }}></i>
            <div>8.8</div> 
            </div>
            </div>
    
          <div className='flex justify-evenly items-center text-black text-sm px-2 absolute bottom-3 gap-3'>
            <button className='lg:w-44 h-10 sm:w-20 bg-red-600 rounded-2xl'>Watch now</button>
            <button className='lg:w-44 h-10 sm:w-20 bg-white rounded-2xl'>More info</button>
          </div>
            
            
            
         </div>
        </div>
  )
}

export default RecommendationsCard