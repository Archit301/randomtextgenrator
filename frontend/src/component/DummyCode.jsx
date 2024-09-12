import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Sample code snippets for demonstration


const DummyCode = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
    const [codeSnippet, setCodeSnippet] = useState('');
    const languages = ['JavaScript', 'Python', 'Java', 'C++'];
     useEffect(()=>{
        const handleFetchCodeSnippet = async () => {
            try {
              const response = await axios.get(`/backend/text/code-snippet/${selectedLanguage}`);
              console.log(response)
              setCodeSnippet(response.data.code);
            } catch (error) {
              console.error('Error fetching code snippet:', error);
              setCodeSnippet('Failed to fetch code snippet.');
            }
          };
          handleFetchCodeSnippet()
     },[selectedLanguage])
    const handleCopyClick = () => {
      navigator.clipboard.writeText(codeSnippet);
      alert('Code copied to clipboard!');
    };
  
    const handleLanguageChange = (event) => {
      const selected = event.target.value;
      setSelectedLanguage(selected);
      // Update the code snippet based on selected language
      // This is a placeholder; you would fetch or update code based on the language.
      setCodeSnippet(`Sample code for ${selected}`);
    };
  
    return (
      <section className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors flex items-center justify-center py-12 px-4">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg max-w-4xl w-full">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
            Code Snippet
          </h2>
  
          {/* Copy Button */}
          <div className="mb-6 flex justify-start items-center">
            <button
              onClick={handleCopyClick}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
            >
              Copy Code
            </button>
          </div>
  
          {/* Language Selector */}
          <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <label htmlFor="language-select" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Select Language:
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-200 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 p-3 w-full sm:w-auto"
            >
              <option value="" disabled>Select a language</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="csharp">C#</option>
            <option value="react">React</option>
            <option value="jquery">jQuery</option>
            <option value="xml">XML</option>
            <option value="django">Django</option>
            <option value="nodejs">Node.js</option>
            <option value="cpp">C++</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="typescript">TypeScript</option>
            <option value="swift">Swift</option>
            <option value="kotlin">Kotlin</option>
            </select>
          </div>
  
          {/* Code Snippet Display */}
          <pre className="bg-gray-200 dark:bg-gray-900 p-6 rounded-lg overflow-auto text-sm sm:text-base">
            <code className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {codeSnippet || 'Select a language to see the code snippet.'}
            </code>
          </pre>
        </div>
      </section>
    );
  };

export default DummyCode;
