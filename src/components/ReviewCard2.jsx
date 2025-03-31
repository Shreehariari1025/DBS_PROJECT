import React from 'react'
import Robot from '../assets/Robot.png'

function ReviewCard2() {
  return (
    <div>
      <div className='lg:w-96 sm:w-60 h-96 bg-gradient-to-br from-black to-red-950 rounded-2xl text-red-50 font-[Inter] relative'>
      
      <div className='relative'>
        <img className='object-cover w-full h-60 rounded-t-2xl' src={Robot} alt="" />
        <div className='bg-red-950 flex justify-evenly items-center gap-2 absolute right-0 top-0 h-12 w-16 rounded-tr-2xl'>
        <i className="fa-sharp fa-solid fa-star fa-sm " style={{ color: "#dc2626" }}></i>
        <div>8.8</div> 
        </div>
      </div> 

        <div className='flex flex-col px-2 justify-evenly '>
            <div className='text-left text-red-50/60 text-sm'>Reviewed on date</div>
            <div className='lg:text-xl sm:text-sm text-left'>Mind-blowing and thought-provoking!</div>
        </div>

        <div className='flex justify-evenly items-center text-black text-sm px-2 absolute bottom-3 gap-3'>
            <button className='lg:w-44 sm:w-25 h-10 bg-red-600 rounded-2xl'>Edit review</button>
            <button className='lg:w-44 sm:w-25 h-10 bg-white rounded-2xl'>Delete review</button>
          </div>

      </div> 
    </div>
  )
}

export default ReviewCard2