import React, { useEffect, useState } from "react";
import { usePopup } from "../context/popUpContext";
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
  const { showPopup } = usePopup();
  const { user } = useAuth();
  const [errors, setErrors] = useState({});
  const [searchedUser, setSearchedUser] = useState({});
  const [formData, setFormData] = useState(intialfrom);
  // Sample data for child names and corresponding families
  const [childrenList, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setData(formattedChildren || []);
       
      })
      .catch((e) => {
        console.error(e);
        
      });
  }, []);
  // const childrenList = [
  //   { id: 1, name: "Child One", family: "Family A" },
  //   { id: 2, name: "Child Two", family: "Family B" },
  //   { id: 3, name: "Child Three", family: "Family C" },
  // ];

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
      if (formData.firstname == "") {
        newErrors.firstname = "Please enter first name";
      } else if (!nameRegex.test(formData.firstname)) {
        newErrors.firstname = "First name must be character only";
      }
      if (formData.lastname == "") {
        newErrors.lastname = "Please enter last name";
      } else if (!nameRegex.test(formData.lastname)) {
        newErrors.lastname = "Last name must be character only";
      }
      if (formData.phonenumber == "") {
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
  const handleFindUser = async (event) => {
    setErrors({ memberId: "" });
    event.preventDefault();
    if (formData.memberId) {
      try {
        const response = await axios.post(ABC_BACKEND_API_URL+ "/users/findUserById",
          { customId: formData.memberId }
        );

        setSearchedUser(response.data.user);
      } catch (error) {
        setSearchedUser(null);
        setErrors({ memberId: "An error occurred while fetching the user." });
        if (error.response && error.response.data && error.response.data.message) {
          setErrors({ memberId: error.response.data.message})
          console.error('Error logging user:', error.response.data.message); // Display backend message
        } else {
          setErrors({ memberId: error.message})
          console.error('Unknown error:', error.message); // Fallback for unknown errors
        }
      
        
      }
    } else {
      setErrors({ memberId: "Please Enter member Id" });
    }
  };

  const handleProceedToPayment = async (paymentMethod) => {
   
    if (validateInputs()) {
      try {
        console.log(formData.donationType);
        const path= formData.donationType==="monthly"?'/users/monthlydonation':'/users/process'
      console.log(path);
      let datas={}
      if (formData.donationType==="monthly") {
        
        if (formData.donor==="others") {
          datas={...searchedUser,amount:formData.amount,paymentMethod};
          
        }
        else{
  
          datas={...user,amount:formData.amount,paymentMethod}
        }
      }
      else{
        datas={...formData,paymentMethod}
      }
        let response = await axios.post(ABC_BACKEND_API_URL+path, datas);
     
     window.location.href=response.data.paymentLink.checkout_url
       console.log(response.data);
  
        
      } catch (error) {
  //  setErrors({backenderror:error.data.message})
     if (error.response && error.response.data && error.response.data.message) {
    setErrors({backenderror:error.response.data.message})
   console.error('Error  user d :', error.response.data.message); // Display backend message
    } else {
     setErrors({backenderror:error.message})
    console.error('Unknown error:', error.message); // Fallback for unknown errors
    }
      }
      console.log("Proceeding to payment");
    }
  };

  const handleInputFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
  const handleInputChange = (field, value) => {
    setFormData((prevErrors) => ({ ...prevErrors, [field]: value }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-4 sm:my-14">
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
       <OneTimeGiftForm onSubmit={()=>handleProceedToPayment("Chapa")} childrenList={childrenList} />
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
