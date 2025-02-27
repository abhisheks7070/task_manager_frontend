import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = ({ errorMessage }) => {

  const navigate =useNavigate()
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Something went wrong. Please try again later.
        </p>
        {errorMessage && (
          <p className="text-gray-600 text-sm bg-gray-200 p-2 rounded">
            Error: {errorMessage}
          </p>
        )}
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          // onClick={() => window.location.reload()} // Reload the page
          onClick={() => navigate("/")} // Reload the page
        >
          Login Page
        </button>
      </div>
    </div>
  );
};

export default Error;