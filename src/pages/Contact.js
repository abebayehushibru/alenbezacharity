import React from 'react';
import { useForm } from 'react-hook-form';

const ContactUs = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="bg-white py-12 max-w-[600px] mx-auto my-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Name</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: true })}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: true })}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              id="phone"
              type="text"
              {...register('phone', { required: true })}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userType" className="text-gray-700 font-semibold mb-2">Type of User</label>
            <select
              id="userType"
              {...register('userType', { required: true })}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>Select</option>
              <option value="school">From School</option>
              <option value="other">Any Other</option>
            </select>
          </div>
          <div className=" relative flex flex-col   md:col-span-2">
            <label htmlFor="message" className="text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              {...register('message', { required: true })}
              rows="4"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
         
          <div className="flex items-center justify-start md:col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
