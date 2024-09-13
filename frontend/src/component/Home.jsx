import React from 'react'

const Home = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold mb-2">Random Story</h3>
          <p className="text-gray-700 mb-4">Generate random stories using creative templates. Perfect for inspiration and creativity.</p>
          <a href="/random-story" className="text-blue-500 hover:underline">Generate Now</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold mb-2">Random Joke</h3>
          <p className="text-gray-700 mb-4">Get a random joke to lighten up your day. Share it with friends or enjoy a laugh.</p>
          <a href="/random-joke" className="text-blue-500 hover:underline">Generate Now</a>
        </div>
       
        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold mb-2">Dummy Code</h3>
          <p className="text-gray-700 mb-4">Generate code snippets for different programming languages. Useful for mockups and testing.</p>
          <a href="/dummy-code" className="text-blue-500 hover:underline">Generate Now</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold mb-2">Password Generator</h3>
          <p className="text-gray-700 mb-4">Create secure passwords with customizable options. Enhance your online security.</p>
          <a href="/password-generator" className="text-blue-500 hover:underline">Generate Now</a>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold mb-2">Lorem Ipsum Generator</h3>
          <p className="text-gray-700 mb-4">Generate Lorem Ipsum placeholder text for mockups, designs, or content. Customize the number of paragraphs.</p>
          <a href="/lorem-ipsum-generator" className="text-blue-500 hover:underline">Generate Now</a>
        </div>
        
      
        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold mb-2">Text Converter</h3>
          <p className="text-gray-700 mb-4">Convert text to various formats or styles. Useful for text processing and formatting tasks.</p>
          <a href="/text-converter" className="text-blue-500 hover:underline">Convert Now</a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition">
          <h3 className="text-xl font-semibold mb-2">Real Time Speech Recognization</h3>
          <p className="text-gray-700 mb-4">Convert text to various Language. Useful for Voice genration and translate to other language.</p>
          <a href="/realtime-converter" className="text-blue-500 hover:underline">Generate Now</a>
        </div>
  
      </div>
    </div>
  </div>
  
  )
}

export default Home
