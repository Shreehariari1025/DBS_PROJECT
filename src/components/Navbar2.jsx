import React from 'react'
import Robot from '../assets/Robot.png'
import { Link,NavLink } from 'react-router-dom'
function Navbar2() {
  return (
    <div className=' relative z-30 text-white font-[Inter] '>
        <div className='w-full h-20 bg-red-50/10 backdrop-blur-md fixed top-0 left-0 flex justify-between p-3 items-center '> {/* Navbar */}
        <div className='font-[Aclonica] text-xl'>BhatFlix</div>
        <div className='flex gap-3'>
        <div className='flex gap-3 items-center'>

        <NavLink className={({isActive})=>`${isActive ? "underline decoration-red-700 underline-offset-4 decoration-3" :""}`} to="/watchedrecently">Watched Recently</NavLink>

        <NavLink className={({isActive})=>`${isActive ? "underline decoration-red-700 underline-offset-4 decoration-3" :""}`} to="/toprated">Top Rated</NavLink>

        <NavLink className={({isActive})=>`${isActive ? "underline decoration-red-700 underline-offset-4 decoration-3" :""}`} to="/trending">Trending</NavLink>

        <NavLink className={({isActive})=>`${isActive ? "underline decoration-red-700 underline-offset-4 decoration-3" :""}`} to="/recommendations">Recommendations</NavLink>

            <img  className='h-10 w-10 rounded-full'src={Robot} alt="" />
        </div>
           
        </div>
        </div>
    </div>
  )
}

export default Navbar2