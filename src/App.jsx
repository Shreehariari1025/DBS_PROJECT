import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import SignIn from './Pages/SignIn'
import Register from './Pages/Register'

import Navbar from './components/Navbar'
import Landing from './Pages/Landing'
import MovieCard from './components/MovieCard'
import ReviewCard from './components/ReviewCard'
import Dashboard from './Pages/Dashboard'
import RecommendationsCard from './components/RecommendationsCard'
import Navbar2 from './components/Navbar2'
import UserProfile from './Pages/UserProfile'
import ReviewCard2 from './components/ReviewCard2'
import IndividualMovie from './Pages/IndividualMovie';
import Review from './Pages/Review';
import { UserProvider } from './Pages/UserContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/individualmovie/:movieId" element={<IndividualMovie/>} />
        <Route path="/review" element={<Review/>} />
      </Routes>
    </UserProvider>
      
   
  )
}

export default App
