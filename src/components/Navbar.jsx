import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom"; // optional if using react-router

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              MyBrand
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
            <Link to="/services" className="hover:text-gray-200">
              Services
            </Link>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </div>
        </div>
        </div>

    </nav>
  );
}
