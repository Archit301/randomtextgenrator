import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adjust based on your routing setup
import { siginInStart, siginInSuccess, signinFailure } from './Redux/user/userSlice';
import { useDispatch } from 'react-redux';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate=useNavigate();
  const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData,[e.target.id]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { username, email, password} = formData;
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
   

    if (Object.keys(newErrors).length === 0) {
        try {
            // Handle form submission logic here
             dispatch(siginInStart());
            const res = await fetch('/backend/user/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
              const data = await res.json();
              if(data.success===false){
               dispatch(signinFailure(data.message));
            setLoading(false);
            setError(data.message);
            return;
              }
              if(data.message=="this account is already created"){
                setError(data.message)
                return ;
              }
              setLoading(false);
              setError(null);
               dispatch(siginInSuccess(data));
               navigate('/')
              console.log(data);
            } catch (error) {
                dispatch(signinFailure(error.message));
              setLoading(false);
              setError(error.message);
            }
    } else {
      setError(newErrors);
    }
  };

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col items-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-200 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 p-2 w-full"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-200 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 p-2 w-full"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-200 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 p-2 w-full"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

         
         

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
       
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>} 
    </section>
  );
};

export default Register;
