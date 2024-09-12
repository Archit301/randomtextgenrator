import React from 'react'

const Aboutus = () => {
  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 p-6 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
          Welcome to our platform! We provide a suite of innovative tools designed to enhance your digital experience. Explore our features below to see how we can assist you.
        </p>

        <div className="space-y-8">
          {/* Feature 1: Random Story Generator */}
          <div className="bg-gray-200 dark:bg-gray-600 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Random Story Generator</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our Random Story Generator creates engaging and exciting stories based on various templates like Adventure, Mystery, Sci-Fi, and Romance. Generate unique stories with a click and immerse yourself in different worlds.
            </p>
          </div>

          {/* Feature 2: Password Generator */}
          <div className="bg-gray-200 dark:bg-gray-600 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Password Generator</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Create secure and customizable passwords with our Password Generator. Choose to include numbers and special characters to ensure your passwords are strong and tailored to your needs. Copy them easily to your clipboard for convenience.
            </p>
          </div>

          {/* Feature 3: Random Text Generator */}
          <div className="bg-gray-200 dark:bg-gray-600 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Random Text Generator</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Generate random text for various purposes such as placeholder content or text samples. Our Random Text Generator allows you to specify the length and type of text to suit your needs.
            </p>
          </div>

          {/* Feature 4: Random Code Snippet Generator */}
          <div className="bg-gray-200 dark:bg-gray-600 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Random Code Snippet Generator</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Quickly generate random code snippets in various programming languages. Perfect for testing, learning, or getting inspiration for your coding projects. Choose your language and get code snippets instantly.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Choose Us?</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Our platform is designed to deliver valuable tools and features with a focus on usability and user satisfaction. Explore our offerings to enhance your productivity and creativity with ease.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Aboutus
