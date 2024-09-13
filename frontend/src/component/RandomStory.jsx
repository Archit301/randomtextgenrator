import React, { useState } from 'react';
import axios from 'axios';

const RandomStory = () => {
  const [story, setStory] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = ['Adventure', 'Mystery', 'Horror', 'Romantic','']; // Replace with actual templates from backend if needed

  const fetchStory = async () => {
    try {
      const response = await axios.get(`/backend/text/getrandomstory/${selectedTemplate}`); // Adjust URL and parameters
      setStory(response.data); // Assuming response.data is the whole story object
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
    if (story && typeof story === 'object') {
      navigator.clipboard.writeText(JSON.stringify(story, null, 2))
        .then(() => {
          alert('Story copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy story:', err);
        });
    }
  };

  return   (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6">
    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg max-w-4xl w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Random Story Generator
      </h2>

      {/* Template Selection */}
      <div className="mb-6 flex flex-col space-y-4">
        <label htmlFor="template-select" className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Select Template:
        </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={handleTemplateChange}
          className="bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-500 p-3 w-full"
        >
          <option value="" disabled>Select a template</option>
          {templates.map((template) => (
            <option key={template} value={template}>{template}</option>
          ))}
        </select>
        <button
          onClick={handleGenerateClick}
          className="bg-indigo-600 text-white px-5 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
        >
          Generate Story
        </button>
      </div>

      {/* Story Display */}
      {story && story !== 'Failed to fetch story.' ? (
        <div className="space-y-4 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Title: {story.title}</h3>
          <p className="text-lg text-gray-800 dark:text-gray-200"><strong>Setting:</strong> {story.setting}</p>
          
          <div className="text-lg text-gray-800 dark:text-gray-200">
            <strong>Characters:</strong>
            <ul className="list-disc pl-5">
              {Array.isArray(story.characters) && story.characters.length > 0 ? (
                story.characters.map((character, index) => (
                  <li key={index} className="my-2">
                    <strong>{character.name}:</strong> {character.description}
                  </li>
                ))
              ) : (
                <li>No characters listed.</li>
              )}
            </ul>
          </div>
          
          <div className="text-lg text-gray-800 dark:text-gray-200">
            <strong>Story:</strong>
            {/* <ol className="list-decimal pl-5"> */}
              {Array.isArray(story.plot) && story.plot.length > 0 ? (
                story.plot.map((plotPoint, index) => (
                  <li key={index} className="my-2">{plotPoint}</li>
                ))
              ) : (
                <li>No plot points available.</li>
              )}
            {/* </ol> */}
          </div>
          
          <p className="text-lg text-gray-800 dark:text-gray-200"><strong>Climax:</strong> {story.climax}</p>
          <p className="text-lg text-gray-800 dark:text-gray-200"><strong>Resolution:</strong> {story.resolution}</p>
          
          <div className="text-lg text-gray-800 dark:text-gray-200">
            <strong>Themes:</strong>
            <ul className="list-disc pl-5">
              {Array.isArray(story.themes) && story.themes.length > 0 ? (
                story.themes.map((theme, index) => (
                  <li key={index} className="my-2">{theme}</li>
                ))
              ) : (
                <li>No themes available.</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-800 dark:text-gray-200 text-center">
          {story === 'Failed to fetch story.' ? story : 'Select a template and click "Generate Story" to see a random story.'}
        </p>
      )}

      {/* Copy Button */}
      <div className="flex justify-center">
        <button
          onClick={handleCopyClick}
          className="bg-green-600 text-white px-5 py-3 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
        >
          Copy Story
        </button>
      </div>
    </div>
  </section>
    );
};

export default RandomStory;
