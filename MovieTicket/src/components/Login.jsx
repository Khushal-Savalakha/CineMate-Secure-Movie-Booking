import React, { useState } from "react";
import axios from "axios";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate(); // <-- Use the useNavigate hook here

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Logged in successfully!");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email,
            name: response.data.user.name,
            data: "log in Successfully",
            password,
          })
        );
        console.log(response);
        console.log(response.data.user.name);
        navigate('/'); // <-- Use navigate to redirect
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          `Login error: ${error.response.data.message || "An error occurred"}`
        );
      } else {
        console.log("Login error: Something went wrong.");
      }
    }
  };

  return (
    <>
      {user ? (
        <Logout />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-white font-semibold mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-white">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-indigo-500"
                >
                  Signup
                </a>
              </p>
            </div>
            {errorMessage && (
              <p className="text-red-400 text-sm mt-4">{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
