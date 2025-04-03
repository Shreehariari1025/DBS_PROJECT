import React, { useState } from 'react';
import Rectangle10 from "../assets/Rectangle10.png";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    password: '',
    confirmPassword: '',
    preferred_genre: [],
    preferred_language: []
  });

  const genreOptions = ["Sci-Fi", "Thriller", "Action", "Fantasy", "Historical", "Romance", "Mystery", "Comedy", "Sports", "Drama"];
  const languageOptions = ["English", "Hindi", "Kannada", "Telugu", "Malayalam", "Tamil"];

  const toggleGenreSelection = (genre) => {
    setGenres((prev) => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };

  const toggleLanguageSelection = (language) => {
    setLanguages((prev) => prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]);
  };

  const handleRegister = async () => {
    console.log(formData); // Log all the details to the console

    const requestBody = {
      ...formData,
      preferred_genre: genres,
      preferred_language: languages,
    };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
        navigate('/signin');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="w-full h-screen px-[150px] relative bg-gradient-to-br from-black to-red-950 flex justify-center items-center text-neutral-200">
      <div className='w-3xl h-[650px] relative bg-gradient-to-l from-stone-950 to-red-500 rounded-3xl border-2 border-[#e10000] flex gap-3'>
        {/* Left Image Section */}
        <div className='w-1/2 h-full'>
          <img className='w-full h-full object-cover flex-shrink-0 rounded-l-3xl' src={Rectangle10} alt="Not found!" />
        </div>

        {/* Right Form Section */}
        <div className='w-1/2 flex flex-col justify-evenly pl-4 pr-6'>
          <h2 className='text-red-600 text-2xl text-center'>REGISTER</h2>
          
          {/* Name */}
          <div className='flex flex-col text-left '>
            <label htmlFor="name">Name</label>
            <input 
              className='bg-black rounded-xl border border-red-50 p-2' 
              type="text" 
              id='name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className='flex flex-col text-left'>
            <label htmlFor="email">Email</label>
            <input 
              className='bg-black rounded-xl border border-red-50 p-2' 
              type="email" 
              id='email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Phone Number */}
          <div className='flex flex-col text-left'>
            <label htmlFor="phone-no">Phone Number</label>
            <input 
              className='bg-black rounded-xl border border-red-50 p-2' 
              type="text" 
              id='phone-no'
              value={formData.phone_no}
              onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className='flex flex-col text-left'>
            <label htmlFor="password">Password</label>
            <input 
              className='bg-black rounded-xl border border-red-50 p-2' 
              type="password" 
              id='password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col text-left'>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input 
              className='bg-black rounded-xl border border-red-50 p-2' 
              type="password" 
              id='confirm-password'
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          {/* Preferred Genre Dropdown */}
          <div className='flex flex-col relative text-left'>
            <label>Preferred Genre</label>
            <div className='bg-black rounded-xl border border-red-50 p-2 cursor-pointer' onClick={() => setShowGenreDropdown(!showGenreDropdown)}>
              {genres.length > 0 ? genres.join(", ") : "Select Genres"}
            </div>
            {showGenreDropdown && (
              <div className='absolute top-full left-0 w-full max-h-40 overflow-y-auto bg-black border border-red-50 rounded-xl mt-1 z-10'>
                {genreOptions.map((genre) => (
                  <div key={genre} className='p-2 hover:bg-red-700 cursor-pointer' onClick={() => toggleGenreSelection(genre)}>
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preferred Language Dropdown */}
          <div className='flex flex-col relative text-left'>
            <label>Preferred Language</label>
            <div className='bg-black rounded-xl border border-red-50 p-2 cursor-pointer' onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
              {languages.length > 0 ? languages.join(", ") : "Select Languages"}
            </div>
            {showLanguageDropdown && (
              <div className='absolute top-full left-0 w-full max-h-40 overflow-y-auto bg-black border border-red-50 rounded-xl mt-1 z-10'>
                {languageOptions.map((language) => (
                  <div key={language} className='p-2 hover:bg-red-700 cursor-pointer' onClick={() => toggleLanguageSelection(language)}>
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Register Button and Login Link */}
          <div className='flex flex-col justify-center align-center gap-2'>
            <button 
              className='bg-red-600 text-center p-2 rounded-3xl text-black w-50 self-center hover:cursor-pointer hover:bg-red-500' 
              onClick={handleRegister}>
              Register
            </button>
            <p className='text-center'>Already have an account? <Link className='underline hover:text-blue-200' to="/signin">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
