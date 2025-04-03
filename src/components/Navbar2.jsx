import React from 'react'
import Robot from '../assets/Robot.png'
import { Link,NavLink } from 'react-router-dom'
function Navbar2() {
  const scrollToSection=(id)=>{
        const section=document.getElementById(id);
        if(section){
          section.scrollIntoView({behavior:"smooth"});
        }
  }
  return (

    <div className=' relative z-30 text-white font-[Inter] '>
        <div className='w-full h-20 bg-red-50/10 backdrop-blur-md fixed top-0 left-0 flex justify-between p-3 items-center '> {/* Navbar */}
        <div className='font-[Aclonica] text-xl'>BhatFlix</div>
        <div className='flex gap-3'>
        <div className='flex gap-3 items-center'>

       <div  onClick={()=>{scrollToSection("watched-recently")}} className='hover:cursor-pointer'>Watched Recently</div>
       <div onClick={()=>{scrollToSection("top-rated")}} className='hover:cursor-pointer'>Top Rated</div>
       <div onClick={()=>{scrollToSection("trending")}}className='hover:cursor-pointer'>Trending</div>
       <div onClick={()=>{scrollToSection("recommendations")}}className='hover:cursor-pointer'>Recommendations</div>
            <Link to="/userprofile">
            <img  className='h-10 w-10 rounded-full'src={Robot} alt="" /></Link>
        </div>
           
        </div>
        </div>
    </div>
  )
}

export default Navbar2