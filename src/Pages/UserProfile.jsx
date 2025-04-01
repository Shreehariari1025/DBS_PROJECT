import React from 'react'

import ReviewCard2 from '../components/ReviewCard2';
import Footer from '../components/Footer';
import MovieCard
 from '../components/MovieCard';
 import { Link,NavLink } from 'react-router-dom';
 import Robot from '../assets/Robot.png'
let username='USERNAME'.toUpperCase();
let date='12/07/2024';
function userProfile() {
  return (
    <div>
    <div className='w-screen h-screen  font-[Inter] bg-gradient-to-br from-black to-red-950 text-red-50 '>
        
          <div className=' relative z-30 text-white font-[Inter] '>
        <div className='w-full h-20 bg-red-50/10 backdrop-blur-md fixed top-0 left-0 flex justify-between p-3 items-center '> 
        <div className='font-[Aclonica] text-xl'>BhatFlix</div>
        <div className='flex gap-3'>
        <div className='flex gap-3 items-center '>

            <Link to="/dashboard">Home</Link>
            <Link to="/userprofile">
            <img  className='h-10 w-10 rounded-full'src={Robot} alt="" /></Link>
        </div>
           
        </div>
        </div>
    </div>


        <div className='px-20 pt-30 flex flex-col items-left gap-2 text-left'>  {/*username,since date */}
        <div className='font-[Montserrat] text-left  text-2xl font-medium'>{username}</div>
        <div className='text-red-50/60'>Member since {date}</div>
        </div>

        <div className='grid grid-cols-3 p-20 gap-2 text-red-950 bg-gradient-to-br from-stone-950 to-black'>
            <div className='flex flex-col  items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2 row-span-2 relative'>
                <div className='text-xl'> Personal details</div>
                <div> Name: Name</div>
                <div>Email: email</div>
                <div>Phone No:number</div>
                <div>Password: *****</div>
                <i className="fa-solid fa-pen-to-square absolute top-2 right-2 hover:cursor-pointer" style={{ color: "#000000" }}></i>
            </div>
            <div className='flex flex-col  items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2 col-span-2 relative'>
                <div className='text-xl'>Preferences</div>
                <div>Preferred languages:languages</div>
                <div>Preferred genres: genres</div>
                <i className="fa-solid fa-pen-to-square absolute top-2 right-2 hover:cursor-pointer" style={{ color: "#000000" }}></i>
            </div>
            <div className='flex flex-col  items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2'>
                <div className='text-xl'>Total movies</div>
                <div>Watched:10</div>
                <div>Rated:25</div>
            </div>
            <div className='flex flex-col  items-start gap-1 bg-gradient-to-br from-red-50 to-red-300 rounded-2xl border border-red-50 p-2 '>
                <div className='text-xl'>Favorites</div>
                <div>Actor: Rishab</div>
                <div>Actress: Rashmika</div>
            </div>   
        </div>

            <div className=' bg-gradient-to-br from-stone-950 to-black  flex flex-col gap-3 p-20'> {/*reviews */}
        <div className='text-3xl font-[Montserrat] text-left '>Reviews</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
        <ReviewCard2/>
        <ReviewCard2/>
        <ReviewCard2/>
        <ReviewCard2/>
        </div>
      </div>

      <div className='w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
     <div className='text-3xl font-[Montserrat] text-left'>Recently watched</div>
    <div className='flex gap-2 items-center overflow-x-auto'>
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    </div>
    </div>

    <div className='w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
     <div className='text-3xl font-[Montserrat] text-left'>Favorite movies</div>
    <div className='flex gap-2 items-center overflow-x-auto'>
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    </div>
    </div>
    <Footer/>
    </div>
    </div>
  )
}

export default userProfile