import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Pages/UserContext';
import Rectangle10 from "../assets/Rectangle10.png";

function SignIn() {
  const navigate = useNavigate();
  const { loginUser } = useUser();  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = formData.email;  
    const password = formData.password;

    console.log("Sending Login Request:", { email, password });

    if (!email || !password) {
        console.error("Email and password are required");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        console.log("Login successful:", data);

        // ✅ Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
    } catch (error) {
        console.error("Error during login:", error);
    }
};



  return (
    <div className="w-full h-screen px-[150px] flex justify-center items-center text-neutral-200 bg-gradient-to-br from-black to-red-950">
      <div className='w-3xl h-[600px] flex gap-3 rounded-3xl border border-red-600'>
        
        <div className='px-4 pt-5 w-1/2 flex flex-col gap-3 bg-gradient-to-l from-stone-950 to-red-800 rounded-3xl'>
          <h2 className='text-red-600 text-2xl text-center'>SIGN IN</h2>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <div className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input className='bg-black rounded-xl border p-2' type="email" id='email' value={formData.email} onChange={handleChange} />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
            <input className='bg-black rounded-xl border p-2' type="password" id='password' value={formData.password} onChange={handleChange} />
          </div>

          <button className='mt-5 text-black bg-red-600 rounded-3xl px-4 py-2' onClick={handleLogin}>
            Sign In
          </button>

          <div className='text-center'>
            Don't have an account? <Link className='underline text-red-500' to='/register'>Register</Link>
          </div>
        </div>

        <div className='w-1/2'>
          <img className='w-full h-full object-cover rounded-r-3xl' src={Rectangle10} alt="Sign In" />
        </div>

      </div>
    </div>
  );
}

export default SignIn;
