import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">404 - Not Found</h1>
        <p className="text-lg mb-8">
          Oops! The page you are looking for might be in another castle.
        </p>
        <Link
          to="/"
          className="text-lg bg-white text-indigo-600 py-2 px-6 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
