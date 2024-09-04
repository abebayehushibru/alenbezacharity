import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Clear specific field error on input focus
  const handleInputFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  // Form validation
  const validateForm = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required.';
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required.';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password should be at least 6 characters.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password.';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    if (validateForm()) {
      console.log('Password changed successfully:', formData);
      setSuccessMessage('Password has been successfully changed.');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-md"
    >
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      {/* Current Password */}
      <div className="mb-4">
        <label htmlFor="currentPassword" className="block font-semibold">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          onFocus={() => handleInputFocus('currentPassword')}
          className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
            errors.currentPassword ? 'border-red-500 ring-red-500' : 'focus:ring-blue-500'
          }`}
          
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm">{errors.currentPassword}</p>
        )}
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label htmlFor="newPassword" className="block font-semibold">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          onFocus={() => handleInputFocus('newPassword')}
          className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
            errors.newPassword ? 'border-red-500 ring-red-500' : 'focus:ring-blue-500'
          }`}
          
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block font-semibold">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onFocus={() => handleInputFocus('confirmPassword')}
          className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 ${
            errors.confirmPassword ? 'border-red-500 ring-red-500' : 'focus:ring-blue-500'
          }`}
          
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
