import { trusted } from 'mongoose';
import React, { useState } from 'react'

const LoremIpsumGenrator = () => {
    const [paragraphs, setParagraphs] = useState(1);
  const [generatedText, setGeneratedText] = useState('');

  // Generate Lorem Ipsum text
  const generateText = async () => {
    if (Number(paragraphs) > 100) {
      setParagraphs(100);
    }
    try {
      const res = await fetch(`/backend/text/getloremipsum`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paragraphCount: Number(paragraphs) }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await res.json();
      setGeneratedText(data.loremText); // Ensure full text is set
    } catch (error) {
      console.error('Error generating Lorem Ipsum text:', error);
    }
  };

  // Copy the text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    alert('Copied to clipboard!');
  };

  // Share the text using the Web Share API
  const shareText = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lorem Ipsum Text',
        text: generatedText,
      })
      .then(() => console.log('Text shared successfully'))
      .catch((error) => console.error('Error sharing text:', error));
    } else {
      alert('Share not supported on this browser.');
    }
  };

  // Download the text as a .txt file
  const downloadText = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lorem-ipsum.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Lorem Ipsum Generator</h2>

        <label htmlFor="paragraphs" className="block text-lg font-medium mb-2">
          Number of Paragraphs
        </label>
        <input
          type="number"
          id="paragraphs"
          value={paragraphs}
          onChange={(e) => setParagraphs(e.target.value)}
          min="1"
          max="50"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Enter number of paragraphs"
        />

        <button
          onClick={generateText}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition mb-2"
        >
          Generate
        </button>

        {generatedText && (
          <>
            <label htmlFor="generatedText" className="block text-lg font-medium mt-6 mb-2">
              Generated Text
            </label>
            <textarea
              id="generatedText"
              value={generatedText}
              readOnly
              rows="8"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition mb-2"
              >
                Copy to Clipboard
              </button>

              <button
                onClick={shareText}
                className="flex-1 bg-purple-500 text-white font-semibold py-2 rounded-md hover:bg-purple-600 transition mb-2"
              >
                Share
              </button>

              <button
                onClick={downloadText}
                className="flex-1 bg-gray-500 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition mb-2"
              >
                Download
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LoremIpsumGenrator

