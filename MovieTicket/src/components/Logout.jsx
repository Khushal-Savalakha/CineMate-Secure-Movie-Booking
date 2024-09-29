import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  // Fetch user data from local storage and parse it
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null; // Parse JSON string back to object
  if(user===null){
    alert('Please login')
    return
  }
  const handleLogout = () => {
    localStorage.removeItem("userData"); // Remove user data from local storage
    // Redirect to the login page after logout
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.name || 'Guest'}!
        </h1>
        <p className="text-lg mb-2">Email: {user?.email || 'No email available'}</p>
        <p className="text-lg mb-6">{user?.data || 'No data available'}</p>

        {user ? (
          // Show Logout button when the user is logged in
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        ) : (
          // Show Login and Signup buttons when no user data is available
          <div className="flex space-x-4">
            <button
              onClick={handleLogin}
              className="w-1/2 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="w-1/2 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
