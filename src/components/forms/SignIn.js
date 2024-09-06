import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePopup } from '../../context/popUpContext';
import { ABC_BACKEND_API_URL } from '../../configf/config';
// Main SignInForm component
const SignInForm = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showForgotPrompt, setShowForgotPrompt] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const {showPopup,hidePopup}=usePopup()
 const {login}=useAuth()
  // Regex for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[0-9]{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  // Handling input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone || (!emailRegex.test(formData.phone) && !phoneRegex.test(formData.phone))) {
      newErrors.phone = 'Please enter a valid email or phone number.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSend = {
      
        phone: formData.phone,
        password: formData.password,
      // Optionally set to the current date
      };
      try {
        console.log(process.env);
        showPopup("loading")
        const response = await axios.post(ABC_BACKEND_API_URL+'/users/login', dataToSend);
        login(response.data.user);
        hidePopup();
        setFormData({phone: '', password: ''})
     
        hidePopup()
        
      } catch (error) {
     //   setErrors({wrongPwdandPhone:error.data.message})
     hidePopup()
     if (error.response && error.response.data && error.response.data.message) {
      setErrors({wrongPwdandPhone:error.response.data.message})
      console.error('Error logging user:', error.response.data.message); // Display backend message
    } else {
      setErrors({wrongPwdandPhone:error.message})
      console.error('Unknown error:', error.message); // Fallback for unknown errors
    }
      }
      
    }
  };

  // Forgot password handler
  const handleForgotPassword = () => {
    setShowForgotPrompt(true);
  };

  // Confirm password reset
  const confirmForgotPassword = (confirm) => {
    setShowForgotPrompt(false);
    if (confirm) {
      setShowForgotPopup(true);
      setTimeout(() => {
        setShowForgotPopup(false);
        alert('A new password has been sent to your phone number or email.');
      }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 bg-white  rounded-lg ">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
      <form onSubmit={handleSubmit}>
        {/* Email or Phone Number */}
        <label className="block text-lg font-medium mb-2"> Phone Number *</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onFocus={()=>handleInputFocus("phone")}
          onChange={handleChange}
          placeholder="Phone Number"
          className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 ${
            errors.phone ? 'border-red-500 ring-red-500' : 'focus:ring-blue-500'
          }`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        {/* Password */}
        <label className="block text-lg font-medium mb-2">Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={()=>handleInputFocus("password")}
          placeholder="Enter Password"
          className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 ${
            errors.password ? 'border-red-500 ring-red-500' : 'focus:ring-blue-500'
          }`}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        {errors.wrongPwdandPhone && <p className="text-red-500 text-sm pb-2">{errors.wrongPwdandPhone}</p>}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F84D43] text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>

        {/* Forgot Password */}
        <p className="mt-4 text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </p>
        <p className="my-4 text-left">
  If you are not registered member 
          <Link
            to="sign-up"
           
            className="text-blue-500 hover:underline ml-1"
            onClick={()=>hidePopup()}
          >
          Register
          </Link>
        </p>
      </form>

      {/* Forgot Password Confirmation Prompt */}
      {showForgotPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg mb-4">Do you want to reset your password?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => confirmForgotPassword(true)}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => confirmForgotPassword(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Popup */}
      {showForgotPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg mb-4">
              A new password has been sent to your registered phone number or email.
            </p>
            <button
              onClick={() => setShowForgotPopup(false)}
              className="bg-[#F84D43] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
