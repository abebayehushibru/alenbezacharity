import React, { useEffect, useState } from "react";
import { usePopup } from "../../context/popUpContext";
import axios from "axios";

import { ABC_BACKEND_API_URL } from "../../configf/config";


const AddMember = () => {
  const { showPopup, hidePopup } = usePopup();




  const generateRandomPassword = () => {
    // Generates a random password of 10 characters including letters and numbers
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    amount: "",
    customAmount: "",
    password: generateRandomPassword(), // Set the random password initially
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const donationAmounts = [25, 30, 40, 50, 100, 150, 200];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[0-9]{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const nameRegex = /^[a-zA-Zà-žÀ-Ž'-]{2,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
      newErrors.firstName = "First name is required and should be valid.";
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Last name is required and should be valid.";
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number is required and should be valid.";
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.amount && !formData.customAmount) {
      newErrors.amount = "Amount is required.";
    }
    if (formData.amount === "other" && formData.customAmount < 25) {
      newErrors.amount = "Minimum amount of donation is 25";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSend = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        phonenumber: formData.phone,
        email: formData.email,
        password: formData.password,
        monthlyamount: formData.amount !== "other" ? formData.amount : formData.customAmount,
        createdate: new Date().toISOString(),
      };
      try {
        showPopup("loading");
        const response = await axios.post(
          ABC_BACKEND_API_URL + "/users/register",
          dataToSend
        );
       
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          amount: "",
          customAmount: "",
          password: generateRandomPassword(),
          confirmPassword: "",
        });
        hidePopup();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrors({ wrongonserver: error.response.data.message });
          console.error('Error logging user:', error.response.data.message);
        } else {
          setErrors({ wrongonserver: error.message });
          console.error('Unknown error:', error.message);
        }
        hidePopup();
      }
    }
  };

  const handleInputFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  return (
    <div className="max-w-xl mx-auto  bg-white rounded-lg ">
      <h1 className="text-xl font-bold mb-4 text-center">Add Member</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-2">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onFocus={() => handleInputFocus("firstName")}
            onChange={handleChange}
            placeholder="Enter First Name"
            className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.firstName ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Last Name *</label>
          <input
            type="text"
            name="lastName"
            onFocus={() => handleInputFocus("lastName")}
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.lastName ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            onFocus={() => handleInputFocus("phone")}
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.phone ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            onFocus={() => handleInputFocus("email")}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email Address"
            className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Donation Amount */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-2">Monthly Donation Amount *</label>
          <select
            name="amount"
            onFocus={() => handleInputFocus("amount")}
            value={formData.amount}
            onChange={handleChange}
            className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.amount ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="" disabled>Select Amount</option>
            {donationAmounts.map((amount) => (
              <option key={amount} value={amount}>
                {amount} Birr
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          {formData.amount === "other" && (
            <input
              type="number"
              name="customAmount"
              onFocus={() => handleInputFocus("amount")}
              value={formData.customAmount}
              onChange={handleChange}
              placeholder="Enter Custom Amount"
              className={`w-full px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.amount ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
              }`}
            />
          )}
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>

      

        {errors.wrongonserver && <p className="text-red-500 text-sm">{errors.wrongonserver}</p>}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save as Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
