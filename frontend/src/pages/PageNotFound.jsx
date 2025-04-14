import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const todoItems = [
    { text: "Find missing page", checked: false },
    { text: "Double-check URL", checked: true },
    { text: "Contact support", checked: false },
    { text: "Return to safety", checked: false }
  ];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        {/* Animated 404 Character */}
        <div className="relative mb-12 mx-auto w-48 h-48">
          <div className="absolute inset-0 bg-error/10 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 flex items-center justify-center bg-white rounded-full shadow-lg">
            <span className="text-6xl font-bold text-error">404</span>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md border-2 border-error/20">
            <span className="text-sm font-medium text-error">Page not found!</span>
          </div>
        </div>

        {/* Todo List Section */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-6 mb-12 max-w-md mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Let's solve this:</h2>
          <ul className="space-y-3">
            {todoItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className={`checkbox checkbox-sm mr-3 ${item.checked ? 'checkbox-error' : ''}`}
                />
                <span className={`text-lg ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Message */}
        <h1 className="text-5xl font-bold text-base-content mb-4">Oops! Lost your way?</h1>
        <p className="text-xl text-base-content/60 mb-8">
          The page you're looking for seems to have wandered off our todo list.
        </p>

        {/* Home Redirect */}
        <Link 
          to="/" 
          className="btn btn-primary btn-lg px-8 animate-bounce hover:animate-none"
        >
          ← Return to Home
        </Link>

        {/* Fun Illustration */}
        <div className="mt-12 relative h-32">
          <div className="absolute left-1/4 top-0 w-16 h-16 bg-accent/20 rounded-full animate-float"></div>
          <div className="absolute right-1/4 top-8 w-12 h-12 bg-primary/20 rounded-full animate-float-slow"></div>
          <div className="absolute left-1/3 bottom-0 w-8 h-8 bg-secondary/20 rounded-full animate-float"></div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;