import React, { useState, useCallback } from 'react';
import axios from 'axios';

const RandomJoke = () => {
  const [joke, setJoke] = useState("");

  const handleGenerateClick = async () => {
    // Placeholder for joke generation logic
    // You should replace this with the actual API call
    const response = await axios.get(`/backend/text/getrandomjokes`);
    setJoke(response.data);
  };

 

  const handleCopyClick = () => {
    navigator.clipboard.writeText(joke);
  };

  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          Random Joke 
        </h2>

        {/* Joke Display */}
        <div className="mb-4">
          <input
            type="text"
            value={joke}
            readOnly
            className="bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm w-full py-2 px-3 text-gray-800 dark:text-gray-200"
            placeholder="Your joke will appear here..."
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleGenerateClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
          >
            Generate Joke
          </button>
          <button
            onClick={handleCopyClick}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
          >
            Copy Joke
          </button>
        </div>
      </div>
    </section>
  );
};

export default RandomJoke;
