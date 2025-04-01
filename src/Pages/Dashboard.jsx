import React from 'react';
import Navbar2 from '../components/Navbar2';
import RecommendationsCard from '../components/RecommendationsCard';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';


let username = 'Shreehari';

function Dashboard() {
  return (
    <div className="w-full h-screen text-red-50  bg-gradient-to-br from-stone-950 to-black font-[Inter]  ">
      <Navbar2 />
      <div className='pt-30 flex flex-col justify-evenly items-center gap-3'> {/* Welcome, enjoy, search */}
        <div className='lg:text-6xl sm:text-2xl font-semibold font-[Montserrat]'>Welcome back, {username}</div>
        <div className='text-2xl'>Enjoy your time here!!</div>
        <div>
          <input type="search" className="bg-red-50 rounded-3xl lg:w-128 h-12 sm:w-64 text-gray-900 p-2 shadow-[0_0_15px_white]" placeholder="Search... " />
        </div>
      </div>
      
      <div id='recommendations' className=' bg-gradient-to-br from-stone-950 to-black  flex flex-col gap-3 p-20'> {/*recommendations */}
        <div className='text-3xl font-[Montserrat] text-left '>Recommendations</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
        <RecommendationsCard/>
        <RecommendationsCard/>
        <RecommendationsCard/>
        <RecommendationsCard/>
        </div>
      </div>

      <div id='trending2'className='w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
     <div className='text-3xl font-[Montserrat] text-left'>Trending movies</div>
    <div className='flex gap-2 items-center overflow-x-auto'>
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    </div>
    </div>

<div id='watchedrecently' className='w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
  <div className='text-3xl font-[Montserrat] text-left'>Recently watched</div>
  <div className='flex gap-2 items-center overflow-x-auto'>
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
  </div>
</div>


<div id='toprated' className='w-full bg-gradient-to-br from-stone-950 to-black flex flex-col gap-3 p-20'>
  <div className='text-3xl font-[Montserrat] text-left'>Top rated</div>
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
  );
}

export default Dashboard;
