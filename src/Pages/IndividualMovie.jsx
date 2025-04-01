import React from 'react'
import Navbar2 from '../components/Navbar2'
import Kantara from '../assets/Kantara.png'
import Footer from '../components/Footer'
import CastCard from '../components/CastCard'
import Robot from '../assets/Robot.png'
import ReviewCard3 from '../components/ReviewCard3'
import MovieCard from '../components/MovieCard'
function IndividualMovie() {
  return (
    <div className='w-screen h-screen  relative font-[Inter] text-red-50  bg-gradient-to-br from-black to-red-950'>
        <Navbar2/>
        <div className=' pt-30 w-screen h-[700px] bg-cover bg-center' style={{ backgroundImage: `url(${Kantara})` }}>
        <div className='p-15 absolute top-45'>
          <img className='w-96 h-60 object-cover border border-red-50 rounded-2xl ' src={Robot} alt="not found" />
          <div className='w-96 flex text-3xl justify-between'>
          <div className=' font-semibold font-[Montserrat]'>Name</div>
          <div className='flex items-center justify-center'>
          <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626" }}></i>
            <div>8.8</div>

            <div className=' absolute left-125 text-sm flex gap-2'>
              <button className="w-28 h-10 relative bg-red-600 rounded-2xl  outline-black/75 text-black">Watch</button>
              <button className='w-28 h-10 relative rounded-2xl outline outline-white text-red-50/75 bg-inherit '>Review</button>
            </div>

          </div>
          </div>

          <div className='text-left text-red-50/50 w-96 '>
          Year | Genre | Language
          </div>

        </div>

        <div className=' p-15 absolute -bottom-3 flex flex-col justify-evenly '>
            <div className='  font-[Montserrat] text-4xl font-medium text-left'>Description</div>
            <div className='text-sm text-red-50/50 text-left'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt laboriosam aliquid odio ullam accusamus voluptate ipsum veritatis esse a vel qui eveniet impedit quidem placeat, odit animi dolore harum voluptas!</div>
        </div>
        </div>
           
        <div className=' bg-gradient-to-br from-stone-950 to-black  flex flex-col  p-15 '> 
        <div className='text-3xl font-[Montserrat] text-left '>Cast</div>
        <div className='flex gap-2 h-75 items-center overflow-x-auto'>
        <CastCard/>
        <CastCard/>
        <CastCard/>
        <CastCard/>
        <CastCard/>
        <CastCard/>  
        </div>
      </div>


      <div className=' bg-gradient-to-br from-stone-950 to-black  flex flex-col  p-15 '> 
        <div className='text-3xl font-[Montserrat] text-left '>Crew</div>
        <div className='flex gap-2 h-75 items-center overflow-x-auto'>
        <CastCard/>
        <CastCard/>
        <CastCard/>
        <CastCard/>
        <CastCard/>
        <CastCard/>  
        </div>
      </div>

      <div className=' bg-gradient-to-br from-stone-950 to-black  flex flex-col  p-15 '>
      <div className='text-3xl font-[Montserrat] text-left '>Reviews</div>
      <div className='flex gap-2 h-75 items-center overflow-x-auto'>
        <ReviewCard3/> 
        <ReviewCard3/> 
        <ReviewCard3/> 
        <ReviewCard3/> 
        <ReviewCard3/> 
        </div>
      </div>

      <div  className=' bg-gradient-to-br from-stone-950 to-black  flex flex-col gap-3 p-20'> {/*recommendations */}
        <div className='text-3xl font-[Montserrat] text-left '>Similar movies</div>
        <div className='flex gap-2 items-center overflow-x-auto'>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        </div>
      </div>

        <Footer/>
    </div>
  )
}

export default IndividualMovie