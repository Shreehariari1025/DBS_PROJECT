import React from 'react'
import Rectangle10 from "../assets/Rectangle10.png"
import { Link,NavLink } from 'react-router-dom'
function SignIn() {
  return (
    <>
    <div className=" w-full h-screen px-[150px]   relative bg-gradient-to-br from-black to-red-950 justify-center items-center inline-flex overflow-hidden text-neutral-200">     
        <div className='w-3xl h-[600px] relative bg-gradient-to-l from-stone-950 to-red-500 rounded-3xl border-2 border-[#e10000] flex gap-3'>  {/* box*/}
            

            <div className=' px-4 pt-5 w-1/2 flex flex-col justify-start gap-3 '>    {/*left-div*/}

            <h2 className='text-red-600 text-2xl text-center'>SIGN IN</h2>

            <div className='flex flex-col justify-center '>
            <label className='text-left' htmlFor="Name">Username</label>
            <input className='bg-black rounded-xl border border-red-50 'type="text" id='name'/>
            </div>

            <div className='flex flex-col justify-center '>
            <label className='text-left' htmlFor="Name">Password</label>
            <input className='bg-black rounded-xl border border-red-50 'type="text" id='name'/>
            </div>
            <div className='text-right text-xs hover:underline hover:decoration-1'>
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
            
           
            
            </div>
            <div className='w-1/2 h-full'> {/*image-div*/}
            <img className=' w-full h-full object-cover flex-shrink-0 rounded-r-3xl' src={Rectangle10}alt="not found!" />
            </div> 

        </div>
    </div>
</>
  )
}

export default SignIn