import React, { useState } from "react";
import axios from "axios";
import Logout from "./Logout";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        email,
        name,
        password,
      });

      // If successful, dispatch the Redux action and show success message
      if (response.status === 201) {
        setMessage("Signed up successfully!");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email,
            name,
            data: "Signed Up Successfully",
            password,
          })
        );
      } else {
        setMessage("Signup failed.");
      }
    } catch (error) {
      // Handle the error and display error message
      setMessage(
        "Signup error: " +
          (error.response && error.response.data
            ? error.response.data.msg || error.response.data
            : error.message)
      );
      console.log(error.response || error.message);
    } finally {
    }
  };

  return (
    <>
      {user ? (
        <Logout />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  htmlFor="name"
                  className="block text-white font-semibold mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-white">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-indigo-500 hover:text-indigo-400"
                >
                  Login
                </a>
              </p>
            </div>

            {message && (
              <p
                className={`mt-4 text-sm ${
                  message.startsWith("Signup error")
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
