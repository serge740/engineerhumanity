import React from "react";
import defaultBackground from '../assets/image6.jpg';

const Header = ({ title, linkTitle, linkHref, backgroundImage }) => {
  return (
    <div
      className="relative w-full h-60 flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${backgroundImage || defaultBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "300px"
      }}
    >
      {/* Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-500 via-gray-800/80 to-gray-600" />
            
      {/* Content */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <div className="bg-white/20 backdrop-blur-sm inline-flex items-center px-4 py-2 rounded-full">
          <a 
            href={linkHref} 
            className="flex items-center text-blue-100 hover:text-white transition-colors duration-300"
          >
            <span className="hover:underline">Home</span>
            <span className="mx-2 text-blue-300">&gt;</span>
            <span className="hover:underline font-medium">{linkTitle}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;