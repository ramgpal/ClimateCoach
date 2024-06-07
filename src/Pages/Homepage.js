import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const HomePage = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4 flex justify-between items-center">
        <div className="text-white text-lg font-bold">ClimateCoach</div>
        <div className="flex items-center">
          <Link to="/login" className="bg-white text-blue-500 font-semibold py-2 px-4 rounded mr-4 hover:bg-blue-100">
            Login
          </Link>
          {/* Signup dropdown */}
          <div className="relative">
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" onClick={toggleDropdown}>
              Signup
              <ul className={`absolute ${showDropdown ? '' : 'hidden'} bg-white text-gray-800 pt-1 shadow rounded w-40 right-0 mt-2`} onClick={toggleDropdown}>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link to="/signup/client">Signup as Client</Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link to="/signup/coach">Signup as Coach</Link>
                </li>
              </ul>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Climate Coach</h1>
          <p className="text-lg text-gray-700">Your platform for climate change solutions and coaching.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
