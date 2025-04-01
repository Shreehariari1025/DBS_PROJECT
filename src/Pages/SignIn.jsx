import React from 'react'
import Rectangle10 from "../assets/Rectangle10.png"
import { Link,NavLink } from 'react-router-dom'

function SignIn() {
  return (
    
    <div className=" w-full h-screen px-[150px]   relative bg-gradient-to-br from-black to-red-950 justify-center items-center inline-flex overflow-hidden text-neutral-200">     
        <div className='w-3xl h-[600px]   flex gap-3 rounded-3xl border border-red-600'>  {/* box*/}
            

            <div className=' px-4 pt-5 w-1/2 flex flex-col justify-start gap-3 relative bg-gradient-to-l from-stone-950 to-red-800 rounded-3xl'>    {/*left-div*/}

            <h2 className='text-red-600 text-2xl text-center'>SIGN IN</h2>

            <div className='flex flex-col justify-center '>
            <label className='text-left' htmlFor="Name">Username</label>
            <input className='bg-black rounded-xl border border-red-50 'type="text" id='name'/>
            </div>

            <div className='flex flex-col justify-center '>
            <label className='text-left' htmlFor="Name">Password</label>
            <input className='bg-black rounded-xl border border-red-50 'type="text" id='name'/>
            </div>

            <div className= 'absolute bottom-5 flex flex-col items-center justify-center gap-2'>
              <button className='text-black w-40 h-12 bg-red-600 rounded-3xl outline-black hover:cursor-pointer'>Sign In</button>
              <div>
                Don't have an account?<Link className='underline hover:decoration-red-600' to='/register'>Register</Link>
              </div>
            </div>

            </div>

            <div className='w-1/2 h-full'> {/*image-div*/}
            <img className=' w-full h-full object-cover flex-shrink-0 rounded-r-3xl' src={Rectangle10}alt="not found!" />
            </div> 

        </div>
    </div>

  )
}

export default SignIn