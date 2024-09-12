import React, { useState } from 'react';
import axios from 'axios';

const RandomStory = () => {
  const [story, setStory] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = ['Adventure', 'Mystery', 'Sci-Fi', 'Romance']; // Replace with actual templates from backend if needed

  const fetchStory = async () => {
    try {
      const response = await axios.get(`/api/random-story?template=${selectedTemplate}`); // Adjust URL and parameters
      setStory(response.data.story);
    } catch (error) {
      console.error('Error fetching story:', error);
      setStory('Failed to fetch story.');
    }
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleGenerateClick = () => {
    fetchStory();
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(story)
      .then(() => {
        alert('Story copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy story:', err);
      });
  };

  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white text-center">
          Random Story Generator
        </h2>

        {/* Template Selection */}
        <div className="mb-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <label htmlFor="template-select" className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Select Template:
          </label>
          <select
            id="template-select"
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-200 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 p-2 w-full sm:w-auto"
          >
            <option value="" disabled>Select a template</option>
            {templates.map((template) => (
              <option key={template} value={template}>{template}</option>
            ))}
          </select>
          <button
            onClick={handleGenerateClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
          >
            Generate Story
          </button>
        </div>

        {/* Story Display */}
        <div className="mb-4">
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-4 text-center">
            {story || 'Select a template and click "Generate Story" to see a random story.'}
          </p>
        </div>

        {/* Copy Button */}
        <div className="flex justify-center">
          <button
            onClick={handleCopyClick}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
          >
            Copy Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default RandomStory;
