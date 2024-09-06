import React, { useEffect, useState } from "react";
import { usePopup } from "../context/popUpContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../configf/config";

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
      <label className="block text-lg font-medium mb-2">
        Choose Your Contribution
      </label>
      <select
        value={formData.donationType}
        onChange={(e) => {
          handleInputChange("donationType", e.target.value);
        }}
        onFocus={() => handleInputFocus("donationType")}
        className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
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
        <div>
          <label className="block text-lg font-medium mb-2">
            Make a contribution as
          </label>
          <select
            value={formData.donor}
            onChange={(e) => {
              if (e.target.value == "self" && !user) {
                showPopup("sign-in");
              } else {
                handleInputChange("donor", e.target.value);
              }
            }}
            onFocus={() => handleInputFocus("recipient")}
            className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.recipient
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          >
            <option value="" disabled>
              Select contributor
            </option>
            <option value="self">Yourself</option>
            <option value="others">On behalf of another</option>
          </select>
          {errors.recipient && (
            <p className="text-red-500 mb-4">{errors.recipient}</p>
          )}

          {/* Input Fields for "Self" */}
          {formData.donor === "self" && (
            <div>
              <label className="block text-lg font-medium mb-2">
                Your Name
              </label>
              <input
                disabled
                type="text"
                placeholder=" Your Name"
                value={user?.firstname + " " + user?.lastname}
                onChange={(e) =>
                  handleInputChange("donationType", e.target.value)
                }
                onFocus={() => handleInputFocus("name")}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-lg font-medium mb-2">
                Phone Number
              </label>
              <input
                disabled
                type="tel"
                placeholder="Your Phone Number"
                value={user?.phonenumber}
                onChange={(e) =>
                  handleInputChange("phonenumber", e.target.value)
                }
                onFocus={() => handleInputFocus("phone")}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-lg font-medium mb-2">
                Amount <span className="text-red-500 mb-4">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Amount"
                onFocus={() => handleInputFocus("amount")}
                className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.amount
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />

              {errors.amount && (
                <p className="text-red-500 mb-4">{errors.amount}</p>
              )}
            </div>
          )}

          {/* Input Fields for "Others" */}
          {formData.donor === "others" && (
            <div>
              <label className="block text-lg font-medium mb-2">
                Search by Member ID <span className="text-red-500 mb-4">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={formData.memberId}
                  placeholder="Enter Member ID"
                  onFocus={() => handleInputFocus("memberId")}
                  className={`w-full px-4 py-2 mb-4 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.memberId
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  onChange={(e) =>
                    handleInputChange("memberId", e.target.value.toUpperCase())
                  }
                />
                <span
                  onClick={handleFindUser}
                  className=" px-4 py-2 mb-4 border border-blue-500  hover:border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 absolute right-0 top-0  w-24 text-white flex justify-center items-center bg-blue-500  hover:bg-blue-600 cursor-pointer "
                >
                  Search
                </span>
              </div>
              {errors.memberId && (
                <p className="text-red-500 mb-4">{errors.memberId}</p>
              )}

              <label className="block text-lg font-medium mb-2">
                Full Name
              </label>
              <input
                disabled
                type="text"
                placeholder="Full Name"
                value={searchedUser?searchedUser.firstname + " " + searchedUser.lastname:""}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-lg font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={searchedUser?searchedUser.phonenumber:"" }
                disabled
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-lg font-medium mb-2">
                Amount <span className="text-red-500 mb-4">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Amount"
                onFocus={() => handleInputFocus("amount")}
                className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.amount
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
              {errors.amount && (
                <p className="text-red-500 mb-4">{errors.amount}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Input Fields for Gift */}
      {formData.donationType === "gift" && (
        <div>
          <label className="block text-lg font-medium mb-2">
            First Name <span className="text-red-500 mb-4">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter First Name"
            onFocus={() => handleInputFocus("firstname")}
            onChange={(e) => handleInputChange("firstname", e.target.value)}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstname
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.firstname && (
            <p className="text-red-500 mb-4">{errors.firstname}</p>
          )}

          <label className="block text-lg font-medium mb-2">
            Last Name <span className="text-red-500 mb-4">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Last Name"
            onFocus={() => handleInputFocus("lastname")}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastname
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.lastname && (
            <p className="text-red-500 mb-4">{errors.lastname}</p>
          )}

          <label className="block text-lg font-medium mb-2">
            Phone Number <span className="text-red-500 mb-4">*</span>
          </label>
          <input
            type="tel"
            placeholder="Enter Phone Number"
            onFocus={() => handleInputFocus("phonenumber")}
            onChange={(e) => handleInputChange("phonenumber", e.target.value)}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phonenumber
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.phonenumber && (
            <p className="text-red-500 mb-4">{errors.phonenumber}</p>
          )}

          <label className="block text-lg font-medium mb-2">Email </label>
          <input
            type="email"
            placeholder="Enter Email"
            onFocus={() => handleInputFocus("email")}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.email && <p className="text-red-500 mb-4">{errors.email}</p>}

          <label className="block text-lg font-medium mb-2">
            Reason for Gift
          </label>
          <input
            type="text"
            placeholder="Reason for Gift"
            onFocus={() => handleInputFocus("reason")}
            onChange={(e) => handleInputChange("reasonForGift", e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-lg font-medium mb-2">
            Address Location
          </label>
          <input
            type="text"
            placeholder="Enter Address Location"
            onFocus={() => handleInputFocus("address")}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-lg font-medium mb-2">
            Type of Gift <span className="text-red-500 mb-4">*</span>
          </label>
          <select
            value={formData.typeofGift}
            onChange={(e) => handleInputChange("typeofGift", e.target.value)}
            onFocus={() => handleInputFocus("giftType")}
            className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.giftType
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          >
            <option value="" disabled>
              Select Gift Type
            </option>
            <option value="material">Material</option>
            <option value="money">Money</option>
          </select>
          {errors.giftType && (
            <p className="text-red-500 mb-4">{errors.giftType}</p>
          )}

          {/* If Gift Type is Material or Money */}
          {formData.typeofGift === "material" && (
            <div>
              <label className="block text-lg font-medium mb-2">
                Name of Material {"(s)"}{" "}
                <span className="text-red-500 mb-4">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Material Name"
                onChange={(e) =>
                  handleInputChange("materialName", e.target.value)
                }
                onFocus={() => handleInputFocus("materialName")}
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
                onFocus={() => handleInputFocus("amount")}
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
            onFocus={() => handleInputFocus("giftRecipient")}
            className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.giftRecipient
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          >
            <option value="" disabled>
              Select Recipient
            </option>
            <option value="charity">Charity</option>
            <option value="child">Child</option>
            <option value="childFamily">Child's Family</option>
          </select>
          {errors.giftRecipient && (
            <p className="text-red-500 mb-4">{errors.giftRecipient}</p>
          )}

          {/* Conditional rendering of child selection based on gift recipient */}
          {(formData.giftRecipient === "child" ||
            formData.giftRecipient === "childFamily") && (
            <div>
              <label className="block text-lg font-medium mb-2">
                Select Child <span className="text-red-500 mb-4">*</span>
              </label>
              <select
                value={formData.selectedChild}
                onChange={(e) =>
                  handleInputChange("selectedChild", e.target.value)
                }
                onFocus={() => handleInputFocus("selectedChild")}
                className={`w-full px-4 py-2 mb-1 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.selectedChild
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              >
                <option value="" disabled>
                  Select Child Name
                </option>
                {childrenList.map((child) => (
                  <option key={child.id} value={child.name}>
                    {child.name} {formData.giftRecipient === "child" ?null : `- ${child.family}`}
                  </option>
                ))}
              </select>
              {errors.selectedChild && (
                <p className="text-red-500 mb-4">{errors.selectedChild}</p>
              )}
            </div>
          )}
        </div>
      )}
       {errors.backenderror && (
                <p className="text-red-500 mb-4">{errors.backenderror}</p>
              )}

      {/* Submit Button */}
      <button
        onClick={()=>handleProceedToPayment("Chapa")}
        className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit Donation
      </button>
      <button
        onClick={()=>handleProceedToPayment("telebirr")}
        className="w-full bg-white text-blue-600 border-2 border-solid border-blue-600  py-2 mt-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
      >
        Pay with Telebir
      </button>
    </div>
  );
};

export default DonateNow;
