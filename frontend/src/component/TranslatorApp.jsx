import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TranslatorApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    // Fetch available languages
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://libretranslate.com/languages');
        setLanguages(response.data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = false;
      speechRecognition.lang = sourceLang;

      speechRecognition.onstart = () => setListening(true);

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };

      speechRecognition.onerror = (event) => console.error('Error in recognition:', event.error);

      speechRecognition.onend = () => setListening(false);

      setRecognition(speechRecognition);
    } else {
      console.error('Browser does not support Speech Recognition');
    }
  }, [sourceLang]);

  const handleTranslate = async () => {
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: inputText,
          langpair: `${sourceLang}|${targetLang}`,
        },
      });
      setTranslatedText(response.data.responseData.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const toggleListening = () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    alert('Translated text copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Real-Time Translator</h1>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-800 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text to translate"
        />
        <div className="flex justify-between mb-4 gap-4">
          <div className="flex-1">
            <label className="block mb-2 font-semibold">From:</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-semibold">To:</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between gap-4 mb-4">
          <button
            onClick={handleTranslate}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Translate
          </button>
          <button
            onClick={toggleListening}
            className={`w-full py-2 px-4 rounded ${listening ? 'bg-red-500' : 'bg-green-500'} text-white hover:opacity-90 transition duration-200`}
          >
            {listening ? 'Stop Speech' : 'Start Speech'}
          </button>
        </div>
        <h2 className="text-xl font-bold mt-4 mb-2">Translated Text:</h2>
        <div className="flex justify-between items-center gap-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
            value={translatedText}
            readOnly
            rows="4"
          />
          <button
            onClick={copyToClipboard}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslatorApp;
