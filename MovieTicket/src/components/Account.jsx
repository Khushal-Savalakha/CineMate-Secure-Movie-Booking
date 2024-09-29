import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="text-lg font-semibold hover:text-gray-200 transition duration-300 bg-transparent border-none focus:outline-none"
      >
        Account
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg z-10 transition-opacity duration-300 opacity-100">
          <Link
            to="/signup"
            onClick={closeDropdown}
            className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
          >
            Signup
          </Link>
          <Link
            to="/login"
            onClick={closeDropdown}
            className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/logout"
            onClick={closeDropdown}
            className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
          >
            Logout
          </Link>
        </div>
      )}
    </div>

  );
};

export default Dropdown;
