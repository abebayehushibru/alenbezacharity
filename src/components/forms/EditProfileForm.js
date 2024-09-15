import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Assumes you have an AuthContext
import axios from 'axios';
import { ABC_BACKEND_API_URL } from '../../configf/config';
import { useToast } from '../../context/ToastContext';

const EditProfileForm = () => {
  const [formData, setFormData] = useState();
  const [canEdit, setCanEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth(); // Get authenticated user
const {showToast}=useToast()

  // Regex for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[0-9]{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(ABC_BACKEND_API_URL+`/users/profile`,{headers: {
          Authorization: `Bearer ${user.token}` // Pass the token in the Authorization header
        }});
         // Assume API endpoint for fetching profile data
        const data =  response.data;
        console.log("data     ",data);
        
        setFormData(data.user);
        setCanEdit(data.canEdit)
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (user && user.id) {
      fetchUserData(); // Fetch data once user is available
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Clear specific field error on input focus
  const handleInputFocus = (field) => {
    setSuccessMessage('');
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) {
      newErrors.firstname = 'First name is required.';
    }
    if (!formData.lastname) {
      newErrors.lastname = 'Last name is required.';
    }
    if (!formData.phonenumber || !phoneRegex.test(formData.phonenumber)) {
      newErrors.phonenumber = 'Please enter a valid phone number.';
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (
      !formData.monthlyamount ||
      isNaN(formData.monthlyamount) ||
      Number(formData.monthlyamount) <= 0
    ) {
      newErrors.monthlyamount =
        'Please enter a valid monthly donation amount.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    //070624
    if (validateForm()) {
      try {
   await axios.post( ABC_BACKEND_API_URL+'/users/profile', formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`, // Sending token in Authorization header
          },
        });
  
        // Handle successful response
        showToast('profile updated successful', "success");

        
      } catch (error) {
        showToast('something went wrong please check field and try again', "error");

        
        console.error('Error submitting form:', error);
      }
    }
  };

  // Toggle editable mode
  const toggleEditableMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-2xl mx-auto px-2 py-4 sm:p-6 bg-white  rounded-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Edit Profile</h2>

        {/* Editable Mode Toggle Switch */}
        <label className="flex items-center space-x-2">
          <span className="text-sm font-semibold">Edit Mode</span>
      <input
            type="checkbox"
            checked={isEditable}
            onChange={toggleEditableMode}
            className="w-5 h-5 text-blue-600 bg-gray-300 rounded focus:ring-0 cursor-pointer"
          />
        </label>
      </div>

      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstname" className="block font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData?.firstname}
            onChange={handleChange}
            onFocus={() => handleInputFocus('firstname')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.firstname
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastname" className="block font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData?.lastname}
            onChange={handleChange}
            onFocus={() => handleInputFocus('lastname')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.lastname
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phonenumber" className="block font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={formData?.phonenumber}
            onChange={handleChange}
            onFocus={() => handleInputFocus('phonenumber')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.phonenumber
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.phonenumber && (
            <p className="text-red-500 text-sm">{errors.phonenumber}</p>
          )}
        </div>

        {/* Monthly Donation Amount */}
        <div className="mb-4">
          <label htmlFor="monthlyamount" className="block font-semibold">
            Monthly Amount
          </label>
          <input
            type="number"
            id="monthlyamount"
            name="monthlyamount"
            value={formData?.monthlyamount}
            onChange={handleChange}
            onFocus={() => handleInputFocus('monthlyamount')}
            disabled={!(isEditable&&canEdit)}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.monthlyamount
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.monthlyamount && (
            <p className="text-red-500 text-sm">
              {errors.monthlyamount}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4 sm:col-span-2">
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            onFocus={() => handleInputFocus('email')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4 sm:col-span-2">
          <label htmlFor="address" className="block font-semibold">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData?.address}
            onChange={handleChange}
            onFocus={() => handleInputFocus('address')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.address
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
            rows="2"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isEditable}
        className={`mt-4 px-4 py-2 rounded text-white ${
          isEditable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'
        }`}
      >
        Update Profile
      </button>
    </form>
  );
};

export default EditProfileForm;
