import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate=useNavigate();
  return (
    <div className='text-white font-[Inter] '>
        <div className='w-full h-20 bg-black/75 backdrop-blur-sm fixed top-0 left-0 flex justify-between p-3 items-center '> {/* Navbar */}
        <div className='font-[Aclonica] text-xl'>BhatFlix</div>
        <div className='flex gap-3'>
        <div className='flex gap-3 items-center'>
            <NavLink className={({isActive})=>`${isActive ? "underline decoration-red-700 underline-offset-4 decoration-3" :""}`} to="/reviews">Reviews</NavLink>
            <NavLink className={({isActive})=>`${isActive?"underline decoration-4 underline-offset-2 decoration-red-700":""}`} to="/about">About us</NavLink>
            <NavLink className={({isActive})=>`${isActive?"underline decoration-3 underline-offset-4 decoration-red-700":""}`}to="/trending">Trending</NavLink>
        </div>
            <button className='bg-red-600 p-2 rounded-3xl text-black hover:cursor-pointer' onClick={()=>{navigate("/register")}}>Register</button>
        </div>
        </div>
    </div>
  )
}

export default Navbar
