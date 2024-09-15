import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import CustomLoadingButton from './controls/CustomButton';
 // Make sure the URL points to your backend API
import { useToast } from '../context/ToastContext';
import { ABC_BACKEND_API_URL } from '../configf/config';

const AddDonation = ({ user, onCancel }) => {
  const [amount, setAmount] = useState(25); // Initialize the amount with the minimum value
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({}); // State to track field errors
  const { name, phonenumber, id } = user; // Destructure user data from props
const {showToast}=useToast()
  // Validate the amount
  const validateAmount = (value) => {
    const errors = {};
    if (value < 25) {
      errors.amount = 'The minimum donation amount is 25.';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAmount(amount);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSaving(true); // Set saving state to true when starting the API call
      try {
        // API call to submit the donation data
        const response = await axios.post(`${ABC_BACKEND_API_URL}/donations/addMonthlyDonation`, {
        customId:id,
          amount,
          name,
          phonenumber,
        });

        // Handle the response if needed
        console.log('Donation successful:', response.data);
        showToast('Donation added successfully!',"success");
        onCancel()
      } catch (error) {
        console.error('Error adding donation:', error);
        showToast(error.response?.data?.message || 'Failed to add donation. Please try again.',"error");
      } finally {
        setIsSaving(false); // Set saving state to false after the API call completes
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg text-center font-bold py-2">Add Monthly Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-lg">Full Name: {`${name}`}</p>
            <p className="text-lg">Phone Number: {phonenumber}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="amount">
              Donation Amount (min 25)
            </label>
            <input
              type="number"
              id="amount"
              min="25"
              step={5}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) {
                  // Clear the error when the user starts editing
                  setErrors({ ...errors, amount: '' });
                }
              }}
              className={`border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-1 bg-gray-300 text-gray-800 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
            <CustomLoadingButton type="submit" isLoading={isSaving} loadingText="Adding" buttonText="Add" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;
