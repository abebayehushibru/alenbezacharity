import axios from 'axios';
import { useEffect, useState } from 'react';
import { ABC_BACKEND_API_URL } from '../../configf/config';
import CustomLoadingButton from '../controls/CustomButton';
import { useToast } from '../../context/ToastContext';

const OneTimeGiftForm = () => {
  const [childrenList, setChildrenList] = useState([]);


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
  useEffect(() => {
    
    axios
      .get(ABC_BACKEND_API_URL + "/child") // Update the URL to match your children API endpoint
      .then((response) => {
        console.log(response.data);
        
        const formattedChildren = response.data.map((child,index) => ({
        
          id: child._id, // Assuming MongoDB ObjectId is used
          name: `${child.firstName} ${child.lastName}`, // Combine first and last name for display
          nickName: child.nickName || "-", // Display "-" if no nickname
          grade: child.grade,
          enteryYear:child.enteryYear,
           family: `Family of ${child.firstName}`
        }));

        setChildrenList(formattedChildren || []);
       
      })
      .catch((e) => {
        console.error(e);
        
      });
  }, []);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // To handle loading state
  const [paymentLink, setPaymentLink] = useState(""); // To store payment link
const {showToast}=useToast()
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex according to the expected phone number format
    return phoneRegex.test(phoneNumber);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required.";
    if (!formData.lastname) newErrors.lastname = "Last name is required.";
    if (!formData.phonenumber) {
      newErrors.phonenumber = "Phone number is required.";
    } else if (!validatePhoneNumber(formData.phonenumber)) {
      newErrors.phonenumber = "Invalid phone number format.";
    }
    if (!formData.email) {
      // Only validate email if it's not empty
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.typeofGift) newErrors.typeofGift = "Type of gift is required.";
    if (formData.typeofGift === "money" && !formData.amount) newErrors.amount = "Amount is required.";
    if (formData.typeofGift === "material" && !formData.materialName) newErrors.materialName = "Material name is required.";
    if (!formData.giftRecipient) newErrors.giftRecipient = "Recipient is required.";
    if ((formData.giftRecipient === "child" || formData.giftRecipient === "childFamily") && !formData.selectedChild)
      newErrors.selectedChild = "Child selection is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFocus = (field) => {
    setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(`${ABC_BACKEND_API_URL}/donations/gifts`, formData);

        if (formData.typeofGift === "money") {
          setPaymentLink(response.data.paymentLink); 
         
        
          // Store the payment link
        } else {
         // Show success message for material gifts
        }
        setFormData({
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
        })
        showToast(response.data.message,"success");
      } catch (error) {
        console.error("Error submitting gift:", error);
        showToast("Error submitting gift.","error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm w-full">
      {/* First Name */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter First Name"
          onChange={(e) => handleInputChange("firstname", e.target.value)}
          onFocus={() => handleFocus("firstname")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.firstname ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.firstname && <p className="text-red-500 mt-1">{errors.firstname}</p>}
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Last Name"
          onChange={(e) => handleInputChange("lastname", e.target.value)}
          onFocus={() => handleFocus("lastname")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.lastname ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.lastname && <p className="text-red-500 mt-1">{errors.lastname}</p>}
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Phone Number"
          onChange={(e) => handleInputChange("phonenumber", e.target.value)}
          onFocus={() => handleFocus("phonenumber")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.phonenumber ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.phonenumber && <p className="text-red-500 mt-1">{errors.phonenumber}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Email
        </label>
        <input
          type="text"
          placeholder="Enter Email Address"
          onChange={(e) => handleInputChange("email", e.target.value)}
          onFocus={() => handleFocus("email")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* Type of Gift */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Type of Gift <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.typeofGift}
          onChange={(e) => handleInputChange("typeofGift", e.target.value)}
          onFocus={() => handleFocus("typeofGift")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.typeofGift ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        >
          <option value="" disabled>Select Gift Type</option>
          <option value="material">Material</option>
          <option value="money">Money</option>
        </select>
        {errors.typeofGift && <p className="text-red-500 mt-1">{errors.typeofGift}</p>}
      </div>

      {/* Material Name or Amount */}
      {formData.typeofGift === "material" && (
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Name of Material(s) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Material Name"
            onChange={(e) => handleInputChange("materialName", e.target.value)}
            onFocus={() => handleFocus("materialName")}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.materialName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.materialName && <p className="text-red-500 mt-1">{errors.materialName}</p>}
        </div>
      )}

      {formData.typeofGift === "money" && (
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter Amount"
            onChange={(e) => handleInputChange("amount", e.target.value)}
            onFocus={() => handleFocus("amount")}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.amount ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.amount && <p className="text-red-500 mt-1">{errors.amount}</p>}
        </div>
      )}

      {/* Gift Recipient */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          For Whom? <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.giftRecipient}
          onChange={(e) => handleInputChange("giftRecipient", e.target.value)}
          onFocus={() => handleFocus("giftRecipient")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.giftRecipient ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        >
          <option value="" disabled>Select Recipient</option>
          <option value="charity">Charity</option>
          <option value="child">Child</option>
          <option value="childFamily">Child's Family</option>
        </select>
        {errors.giftRecipient && <p className="text-red-500 mt-1">{errors.giftRecipient}</p>}
      </div>

      {/* Conditionally render child selection based on recipient */}
      {(formData.giftRecipient === "child" || formData.giftRecipient === "childFamily") && (
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Select Child <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.selectedChild}
            onChange={(e) => handleInputChange("selectedChild", e.target.value)}
            onFocus={() => handleFocus("selectedChild")}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.selectedChild ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="" disabled>Select Child Name</option>
            {childrenList.map((child) => (
              <option key={child.id} value={child.name}>
                 {formData.giftRecipient === "child" ? child.name : `${child.family}`}
              </option>
            ))}
          </select>
          {errors.selectedChild && <p className="text-red-500 mt-1">{errors.selectedChild}</p>}
        </div>
      )}

      {/* Submit Button */}
      <div className="col-span-2">
        <CustomLoadingButton
          action={handleSubmit}
          loadingText="Saving Gift"
          buttonText="Submit Gift"
          isLoading={loading}
        
        />
      </div>

      {/* Display payment link if available */}
      {paymentLink && (
        <div className="col-span-2 mt-4 text-center">
          <p className="text-green-500">Please complete your payment using the link below:</p>
          <a href={paymentLink.checkout_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
            Pay Now
          </a>
        </div>
      )}
    </div>
  );
};

export default OneTimeGiftForm;
