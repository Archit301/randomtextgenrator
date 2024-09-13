import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';

const Genratetext = () => {
    const [text, setText] = useState("");
    const [length, setLength] = useState(10);
    const [charset, setCharset] = useState(["alphabetic"]);
    const [meaningfulText, setMeaningfulText] = useState(false);
    const [customText, setCustomText] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [textStyle, setTextStyle] = useState({
      bold: false,
      italic: false,
      underline: false,
      fontFamily: "Roboto",
      fontColor: "#000000", // Default font color
    });
    const [showCheckboxes, setShowCheckboxes] = useState(false); // State to manage checkbox visibility
    const {currentUser}=useSelector((state)=>state.user)
    // Function to generate random text from API
    const generateRandomText = () => {
        if(length>10000){
            length=length.slice(0, 10000) 
        }
      fetch(`/backend/text/generate-random-text-length?length=${length}`)
        .then((response) => response.json())
        .then((data) => {
          setText(data.result);
          setMeaningfulText(false);
          setShowCheckboxes(false); // Hide checkboxes when generating random text
        })
        .catch((error) => console.error("Error generating random text:", error));
    };
  
    // Function to generate random text with custom length from API
    const generateRandomTextWithLength = () => {
        if(length>10000){
            length=length.slice(0, 10000) 
        }
      const charsetString = charset.join(",");
      fetch(`/backend/text/generate-random-text-custom?length=${length}&charset=${charsetString}`)
        .then((response) => response.json())
        .then((data) => {
          setText(data.result);
          setMeaningfulText(false);
          setShowCheckboxes(true); // Show checkboxes when generating custom length text
        })
        .catch((error) => console.error("Error generating random text:", error));
    };
  
    // Function to generate meaningful text from API
    const generateMeaningfulText = () => {
        if(length>10000){
            length=length.slice(0, 10000) 
        }
      fetch(`/backend/text/generate-meaningful-text?length=${length}`)
        .then((response) => response.json())
        .then((data) => {
          setText(data.text);
          setMeaningfulText(true);
          setShowCheckboxes(false); // Hide checkboxes for meaningful text
        })
        .catch((error) => console.error("Error generating meaningful text:", error));
    };
  
    // Copy text to clipboard
    const copyText = () => {
      navigator.clipboard.writeText(text);
      alert("Text copied!");
    };
  
    // Copy custom text to clipboard
    const copyCustomText = () => {
      navigator.clipboard.writeText(customText);
      alert("Custom text copied!");
    };
  
    // Download the text as .txt file
    const downloadText = () => {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "generated_text.txt";
      document.body.appendChild(element);
      element.click();
    };
  
    // Save the text as .txt file
    const saveText = async() => {
        const content=text;
        const userId=currentUser._id
        console.log(content)
        console.log(userId)
        if(text===""){
        alert("Input is empty");
        return;
        }
        try {
            const response = await fetch('/backend/text/save-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content, userId })
            });
    
            if (response.ok) {
                const data = await response.json();
                alert("Text saved successfully!");
                setMeaningfulText(false);
                setShowCheckboxes(true); // Show checkboxes when generating custom length text
            } else {
                const data = await response.json();
                alert(`Failed to save text: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error saving text:", error);
            alert("An error occurred while saving text.");
        }
    };
  
    // Handle style change for custom input text
    const handleStyleChange = (style) => {
      setTextStyle((prev) => ({ ...prev, [style]: !prev[style] }));
    };
  
    // Toggle custom text input field
    const handleCustomTextToggle = () => {
      setShowCustomInput((prev) => !prev);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Responsive Text Generator</h1>
  
          {/* Text display area */}
          <div className="mb-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Generated text will appear here..."
              value={text}
              readOnly
            />
          </div>
  
          {/* Length input */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Length of Text</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
  
          {/* Charset checkboxes */}
          {showCheckboxes && !meaningfulText && (
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Text Charset</label>
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <input
                    type="checkbox"
                    checked={charset.includes("alphabetic")}
                    onChange={() =>
                      setCharset((prev) =>
                        prev.includes("alphabetic")
                          ? prev.filter((item) => item !== "alphabetic")
                          : [...prev, "alphabetic"]
                      )
                    }
                  />
                  <label className="ml-2">Alphabetic</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={charset.includes("numeric")}
                    onChange={() =>
                      setCharset((prev) =>
                        prev.includes("numeric")
                          ? prev.filter((item) => item !== "numeric")
                          : [...prev, "numeric"]
                      )
                    }
                  />
                  <label className="ml-2">Numeric</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={charset.includes("symbols")}
                    onChange={() =>
                      setCharset((prev) =>
                        prev.includes("symbols")
                          ? prev.filter((item) => item !== "symbols")
                          : [...prev, "symbols"]
                      )
                    }
                  />
                  <label className="ml-2">Symbols</label>
                </div>
              </div>
            </div>
          )}
  
          {/* Buttons */}
          <div className="flex flex-wrap justify-between gap-4 mb-4">
            <button
              onClick={generateRandomText}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
            >
              Get Random Text
            </button>
            <button
              onClick={generateRandomTextWithLength}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
            >
              Get Random Text with Custom Length
            </button>
            <button
              onClick={generateMeaningfulText}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-2"
            >
              Generate Meaningful Text
            </button>
            <button
              onClick={copyText}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-2"
            >
              Copy Text
            </button>
            <button
              onClick={downloadText}
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 mb-2"
            >
              Download as .TXT
            </button>
            <button
              onClick={saveText}
              className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 mb-2"
            >
              Save as .TXT
            </button>
            <button
              onClick={handleCustomTextToggle}
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mb-2"
            >
              Custom Text Input
            </button>
          </div>
  
          {/* Custom input text with styling options */}
          {showCustomInput && (
            <div className="mt-6">
              <textarea
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${textStyle.bold ? "font-bold" : ""} ${textStyle.italic ? "italic" : ""} ${textStyle.underline ? "underline" : ""}`}
                style={{ fontFamily: textStyle.fontFamily, color: textStyle.fontColor }}
                rows="4"
                placeholder="Enter your custom text here..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
              <div className="mt-4">
                <button
                  onClick={copyCustomText}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Copy Custom Text
                </button>
                <button
                  onClick={() => handleStyleChange("bold")}
                  className={`ml-2 py-2 px-4 rounded ${textStyle.bold ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                >
                  Bold
                </button>
                <button
                  onClick={() => handleStyleChange("italic")}
                  className={`ml-2 py-2 px-4 rounded ${textStyle.italic ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                >
                  Italic
                </button>
                <button
                  onClick={() => handleStyleChange("underline")}
                  className={`ml-2 py-2 px-4 rounded ${textStyle.underline ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                >
                  Underline
                </button>
                <input
                  type="color"
                  value={textStyle.fontColor}
                  onChange={(e) => setTextStyle((prev) => ({ ...prev, fontColor: e.target.value }))}
                  className="ml-2 border-none p-2 rounded"
                />
                <select
                  value={textStyle.fontFamily}
                  onChange={(e) => setTextStyle((prev) => ({ ...prev, fontFamily: e.target.value }))}
                  className="ml-2 border border-gray-300 rounded-lg p-2"
                >
                  <option value="Roboto">Roboto</option>
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

          );
  
}

export default Genratetext
