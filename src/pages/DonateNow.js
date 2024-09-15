import React, {  useState } from "react";

import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../configf/config";
import OneTimeGiftForm from "../components/forms/OneTimeGiftForm";
import MonthlyDonationForm from "../components/forms/MonthlyDonationForm";

const nameRegex = /^[a-zA-Zà-žÀ-Ž'-]{2,}$/;
const phoneRegex =
  /^\+?[0-9]{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const intialfrom = {
  donationType: "",
  donor: "",
  memberId: "",
  giftType: "",
  giftRecipient: "",
  selectedChild: "",
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  typeofGift: "",
  amount: "",
  reasonForGift: "",
  address: "",
  materialName: "",
};
const DonateNow = () => {
  
  const { user } = useAuth();
  const [errors, setErrors] = useState({});
  const [searchedUser, setSearchedUser] = useState({});
  const [formData, setFormData] = useState(intialfrom);




  const validateInputs = () => {
    const newErrors = {};
    if (!formData.donationType)
      newErrors.donationType = "Please select a donation type";
    if (formData.donationType === "monthly") {
      if (!formData.donor) newErrors.donor = "Please select a donor";
      if (formData.donor === "self") {
        if (formData.amount === "") {
          newErrors.amount = "Please enter an amount";
        }
      } else if (formData.donor === "others") {
        if (formData.memberId === "") {
          newErrors.memberId = "Please enter member Id";
        }
        if (formData.amount === "") {
          newErrors.amount = "Please enter an amount";
        }
      }
    }
    if (formData.donationType === "gift") {
      if (formData.firstname.trim() === "") {
        newErrors.firstname = "Please enter first name";
      } else if (!nameRegex.test(formData.firstname.trim())) {
        newErrors.firstname = "First name must be character only";
      }
      if (formData.lastname.trim() === "") {
        newErrors.lastname = "Please enter last name";
      } else if (!nameRegex.test(formData.lastname.trim())) {
        newErrors.lastname = "Last name must be character only";
      }
      if (formData.phonenumber.trim() === "") {
        newErrors.phonenumber = "Please enter phone number";
      } else if (!phoneRegex.test(formData.phonenumber)) {
        newErrors.phonenumber = "Enter correct phone number";
      }
      if (formData.email !== "" && !emailRegex.test(formData.email)) {
        newErrors.email = "Enter correct email address";
      }

      if (!formData.typeofGift)
        newErrors.giftType = "Please select a gift type";
      if (
        (formData.giftRecipient === "child" ||
          formData.giftRecipient === "childFamily") &&
        !formData.selectedChild
      ) {
        newErrors.selectedChild = "Please select a child";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


 

  const handleInputFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
  const handleInputChange = (field, value) => {
    setFormData((prevErrors) => ({ ...prevErrors, [field]: value }));
  };

  return (
    <div className="max-w-md sm:min-w-4xl w-full mx-auto p-6  shadow-lg rounded-lg my-4 sm:my-14">
      <h1 className="text-2xl font-bold mb-4 text-center">Make a Donation</h1>

      {/* Donation Type Selection */}
      <label className="block text-sm font-medium mb-2">
        Choose Your Contribution
      </label>
      <select
        value={formData.donationType}
        onChange={(e) => {
          handleInputChange("donationType", e.target.value);
        }}
        onFocus={() => handleInputFocus("donationType")}
        className={`w-full text-sm px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
          errors.donationType
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-blue-500"
        }`}
      >
        <option value="" disabled>
          Select Donation Type
        </option>
        <option value="monthly">Monthly Donation</option>
        <option value="gift">One-Time Gift</option>
      </select>
      {errors.donationType && (
        <p className="text-red-500 mb-4">{errors.donationType}</p>
      )}

      {/* Conditional Rendering based on Donation Type */}
      {formData.donationType === "monthly" && (
       <MonthlyDonationForm/>
      )}

      {/* Input Fields for Gift */}
      {formData.donationType === "gift" && (
       <OneTimeGiftForm  />
      )}
       {errors.backenderror && (
                <p className="text-red-500 mb-4">{errors.backenderror}</p>
              )}

      {/* Submit Button */}
     
      {/* <button
        onClick={()=>handleProceedToPayment("telebirr")}
        className="w-full bg-white text-blue-600 border-2 border-solid border-blue-600  py-2 mt-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
      >
        Pay with Telebir
      </button> */}
    </div>
  );
};

export default DonateNow;
