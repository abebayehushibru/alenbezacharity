import axios from "axios";
import React, { useState, useEffect } from "react";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import CustomLoadingButton from "../controls/CustomButton";
import { usePopup } from "../../context/popUpContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

const MonthlyDonationForm = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    amount: "",
    donorType: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
  });

  const { user } = useAuth();
  const { showPopup } = usePopup();
  const { showToast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    if (formData.donorType === "self" && user?.token) {
      setFormData((prevData) => ({
        ...prevData,
        memberId: user.id || "",
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phonenumber: user.phonenumber || "",
      }));
    }
  }, [formData.donorType, user]);

  const handleInputChange = (field, value) => {
    if (field === "memberId") {
      setSearchedUser(null);
    }
    setFormData({ ...formData, [field]: value });
  };

  const handleFindUser = async (event) => {
    event.preventDefault();
    setSearchedUser(null);
    setErrors({ memberId: "" });

    if (formData.memberId) {
      try {
        setIsSearching(true);
        const response = await axios.post(`${ABC_BACKEND_API_URL}/users/findUserById`, {
          customId: formData.memberId,
        });
        setSearchedUser(response.data.user);
        setFormData({
          ...formData,
          firstname: response.data.user?.firstname,
          lastname: response.data.user?.lastname,
          phonenumber: response.data.user?.phonenumber,
        });
      } catch (error) {
        const errorMsg = error.response?.data?.message || "An error occurred while fetching the user.";
        setErrors({ memberId: errorMsg });
        console.error("Error finding user:", errorMsg);
      } finally {
        setIsSearching(false);
      }
    } else {
      setErrors({ memberId: "Please enter member ID" });
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.donorType) newErrors.donorType = "Please select a donor type";
    
    if (formData.donorType === "self") {
      if (!formData.amount) newErrors.amount = "Please enter an amount";
    } else if (formData.donorType === "others") {
      if (!formData.memberId) newErrors.memberId = "Please enter member ID";
      if (!formData.amount) newErrors.amount = "Please enter an amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      setIsSaving(true);
      try {
        const response = await axios.post(`${ABC_BACKEND_API_URL}/donations/monthly`, {
          memberId: formData.donorType === "self" ? user.id : formData.memberId,
          firstname: formData.donorType === "self" ? user.firstname : formData.firstname,
          lastname: formData.donorType === "self" ? user.lastname : formData.lastname,
          phonenumber: formData.donorType === "self" ? user.phonenumber : formData.phonenumber,
          amount: formData.amount,
          donorType: "monthly",
        });

        console.log("Donation successful:", response.data);
        showToast("Donation successful!", "success");
        window.location.href = response.data.paymentLink.checkout_url;
      } catch (error) {
        const errorMsg = error.response?.data?.message || "An error occurred while processing your donation.";
        setErrors({ general: errorMsg });
        showToast(errorMsg, "error");
        console.error("Error saving donation:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Make a contribution as</label>
      <select
        value={formData.donorType}
        onChange={(e) => {
          if (e.target.value === "self" && !user) {
            showPopup("sign-in");
          } else {
            handleInputChange("donorType", e.target.value);
          }
        }}
        className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
          errors.donorType ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      >
        <option value="" disabled>
          Select Donation Type
        </option>
        <option value="self">Yourself</option>
        <option value="others">On behalf of another</option>
      </select>
      {errors.donorType && <p className="text-red-500 mb-4">{errors.donorType}</p>}

      {formData.donorType === "others" && (
        <>
          <label className="block text-sm font-medium mb-2">
            Search by Member ID <span className="text-red-500 mb-4">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={formData.memberId}
              placeholder="Enter Member ID"
              onChange={(e) => {
                setSearchedUser(null);
                handleInputChange("memberId", e.target.value.toUpperCase());
              }}
              className={`w-3/4 px-4 py-2 text-sm border rounded-s-md focus:outline-none focus:ring-2 ${
                errors.memberId ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            <div className="w-1/3 flex-1">
              <CustomLoadingButton
                loadingText="Searching"
                isLoading={isSearching}
                buttonText="Search"
                action={handleFindUser}
              />
            </div>
          </div>
          {errors.memberId && <p className="text-red-500 mb-4">{errors.memberId}</p>}
        </>
      )}

      {searchedUser && formData.donorType === "others" && (
        <>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            disabled
            type="text"
            value={`${searchedUser.firstname} ${searchedUser.lastname}`}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            disabled
            type="tel"
            value={searchedUser.phonenumber}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      <label className="block text-sm font-medium mb-2">
        Amount <span className="text-red-500 mb-4">*</span>
      </label>
      <input
        type="number"
        value={formData.amount}
        min={25}
        step={5}
        onChange={(e) => handleInputChange("amount", e.target.value)}
        placeholder="Enter Amount"
        className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 ${
          errors.amount ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      />
      {errors.amount && <p className="text-red-500 mb-4">{errors.amount}</p>}

      <CustomLoadingButton
        buttonText="Proceed to Donation"
        isLoading={isSaving}
        loadingText="Please wait"
        action={handleSubmit}
      />
    </div>
  );
};

export default MonthlyDonationForm;
