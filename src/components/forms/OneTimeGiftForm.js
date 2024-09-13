import React, { useState } from "react";

const OneTimeGiftForm = ({ onSubmit, childrenList }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    reasonForGift: "",
    address: "",
    typeofGift: "",
    materialName: "",
    amount: "",
    giftRecipient: "",
    selectedChild: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required.";
    if (!formData.lastname) newErrors.lastname = "Last name is required.";
    if (!formData.phonenumber) newErrors.phonenumber = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.typeofGift) newErrors.typeofGift = "Type of gift is required.";
    if (formData.typeofGift === "money" && !formData.amount) newErrors.amount = "Amount is required.";
    if (formData.typeofGift === "material" && !formData.materialName) newErrors.materialName = "Material name is required.";
    if (!formData.giftRecipient) newErrors.giftRecipient = "Recipient is required.";
    if ((formData.giftRecipient === "child" || formData.giftRecipient === "childFamily") && !formData.selectedChild)
      newErrors.selectedChild = "Child selection is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      {/* Similar fields as in the `DonateNow` component */}

      <label className="block text-lg font-medium mb-2">
        First Name <span className="text-red-500 mb-4">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter First Name"
        onChange={(e) => handleInputChange("firstname", e.target.value)}
        className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 ${
          errors.firstname ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      />
      {errors.firstname && <p className="text-red-500 mb-4">{errors.firstname}</p>}

      {/* Repeat for Last Name, Phone Number, Email, Reason for Gift, Address */}

      <label className="block text-lg font-medium mb-2">
        Type of Gift <span className="text-red-500 mb-4">*</span>
      </label>
      <select
        value={formData.typeofGift}
        onChange={(e) => handleInputChange("typeofGift", e.target.value)}
        className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
          errors.typeofGift ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      >
        <option value="" disabled>
          Select Gift Type
        </option>
        <option value="material">Material</option>
        <option value="money">Money</option>
      </select>
      {errors.typeofGift && <p className="text-red-500 mb-4">{errors.typeofGift}</p>}

      {/* Conditionally render fields based on gift type */}
      {formData.typeofGift === "material" && (
        <div>
          <label className="block text-lg font-medium mb-2">
            Name of Material(s) <span className="text-red-500 mb-4">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Material Name"
            onChange={(e) => handleInputChange("materialName", e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {formData.typeofGift === "money" && (
        <div>
          <label className="block text-lg font-medium mb-2">
            Amount <span className="text-red-500 mb-4">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter Amount"
            onChange={(e) => handleInputChange("amount", e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <label className="block text-lg font-medium mb-2">
        For Whom? <span className="text-red-500 mb-4">*</span>
      </label>
      <select
        value={formData.giftRecipient}
        onChange={(e) => handleInputChange("giftRecipient", e.target.value)}
        className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
          errors.giftRecipient ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      >
        <option value="" disabled>
          Select Recipient
        </option>
        <option value="charity">Charity</option>
        <option value="child">Child</option>
        <option value="childFamily">Child's Family</option>
      </select>
      {errors.giftRecipient && <p className="text-red-500 mb-4">{errors.giftRecipient}</p>}

      {/* Conditionally render child selection based on recipient */}
      {(formData.giftRecipient === "child" || formData.giftRecipient === "childFamily") && (
        <div>
          <label className="block text-lg font-medium mb-2">
            Select Child <span className="text-red-500 mb-4">*</span>
          </label>
          <select
            value={formData.selectedChild}
            onChange={(e) => handleInputChange("selectedChild", e.target.value)}
            className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.selectedChild ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="" disabled>
              Select Child Name
            </option>
            {childrenList.map((child) => (
              <option key={child.id} value={child.name}>
                {child.name} {formData.giftRecipient === "child" ? null : `- ${child.family}`}
              </option>
            ))}
          </select>
          {errors.selectedChild && <p className="text-red-500 mb-4">{errors.selectedChild}</p>}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit Gift
      </button>
    </div>
  );
};

export default OneTimeGiftForm;
