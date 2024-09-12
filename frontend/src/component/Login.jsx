import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adjust based on your routing setup
import { siginInStart, siginInSuccess, signinFailure } from './Redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData,[e.target.id]: e.target.value})
  }
  const {currentUser,error}=useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password } = formData;

    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length === 0) {
        try {
            
        
            dispatch(siginInStart());
            const res = await fetch('/backend/user/signin', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
              const data = await res.json();
             if(data.success===false){
          dispatch(signinFailure(data.message));
              }
              dispatch(siginInSuccess(data));
             navigate("/")
              
            } catch (error) {
                if(signinFailure(error.message)!=="Cannot read properties of null (reading 'role')")
                     return;
                 dispatch(signinFailure(error.message));  
            }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
