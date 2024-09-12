import React, { useState, useRef, useCallback, useEffect } from 'react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      <div className="w-full max-w-md bg-white dark:bg-gray-700 shadow-lg rounded-lg px-6 py-4 mx-4 sm:mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">Password Generator</h1>
        
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Copy
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg cursor-pointer"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm mb-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="numberInput" className="text-gray-700 dark:text-gray-300">Include Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed(prev => !prev)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="characterInput" className="text-gray-700 dark:text-gray-300">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
