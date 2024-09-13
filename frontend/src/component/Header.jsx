import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)
  const toggleTheme = () => {
    setDarkMode(prev => {
      const newDarkMode = !prev;
      document.body.classList.toggle('dark', newDarkMode);
      return newDarkMode;
    });
  };

  const handleMenuToggle = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <header className={`bg-${darkMode ? 'gray-800' : 'white'} text-${darkMode ? 'white' : 'black'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
            <span>RandomTextGen</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            <Link to="/" className="py-2 px-4 hover:text-gray-600 transition duration-300">Home</Link>
            <Link to="/generate-text" className="py-2 px-4 hover:text-gray-600 transition duration-300">Generate Text</Link>
            <Link to="/history" className="py-2 px-4 hover:text-gray-600 transition duration-300">Saved</Link>
            <Link to="/about" className="py-2 px-4 hover:text-gray-600 transition duration-300">About</Link>
            {!currentUser && (  <Link to="/login" className="py-2 px-4 hover:text-gray-600 transition duration-300">Login</Link>)}
            {/* <Link to="/signup" className="py-2 px-4 hover:text-gray-600 transition duration-300">Signup</Link> */}
          </div>

          {/* Theme Toggle Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="text-2xl p-2 focus:outline-none" 
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={handleMenuToggle} 
              className="text-2xl p-2 focus:outline-none" 
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`md:hidden flex flex-col items-center bg-${darkMode ? 'gray-800' : 'white'} text-${darkMode ? 'white' : 'black'} transition-transform transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} absolute top-16 right-0 w-full`}
        >
          <Link to="/" className="py-2 px-4 hover:text-gray-600 transition duration-300" onClick={handleMenuToggle}>Home</Link>
          <Link to="/generate-text" className="py-2 px-4 hover:text-gray-600 transition duration-300" onClick={handleMenuToggle}>Generate Text</Link>
          <Link to="/about" className="py-2 px-4 hover:text-gray-600 transition duration-300" onClick={handleMenuToggle}>About</Link>
          <Link to="/history" className="py-2 px-4 hover:text-gray-600 transition duration-300" onClick={handleMenuToggle}>History</Link>
          {!currentUser && (
  <Link to="/login" className="py-2 px-4 hover:text-gray-600 transition duration-300" onClick={handleMenuToggle}>
    Login
  </Link>
)}      
    {/* <button 
            onClick={toggleTheme} 
            className="text-2xl p-2 focus:outline-none" 
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;