import React, { useState } from "react";

import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import { useToast } from "../../context/ToastContext";
import CustomLoadingButton from "../controls/CustomButton";

const AddChild = () => {
const { showToast  } = useToast();
const [isSaving,setIsSaving]=useState()
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    grade: "",
    hobbies: "",
    favoriteSubject: "",
    entryYear: "",
    enrolledDate: new Date().toISOString(),
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.grade) {
      newErrors.grade = "Grade is required.";
    }
    if (!formData.entryYear) {
      newErrors.entryYear = "Entry year is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
      setIsSaving(true)
       await axios.post(ABC_BACKEND_API_URL + "/child/add", formData);
        // Reset the form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          nickName: "",
          grade: "",
          hobbies: "",
          favoriteSubject: "",
          entryYear: "",
          enrolledDate: new Date().toISOString(),
        });
        setIsSaving(false)
    
        showToast("Child added successfully","success");
      } catch (error) {
        setIsSaving(false)
        setErrors({ serverError: error.response?.data?.message || "An error occurred" });
        showToast("Something went wrong","error");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg ">
      <h1 className="text-xl font-bold mb-4 text-center">Add Child</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-2">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
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
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.lastName ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Nickname */}
        <div>
          <label className="block text-sm font-medium mb-2">Nickname</label>
          <input
            type="text"
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
            placeholder="Enter Nickname (optional)"
            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium mb-2">Grade *</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="Enter Grade"
            className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.grade ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
        </div>

        {/* Hobbies */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-2">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            placeholder="Enter Hobbies (comma-separated)"
            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Favorite Subject */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-2">Favorite Subject</label>
          <input
            type="text"
            name="favoriteSubject"
            value={formData.favoriteSubject}
            onChange={handleChange}
            placeholder="Enter Favorite Subject"
            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Entry Year */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-2">Entry Year *</label>
          <input
            type="text"
            name="entryYear"
            value={formData.entryYear}
            onChange={handleChange}
            placeholder="Enter Entry Year (e.g., 2012)"
            className={`w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.entryYear ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.entryYear && <p className="text-red-500 text-sm">{errors.entryYear}</p>}
        </div>

        {/* Server Error Display */}
        {errors.serverError && <p className="text-red-500 text-sm sm:col-span-2">{errors.serverError}</p>}

        {/* Submit Button */}
        <div className="sm:col-span-2">
          <CustomLoadingButton isLoading={isSaving} loadingText="saving child"  type="submit" buttonText=" Add Child"/>
         
        </div>
      </form>
    </div>
  );
};

export default AddChild;
