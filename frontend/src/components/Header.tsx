import React from "react";
import defaultBackground from '../assets/header.png';

const Header = ({ title, linkTitle, linkHref, backgroundImage }) => {
  return (
    <div
      className="relative w-full h-60 flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${defaultBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "400px"
      }}
    >
      {/* Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-700/60 via-emerald-800/50 to-green-500/30" />
            
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