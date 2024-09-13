import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Adjust based on your routing setup


const History = () => {
  const [texts, setTexts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchDetail = async () => {
      if (currentUser?._id) {
        const userId = currentUser._id;
        try {
          const response = await fetch('/backend/text/get-saved-text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });
          const data = await response.json();
          setTexts(data || []);
        } catch (error) {
          console.error('Error fetching saved texts:', error);
        }
      }
    };

    fetchDetail();
  }, [currentUser]);

  // Function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // Formats to 'MM/DD/YYYY HH:MM:SS'
  };

  return (
    <section className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full">
        {!currentUser ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">
              Please Log In
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You need to be logged in to view your history.
            </p>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            >
              Log In
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
              Your History
            </h2>
            {texts.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300 text-center text-lg">
                You have no saved texts.
              </p>
            ) : (
              <div className="space-y-6">
                {texts.map((text, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      {formatDateTime(text.Date)}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base">
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
