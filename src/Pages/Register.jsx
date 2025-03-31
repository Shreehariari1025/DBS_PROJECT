import React from 'react'
import Rectangle10 from "../assets/Rectangle10.png";
import { useNavigate } from 'react-router-dom';
import { Link,NavLink } from 'react-router-dom';

function Register() {
  const navigate=useNavigate();
  return (
    <>
        <div className=" w-full h-screen px-[150px]   relative bg-gradient-to-br from-black to-red-950 justify-center items-center inline-flex overflow-hidden text-neutral-200">     
            <div className='w-3xl h-[600px] relative bg-gradient-to-l from-stone-950 to-red-500 rounded-3xl border-2 border-[#e10000] flex gap-3'>  {/* box*/}
                <div className='w-1/2 h-full'> {/*image-div*/}
                <img className=' w-full h-full object-cover flex-shrink-0 rounded-l-3xl' src={Rectangle10}alt="not found!" />
                </div> 

                <div className='w-1/2 flex flex-col justify-evenly pl-2 pr-4'>    {/*right-div*/}

                <h2 className='text-red-600 text-2xl text-center'>REGISTER</h2>

                <div className='flex flex-col justify-center '>
                <label className='text-left' htmlFor="Name">Name</label>
                <input className='bg-black rounded-xl border border-red-50 'type="text" id='name'/>
                </div>

                <div className='flex flex-col'>
                <label className='text-left' htmlFor="Email">Email</label>
                <input className='bg-black rounded-xl border border-red-50 'type="email" id='email'/>
                </div>

                <div className='flex flex-col'>
                <label  className='text-left' htmlFor="Phoneno">Phone Number</label>
                <input  className='bg-black rounded-xl border border-red-50 ' type="text" id='phone-no'/>
                </div>

                <div className='flex flex-col'>
                <label className='text-left'  htmlFor="Password">Password</label>
                <input  className='bg-black rounded-xl border border-red-50 ' type="password" id='password'/>
                </div>

                <div className='flex flex-col'>
                <label className='text-left' htmlFor="Confirm-password">Confirm Password</label>
                <input  className='bg-black rounded-xl border border-red-50 caret-white ' type="password" id='confirm-password'/>
                </div>
               
               <div className='flex flex-col justify-center align-center gap-2'>
                <button className='bg-red-600 text-center p-2 rounded-3xl text-black w-50  self-center hover:cursor-pointer  hover:bg-red-500' onClick={()=>{navigate("/dashboard")}}>Register</button>
                <p className='text-center'>Already have an account? <Link className='underline hover:text-blue-200' to="/signin">Login</Link></p>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register