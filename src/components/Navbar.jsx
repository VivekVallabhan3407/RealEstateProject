import { AuthContext } from "../context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showMobileMenu]);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">

        {/* Logo */}
        <img src={assets.logo} alt="logo" />

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-7 text-white">
          <a href="#Header" className="cursor-pointer hover:text-gray-400">Home</a>
          <a href="#About" className="cursor-pointer hover:text-gray-400">About</a>
          <a href="#Projects" className="cursor-pointer hover:text-gray-400">Projects</a>
          <Link to="/listings" className="cursor-pointer hover:text-gray-400">Listings</Link>
          <Link to="/mortgage" className="cursor-pointer hover:text-gray-400">Mortgage Calculator</Link>
          <a href="#Testimonials" className="cursor-pointer hover:text-gray-400">Testimonials</a>
        </ul>

        {/* Right Side (Signup/Login/Profile) */}
        <div className="hidden md:flex gap-4">

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-white px-6 py-2 rounded-full cursor-pointer"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="bg-blue-500 text-white px-6 py-2 rounded-full cursor-pointer"
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Profile avatar */}
              <div
                onClick={() => setOpenMenu(!openMenu)}
                className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center cursor-pointer font-semibold"
              >
                {user.name[0]}
              </div>

              {/* dropdown */}
              {openMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded text-black">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenMenu(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenMenu(false)}
                  >
                    Wishlist
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setOpenMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>


        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menu_icon}
          className="md:hidden w-7 cursor-pointer"
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${showMobileMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-end p-6 cursor-pointer">
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.cross_icon}
            className="w-6"
            alt="close"
          />
        </div>

        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-large font-medium">
          <a
            href="#Header"
            onClick={() => setShowMobileMenu(false)}
            className="px-4 py-2 rounded-full inline-block"
          >
            Home
          </a>
          <a
            href="#About"
            onClick={() => setShowMobileMenu(false)}
            className="px-4 py-2 rounded-full inline-block"
          >
            About
          </a>
          <a
            href="#Projects"
            onClick={() => setShowMobileMenu(false)}
            className="px-4 py-2 rounded-full inline-block"
          >
            Projects
          </a>

          <Link
            to="/listings"
            onClick={() => setShowMobileMenu(false)}
            className="px-4 py-2 rounded-full inline-block"
          >
            Listings
          </Link>

          <Link to="/mortgage" className="hover:text-blue-600">
            Mortgage Calculator
          </Link>


          <a
            href="#Testimonials"
            onClick={() => setShowMobileMenu(false)}
            className="px-4 py-2 rounded-full inline-block"
          >
            Testimonials
          </a>

          {/* Authentication section inside mobile menu */}
          {/* Authentication inside mobile menu */}
          {!user ? (
            <div className="flex flex-col w-full items-center gap-3 mt-4">
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="px-4 py-2 bg-gray-200 rounded-full w-40 text-center"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                onClick={() => setShowMobileMenu(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-full w-40 text-center"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setShowMobileMenu(false)}
                className="px-4 py-2 rounded-full inline-block"
              >
                My Profile
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setShowMobileMenu(false)}
                className="px-4 py-2 rounded-full inline-block"
              >
                Wishlist
              </Link>

              <button
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
                className="px-4 py-2 rounded-full bg-red-500 text-white mt-2"
              >
                Logout
              </button>
            </>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Navbar;
