import React from "react";
import { Link } from "react-router-dom";


function Hero() {
  return (
    <div className="my-6 flex justify-center px-4">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-full max-w-[1000px]">
          {/* Image */}
          <img
            src="/hero image.avif"
            alt="FarmGuard"
            className="w-full h-auto object-contain rounded-md"
          />

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-8  text-center px-4 sm:px-8">
            
            <div className="flex flex-col sm:flex-row gap-4">
              
                <button className="px-6 py-2 rounded-md text-themeGreen font-semibold bg-teal border-radius: 50%">
                  Risk Assessment Tool
                </button>
                <button className="px-4 py-2 rounded-md text-themeGreen font-semibold bg-teal border-radius: 50%">
                  Compliance Tracker
                </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-4 py-2 rounded-md text-themeGreen font-semibold bg-teal border-radius: 50%">
                  MyFarm360
                </button>
                <button className="px-4 py-2 rounded-md text-themeGreen font-semibold bg-teal border-radius: 50%">
                  Guidelines
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
