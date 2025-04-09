import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-purple-600">Efficio</span>
        </div>
        {/* Hamburger Menu for Mobile */}

        {/* Navigation Links */}
        <nav
          className={`${
            isMobileMenuOpen ? "block w-full px-10" : "hidden"
          } md:flex md:space-x-6 absolute md:static top-16 right-4 bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none w-48 md:w-auto`}
        >
          <a
            href="#"
            className="block text-gray-700 hover:text-purple-600 py-2 md:py-0"
          >
            Home
          </a>
          <a
            href="/#features"
            className="block text-gray-700 hover:text-purple-600 py-2 md:py-0"
          >
            Features
          </a>
          <a
            href="/#testimonials"
            className="block text-gray-700 hover:text-purple-600 py-2 md:py-0"
          >
            Testimonials
          </a>
          <a
            href="/#pricing"
            className="block text-gray-700 hover:text-purple-600 py-2 md:py-0"
          >
            Pricing
          </a>
          <a
            href="/#footer"
            className="block text-gray-700 hover:text-purple-600 py-2 md:py-0"
          >
            About
          </a>
          {/* <a
            href="#"
            className="block text-gray-700 hover:text-purple-600 py-2 md:py-0"
          >
            Contact
          </a> */}
        </nav>

        {/* Buttons */}
        <div className="flex gap-5">
          <Link to="/signup">
            <button className="bg-white text-gray-800 px-4 py-2 border border-gray-500 rounded hover:bg-gray-100 hidden md:block">
              Sign Up
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 hidden md:block">
              Get Started
            </button>
          </Link>
        </div>
        <button
          className="md:hidden text-gray-700 hover:text-purple-600 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faTimes : faBars}
            size="lg"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
