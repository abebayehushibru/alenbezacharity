import axios from "axios";
import React, { useState, useEffect } from "react";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import CustomLoadingButton from "../controls/CustomButton";
import { usePopup } from "../../context/popUpContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

const MonthlyDonationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    memberId: "",
    amount: "",
    donorType: "self",
    firstname: "",
    lastname: "",
    phonenumber: "",
  });
  const {user}=useAuth()
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
        memberId: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phonenumber,
      }));
    }
  }, [formData.donorType, user.id, user.firstname, user.lastname, user.phonenumber, user?.token]);

  const handleInputChange = (field, value) => {
    if (field === "memberId") {
      setSearchedUser(null);
    }
    setFormData({ ...formData, [field]: value });
  };

  const handleFindUser = async (event) => {
    setSearchedUser(null);
    setErrors({ memberId: "" });
    event.preventDefault();
    if (formData.memberId) {
      try {
        setIsSearching(true);
        const response = await axios.post(
          `${ABC_BACKEND_API_URL}/users/findUserById`,
          { customId: formData.memberId }
        );
        setIsSearching(false);
        setSearchedUser(response.data.user);
        setFormData({
          ...formData,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          phonenumber: response.data.user.phonenumber,
        });
      } catch (error) {
        setIsSearching(false);
        setSearchedUser(null);
        setErrors({ memberId: "An error occurred while fetching the user." });
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrors({ memberId: error.response.data.message });
          console.error("Error logging user:", error.response.data.message);
        } else {
          setErrors({ memberId: error.message });
          console.error("Unknown error:", error.message);
        }
      }
    } else {
      setIsSearching(false);
      setErrors({ memberId: "Please Enter member Id" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.donorType === "others" && !formData.memberId)
      newErrors.memberId = "Member ID is required.";
    if (!formData.amount) newErrors.amount = "Amount is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSaving(true);
      try {
        const response = await axios.post(
          `${ABC_BACKEND_API_URL}/donations/monthly`,
          {
            memberId: formData.donorType === "self"
            ? user.id: formData.memberId,
            firstname:
              formData.donorType === "self"
                ? user.firstname
                : formData.firstname,
            lastname:
              formData.donorType === "self" ? user.lastname : formData.lastname,
            phonenumber:
              formData.donorType === "self"
                ? user.phonenumber
                : formData.phonenumber,
            amount: formData.amount,
            donorType: "monthly",
          }
        );

        console.log("Donation successful:", response.data);
        showToast("Donation successful!", "success");
       window.location.href = response.data.paymentLink.checkout_url
;
      } catch (error) {
        setErrors({
          general: "An error occurred while processing your donation.",
        });
        showToast("An error occurred while processing your donation.", "error");
        if (error.response && error.response.data && error.response.data.message) {
          console.error("Error saving donation:", error.response.data.message);
        } else {
          console.error("Unknown error:", error.message);
        }
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Make a contribution as
      </label>
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
          errors.donorType
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-blue-500"
        }`}
      >
        <option value="" disabled>
          Select Donation Type
        </option>
        <option value="self">Yourself</option>
        <option value="others">On behalf of another</option>
      </select>
      {errors.donorType && (
        <p className="text-red-500 mb-4">{errors.donorType}</p>
      )}

      {formData.donorType === "others" && (
        <>
          <label className="block text-sm font-medium mb-2">
            Search by Member ID <span className="text-red-500 mb-4">*</span>
          </label>
          <div className="relative flex items-center ">
            <input
              type="text"
              value={formData.memberId}
              placeholder="Enter Member ID"
              onChange={(e) => {
                setSearchedUser(null);
                handleInputChange("memberId", e.target.value.toUpperCase());
              }}
              className={`w-3/4 px-4 py-2 text-sm  border rounded-s-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.memberId
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
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
          {errors.memberId && (
            <p className="text-red-500 mb-4">{errors.memberId}</p>
          )}
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
        className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.amount
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-blue-500"
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
