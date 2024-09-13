import React, { useState } from 'react';

const TextConverter = () => {
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');

  // Function to reverse lines
  const reverseLines = () => {
    const lines = inputText.split('\n');
    setConvertedText(lines.reverse().join('\n'));
  };

  // Function to reverse each sentence
  const reverseSentences = () => {
    const sentences = inputText.split('. ');
    setConvertedText(sentences.reverse().join('. '));
  };

  // Function to convert to ASCII values
  const toASCII = () => {
    const asciiText = inputText.split('').map(char => char.charCodeAt(0)).join(' ');
    setConvertedText(asciiText);
  };

  // Function to convert to uppercase
  const toUppercase = () => {
    setConvertedText(inputText.toUpperCase());
  };

  const toHexadecimal = () => {
    const hexText = inputText.split('')
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(' ');
    setConvertedText(hexText);
  };

  // Function to convert to lowercase
  const toLowercase = () => {
    setConvertedText(inputText.toLowerCase());
  };

  // Function to capitalize each sentence
  const capitalizeSentences = () => {
    const sentences = inputText.split('. ');
    const capitalizedSentences = sentences.map(sentence =>
      sentence.charAt(0).toUpperCase() + sentence.slice(1)
    );
    setConvertedText(capitalizedSentences.join('. '));
  };

  const capitalizeWords = (text) => {
   const word= text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
      setConvertedText(word)
  };


    const capitalizeSentence = (text) => {
    const result=text
          .split(/([.!?]\s*)/) // Split by punctuation and include punctuation in the result
          .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase())
          .join('');
          setConvertedText(result)
      };
   

      const copyToClipboard = () => {
        navigator.clipboard.writeText(convertedText);
        alert('Copied to clipboard!');
      };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Text Converter</h2>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="6"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Enter text here"
        />

        <div className="flex flex-wrap gap-4 mb-4">
          <button onClick={reverseLines} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Reverse Lines</button>
          <button onClick={reverseSentences} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Reverse Sentences</button>
          <button onClick={toASCII} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">ASCII Convertor</button>
          <button onClick={toUppercase} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Uppercase</button>
          <button onClick={toLowercase} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Lowercase</button>
          <button onClick={capitalizeWords} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Captial Word</button>
          <button onClick={capitalizeSentence} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Captial Sentence</button>
          <button onClick={toHexadecimal} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Hexadecimal</button>
          <button onClick={capitalizeSentences} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Capitalize Sentences</button>
          {/* <button onClick={copyToClipboard} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Copy</button> */}

        </div>

        {convertedText && (
          <>
            <label htmlFor="convertedText" className="block text-lg font-medium mb-2">Converted Text</label>
            <textarea
              id="convertedText"
              value={convertedText}
              readOnly
              rows="8"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
          </>
        )}
                  <button onClick={copyToClipboard} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">Copy</button>

      </div>
    </div>
  );
};

export default TextConverter;
