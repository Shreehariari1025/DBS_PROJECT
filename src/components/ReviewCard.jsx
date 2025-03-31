import React from 'react'
import Robot from '../assets/Robot.png'
function ReviewCard() {
  return (
    <div>

    <div className='flex flex-col justify-evenly p-3 pr-5 rounded-2xl bg-gradient-to-b from-red-100 to-red-500 w-72 h-96 text-red-950 font-[Inter] font-medium'>  {/* entire card */}
    <div className='flex flex-col gap-2'>
    <div className='text-black text-3xl text-left'> A Must-Have for Movie Lovers! </div>
    <div className='flex items-center justify-start gap-2 text-lg '>
        <img className='w-6 h-6 rounded-full border border-red-50' src={Robot} alt="" />
        <div>Emily R</div>
        </div>
    </div>
    <div className='flex font-normal text-left text-lg overflow-y-auto'>
    This site has completely changed how I track and discover movies. The recommendations are spot-on, and I love how easy it is to keep up with streaming availability! 
    </div>
    </div>

    </div>
  )
}

export default ReviewCard