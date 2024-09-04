import React, { useState } from 'react';

const EditProfileForm = () => {
  // Initial form data and editable state
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    monthlyDonationAmount: '50',
    email: 'john.doe@example.com',
    address:"Dilla"
  });

  const [errors, setErrors] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Regex for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[0-9]{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Clear specific field error on input focus
  const handleInputFocus = (field) => {
    setSuccessMessage("")
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required.';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required.';
    }
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (
      !formData.monthlyDonationAmount ||
      isNaN(formData.monthlyDonationAmount) ||
      Number(formData.monthlyDonationAmount) <= 0
    ) {
      newErrors.monthlyDonationAmount =
        'Please enter a valid monthly donation amount.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    if (validateForm()) {
      console.log('Profile updated:', formData);
      setSuccessMessage('Profile has been successfully updated.');
      setIsEditable(false); // Switch back to view mode
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
          <label htmlFor="firstName" className="block font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onFocus={() => handleInputFocus('firstName')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.firstName
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onFocus={() => handleInputFocus('lastName')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.lastName
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onFocus={() => handleInputFocus('phoneNumber')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.phoneNumber
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Monthly Donation Amount */}
        <div className="mb-4">
          <label htmlFor="monthlyDonationAmount" className="block font-semibold">
            Monthly Amount
          </label>
          <input
            type="number"
            id="monthlyDonationAmount"
            name="monthlyDonationAmount"
            value={formData.monthlyDonationAmount}
            onChange={handleChange}
            onFocus={() => handleInputFocus('monthlyDonationAmount')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.monthlyDonationAmount
                ? 'border-red-500 ring-red-500'
                : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.monthlyDonationAmount && (
            <p className="text-red-500 text-sm">
              {errors.monthlyDonationAmount}
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
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleInputFocus('email')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 ring-red-500' : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        {/* Email */}
        <div className="mb-4 sm:col-span-2">
          <label htmlFor="email" className="block font-semibold">
          Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onFocus={() => handleInputFocus('address')}
            disabled={!isEditable}
            className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 ring-red-500' : 'focus:ring-blue-500'
            } ${!isEditable && 'bg-gray-100'}`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
      </div>

      {/* Save Changes Button */}
      {isEditable && (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      )}
    </form>
  );
};

export default EditProfileForm;
