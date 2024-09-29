// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (searchTerm.trim()) {
//       navigate(`/searched?query=${searchTerm}`);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav className="bg-gray-800 pt-2">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex items-center">
//             {/* Logo */}
//             <img
//               className="h-14 w-auto"
//               src="/images/logo_2.png"
//               alt="Your Company"
//               style={{ height: '90px' }}
//             />
//             {/* Navbar Links */}
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-6">
//                 <Link
//                   to="/"
//                   className="rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-900"
//                   aria-current="page"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/bookingHistory"
//                   className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
//                 >
//                   Bookings
//                 </Link>
//                 <Link
//                   to="#"
//                   className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
//                 >
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Search Box */}
//           <div className="flex-grow flex justify-center mx-4">
//             <div className="relative w-full max-w-md">
//               <input
//                 type="text"
//                 className="rounded-md pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-full"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               {/* Search Icon */}
//               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//                 <i className="fa-solid fa-magnifying-glass"></i>
//               </span>
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="absolute right-1 rounded-md bg-gray-900 text-white px-4 py-1 ml-2 mt-1" // Added ml-2 for margin
//               >
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* User Profile Section */}
//           <div className="flex items-center">
//             <div className="relative ml-7">
//               <div>
//                 <button
//                   type="button"
//                   onClick={toggleDropdown}
//                   className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                   id="user-menu-button"
//                   aria-expanded={isDropdownOpen}
//                   aria-haspopup="true"
//                 >
//                   <span className="absolute -inset-1.5 ml-3" />
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     className="h-10 w-10 rounded-full"
//                     src="/images/user_logo.png"
//                     alt=""
//                   />
//                 </button>
//               </div>
//               {/* Dropdown menu */}
//               {isDropdownOpen && (
//                 <div
//                   className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//                   role="menu"
//                   aria-orientation="vertical"
//                   aria-labelledby="user-menu-button"
//                   tabIndex={-1}
//                 >
//                   <Link
//                     to="/login"
//                     className="block px-4 py-2 text-sm text-gray-700"
//                     role="menuitem"
//                     tabIndex={-1}
//                     id="user-menu-item-0"
//                   >
//                     Login&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-lock fa-sm"></i>
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="block px-4 py-2 text-sm text-gray-700"
//                     role="menuitem"
//                     tabIndex={-1}
//                     id="user-menu-item-1"
//                   >
//                     Signup&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-user-plus fa-sm"></i>
//                   </Link>
//                   <Link
//                     to="/logout"
//                     className="block px-4 py-2 text-sm text-gray-700"
//                     role="menuitem"
//                     tabIndex={-1}
//                     id="user-menu-item-2"
//                   >
//                     Logout&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-right-to-bracket fa-sm mt-4"></i>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null); // Track active button
  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null; // Parse JSON string back to object
  
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searched?query=${searchTerm}`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle button click
  const handleOnClick = (buttonName) => {
    setActiveButton(buttonName); // Set the clicked button as active
  };

  return (
    <nav className="bg-gray-800 pt-2">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" onClick={() => handleOnClick("home")}  >
              <img
                className="h-14 w-auto mt-2"
                src="/images/logo_2.png"
                alt="Your Company"
                style={{ height: "90px" }}
              />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-6">
                {/* Home Link */}
                <Link
                  to="/"
                  onClick={() => handleOnClick("home")}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${activeButton === "home"
                      ? "text-white bg-gray-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  Home
                </Link>

                {/* Bookings Link */}
                <Link
                  to="/bookingHistory"
                  onClick={() => handleOnClick("bookings")}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${activeButton === "bookings"
                      ? "text-white bg-gray-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  Bookings
                </Link>

                {/* Another Link */}
                <Link
                  to="#"
                  onClick={() => handleOnClick("other")}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${activeButton === "other"
                      ? "text-white bg-gray-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                </Link>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-grow flex justify-center mx-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="rounded-md pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-full"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* Search Icon */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <button
                type="button"
                onClick={handleSearch}
                className="absolute right-1 rounded-md bg-gray-900 text-white px-4 py-1 ml-2 mt-1"
              >
                Search
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center">
            <div className="relative ml-7">
              <div>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5 ml-3" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/images/user_logo.png"
                    alt=""
                  />
                </button>
              </div>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  {!user && (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                      >
                        Login&nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="fa-solid fa-lock fa-sm"></i>
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-1"
                      >
                        Signup&nbsp;&nbsp;&nbsp;
                        <i className="fa-solid fa-user-plus fa-sm"></i>
                      </Link>
                    </>
                  )}
                  {user && (
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Logout&nbsp;&nbsp;&nbsp;
                      <i className="fa-solid fa-right-to-bracket fa-sm mt-4"></i>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
