import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-yellow-400 w-full shadow-md">
      <div className="max-w-screen-xl mx-auto py-6 px-4 flex flex-col items-center">
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-4 text-center w-full md:w-1/2">
          Flight Booking
        </h1>

        <div className="w-3/10 flex justify-between text-xl md:text-2xl font-bold text-white">
          <Link
            to="/"
            className="hover:text-yellow-100 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/interested"
            className="hover:text-yellow-100 transition duration-300"
          >
            Interested
          </Link>
          <Link
            to="/booked"
            className="hover:text-yellow-100 transition duration-300"
          >
            Booked
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;