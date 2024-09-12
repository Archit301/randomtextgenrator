import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Adjust based on your routing setup

const History = ({ isAuthenticated, savedTexts }) => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      // Simulate fetching saved texts
      setTexts(savedTexts || []);
    }
  }, [isAuthenticated, savedTexts]);

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col items-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        {!isAuthenticated ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Please Log In
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You need to be logged in to view your history.
            </p>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            >
              Log In
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white text-center">
              Your History
            </h2>
            {texts.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300 text-center">
                You have no saved texts.
              </p>
            ) : (
              <div className="space-y-4">
                {texts.map((text, index) => (
                  <div key={index} className="bg-gray-200 dark:bg-gray-600 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {text.date}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {text.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default History;
