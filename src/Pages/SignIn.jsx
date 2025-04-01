import React, { useState } from 'react';
import Rectangle10 from "../assets/Rectangle10.png";
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    setError(""); // Reset error message before new request

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.error || "Something went wrong. Try again.");
      }
    } catch (error) {
      setError("Failed to connect to the server.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-full h-screen px-[150px] relative bg-gradient-to-br from-black to-red-950 flex justify-center items-center text-neutral-200">
      <div className='w-3xl h-[600px] flex gap-3 rounded-3xl border border-red-600'>
        
        <div className='px-4 pt-5 w-1/2 flex flex-col justify-start gap-3 relative bg-gradient-to-l from-stone-950 to-red-800 rounded-3xl'>
          <h2 className='text-red-600 text-2xl text-center'>SIGN IN</h2>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <div className='flex flex-col justify-center'>
            <label htmlFor="email">Email</label>
            <input className='bg-black rounded-xl border border-red-50 p-2' type="email" id='email' value={formData.email} onChange={handleChange} />
          </div>

          <div className='flex flex-col justify-center'>
            <label htmlFor="password">Password</label>
            <input className='bg-black rounded-xl border border-red-50 p-2' type="password" id='password' value={formData.password} onChange={handleChange} />
          </div>

          <div className='absolute bottom-5 flex flex-col items-center justify-center gap-2'>
            <button className='text-black w-40 h-12 bg-red-600 rounded-3xl outline-black hover:cursor-pointer' onClick={handleLogin}>
              Sign In
            </button>
            <div>
              Don't have an account? <Link className='underline hover:decoration-red-600' to='/register'>Register</Link>
            </div>
          </div>
        </div>

        <div className='w-1/2 h-full'>
          <img className='w-full h-full object-cover flex-shrink-0 rounded-r-3xl' src={Rectangle10} alt="Not found!" />
        </div>

      </div>
    </div>
  );
}

export default SignIn;
