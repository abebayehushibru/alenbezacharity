import React, { useEffect, useState } from "react";
import { usePopup } from "../../context/popUpContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ABC_BACKEND_API_URL } from "../../configf/config";

const SignUpForm = () => {
  const {showPopup,hidePopup}=usePopup()
  const { user ,login} = useAuth();
  useEffect(() => {
    if (user?.token) {
      window.location.href = "/";
    }
  }, [user?.token]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    amount: "",
    customAmount: "",
    password: "",
    confirmPassword: "",
    agreePolicy: false,
  });

  const [errors, setErrors] = useState({});

  // Predefined donation amounts
  const donationAmounts = [25, 30, 40, 50, 100, 150, 200];

  // Regular expressions for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex =
    /^\+?[0-9]{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const nameRegex = /^[a-zA-Zà-žÀ-Ž'-]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter, and one number

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password is required and must be at least 8 characters long, including at least one letter and one number.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.agreePolicy) {
      newErrors.agreePolicy = "You must agree to the policy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      // Prepare the data to send to the backend
      const dataToSend = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        phonenumber: formData.phone,
        email: formData.email,
        password: formData.password,
        monthlyamount:
          formData.amount != "other" ? formData.amount : formData.customAmount,
        createdate: new Date().toISOString(), // Optionally set to the current date
      };
      try {
        showPopup("loading")
        const response = await axios.post(
          ABC_BACKEND_API_URL + "/users/register",
          dataToSend
        );
        login(response.data.user);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          amount: "",
          address: "",
          customAmount: "",
          password: "",
          confirmPassword: "",
          agreePolicy: false,
        })
        hidePopup()
       
      } catch (error) {
        
        if (error.response && error.response.data && error.response.data.message) {
          setErrors({wrongonserver:error.response.data.message})
          console.error('Error logging user:', error.response.data.message); // Display backend message
        } else {
          setErrors({wrongonserver:error.message})
          console.error('Unknown error:', error.message); // Fallback for unknown errors
        }
        hidePopup()
      }
    }
  };

  const handleInputFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg my-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Sign Up for Donation
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 grid-cols-1 sm:grid-cols-2"
      >
        {/* First Name */}
        <div>
          <label className="block text-lg font-medium mb-2">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onFocus={() => handleInputFocus("firstName")}
            onChange={handleChange}
            placeholder="Enter First Name"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.firstName
                ? "border-red-500 ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-lg font-medium mb-2">Last Name *</label>
          <input
            type="text"
            name="lastName"
            onFocus={() => handleInputFocus("lastName")}
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.lastName
                ? "border-red-500 ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            onFocus={() => handleInputFocus("phone")}
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onFocus={() => handleInputFocus("email")}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email Address"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
        <label className="block text-lg font-medium mb-2">
        Work Address</label>
          <input
            type="address"
            name="address"
            onFocus={() => handleInputFocus("address")}
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-500 ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        {/* Donation Amount */}
        <div >
          <label className="block text-lg font-medium mb-2">
            Monthly Donation Amount *
          </label>
          <select
            name="amount"
            onFocus={() => handleInputFocus("amount")}
            value={formData.amount}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.amount
                ? "border-red-500 ring-red-500"
                : "focus:ring-blue-500"
            }`}
          >
            <option value="" disabled>
              Select Amount
            </option>
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
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.amount
                  ? "border-red-500 ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
          )}
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-lg font-medium mb-2">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => handleInputFocus("password")}
            placeholder="Enter Password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Confirm Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            onFocus={() => handleInputFocus("confirmPassword")}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-500 ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Policy Agreement */}
        <div className="sm:col-span-2">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="agreePolicy"
              checked={formData.agreePolicy}
              onFocus={() => handleInputFocus("agreePolicy")}
              onChange={handleChange}
              className={`mr-2 ${
                errors.agreePolicy
                  ? "border-red-500 ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            <label className="text-lg">I agree to the   <button
            type="button"
            className="text-blue-500 hover:underline ml-1"
            onClick={() => showPopup("terms-and-policies")}
          >
            terms and policies
          </button> *</label>
          </div>
          {errors.agreePolicy && (
            <p className="text-red-500 text-sm">{errors.agreePolicy}</p>
          )}
        </div>

        <p className=" text-left sm:col-span-2">
          If you are a registered member
          <button
            type="button"
            className="text-blue-500 hover:underline ml-1"
            onClick={() => showPopup("sign-in")}
          >
            login
          </button>
        </p>

        {/* Submit Button */}
        {errors.wrongonserver && (
            <p className="text-red-500 text-sm">{errors.wrongonserver}</p>
          )}
        
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
