import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToast } from "../context/ToastContext";
import { ABC_BACKEND_API_URL } from '../configf/config';
import CustomLoadingButton from '../components/controls/CustomButton'
const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm();
const {showToast}= useToast();
const [isSending,setIsSending]=useState(false)
  const onSubmit = async (data) => {
    try {
      setIsSending(true)
      await axios.post(ABC_BACKEND_API_URL+'/users/sendMail', data); // replace with your actual API
      showToast('Message sent successfully',"success");
      reset(); // Clear form after successful submission
      setIsSending(false)
    } catch (error) {
      setIsSending(true)
      showToast('Something went to be wrong',"error");
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="bg-white py-12 max-w-[600px] mx-auto my-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Name</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`border rounded-md p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              onFocus={() => clearErrors('name')}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email format',
                },
              })}
              className={`border rounded-md p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              onFocus={() => clearErrors('email')}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone Field */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              id="phone"
              type="text"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[0-9]{10,15}$/,
                  message: 'Invalid phone number',
                },
              })}
              className={`border rounded-md p-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              onFocus={() => clearErrors('phone')}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* User Type Select */}
          <div className="flex flex-col">
            <label htmlFor="userType" className="text-gray-700 font-semibold mb-2">Type of User</label>
            <select
              id="userType"
              {...register('userType', { required: 'User type is required' })}
              className={`border rounded-md p-2 ${errors.userType ? 'border-red-500' : 'border-gray-300'}`}
              onFocus={() => clearErrors('userType')}
            >
              <option value="" disabled>Select</option>
              <option value="school">From School</option>
              <option value="other">Any Other</option>
            </select>
            {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>}
          </div>

          {/* Message Field */}
          <div className="relative flex flex-col md:col-span-2">
            <label htmlFor="message" className="text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              {...register('message', { required: 'Message is required' })}
              rows="4"
              className={`border rounded-md p-2 w-full ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              onFocus={() => clearErrors('message')}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-start md:col-span-2">
<CustomLoadingButton buttonText='Send Message' isLoading={isSending} loadingText='Sending mail'   type="submit"  />
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
