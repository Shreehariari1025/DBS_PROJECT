import React from 'react'
import Navbar2 from '../components/Navbar2'
import Kantara from '../assets/Kantara.png'
import Footer from '../components/Footer'
import CastCard from '../components/CastCard'

function IndividualMovie() {
  return (
    <div className='w-screen h-screen font-[Inter] text-red-50  bg-gradient-to-br from-black to-red-950'>
        <Navbar2/>
        <div className=' pt-30 w-screen h-[700px] bg-cover bg-center' style={{ backgroundImage: `url(${Kantara})` }}>
        <div className=' p-4 absolute bottom-3 flex flex-col justify-evenly '>
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

        <Footer/>
    </div>
  )
}

export default IndividualMovie