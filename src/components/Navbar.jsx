import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate=useNavigate();

  const scrollToSection=(id)=>{
    const section=document.getElementById(id);
    if(section){
      section.scrollIntoView({behavior:"smooth"});
    }
  }

  return (
    <div className='text-white z-30 fixed top-0 font-[Inter] '>
        <div className='w-full h-20 bg-black/75 backdrop-blur-sm fixed top-0 left-0 flex justify-between p-3 items-center '> {/* Navbar */}
        <div className='font-[Aclonica] text-xl'>BhatFlix</div>
        <div className='flex gap-3'>
        <div className='flex gap-3 items-center'>
            <div className='hover:cursor-pointer' onClick={()=>scrollToSection("reviews")}>Reviews</div>
            <div className='hover:cursor-pointer' onClick={()=>{scrollToSection("about")}}>About Us</div>
            <div className='hover:cursor-pointer' onClick={()=>scrollToSection("trending")}>Trending</div>
        </div>
            <button className='bg-red-600 p-2 rounded-3xl text-black hover:cursor-pointer' onClick={()=>{navigate("/register")}}>Register</button>
        </div>
        </div>
        
    </div>
  )
}

export default Navbar
