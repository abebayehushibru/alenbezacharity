import React, { useState } from "react";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import CustomLoadingButton from "../controls/CustomButton";
import { useToast } from "../../context/ToastContext";

const AddAdmin = ({ id, firstname, lastname, phoneNumber }) => {
  const { showToast } = useToast();

  // State for form data
  const [formData, setFormData] = useState({
    id: id || "",
    firstname: firstname || "",
    lastname: lastname || "",
    phoneNumber: phoneNumber || "",
    adminRole: "",
  });

  // State for managing errors
  const [errors, setErrors] = useState({});
  const [showAdminDetails, setShowAdminDetails] = useState(!!firstname && !!lastname);
  const [isLoading, setIsLoading] = useState(false);
  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Search function to get admin details by ID
  const handleSearch = async () => {
    if (!formData.id) {
      setErrors({ id: "ID is required for search." });
      return;
    }

    try {
   //   showPopup("loading");
      const response = await axios.post(`${ABC_BACKEND_API_URL}/users/findUserById`,   { customId: formData.id.toUpperCase() });
      const { firstname, lastname, phonenumber } = response.data.user;


      // Set received data to state
      setFormData((prevData) => ({
        ...prevData,
        firstname,
        lastname,
        phonenumber,
      }));

      setShowAdminDetails(true);
     // hidePopup();
    } catch (error) {
      setErrors({ serverError: error.response?.data?.message || "Failed to fetch admin details." });
      console.log(error);
      
      //hidePopup();
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.adminRole) {
      newErrors.adminRole = "Admin role is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true)
      await axios.post(`${ABC_BACKEND_API_URL}/admin/updateRole`, { customId: formData.id.toUpperCase() ,role:formData.adminRole});
      showToast("Role updated successfully!","success");
      setShowAdminDetails(false)
      setFormData({
        id: null,
       firstname: "",
        lastname: "",
        phonenumber: "",
        adminRole: "",
      })
    
      setIsLoading(false)
    } catch (error) {
       setIsLoading(false)
       console.log(error);
       showToast( error.response?.data?.message || "Failed to update admin role." ,"error");
    
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4 text-center">Add Admin </h1>

      {/* Search by ID Section */}
      {!showAdminDetails && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">User ID *</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter user ID"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.id ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            <CustomLoadingButton 
        action={handleSearch} 
        isLoading={isLoading} 
        buttonText="Search" 
        loadingText="Searching..."
      />
            
          </div>
          
          {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
          {errors.serverError && <p className="text-red-500 text-sm">{errors.serverError}</p>}
        </div>
      )}

      {/* Admin Details and Role Form */}
      {showAdminDetails && (
        <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={`${formData.firstname} ${formData.lastname}`}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed focus:outline-none"
            />
          </div>


          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="text"
              value={formData.phonenumber
              }
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* Admin Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Admin Role *</label>
            <select
              name="adminRole"
              value={formData.adminRole}
              onChange={handleChange}
              onFocus={() => setErrors((prev) => ({ ...prev, adminRole: "" }))}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.adminRole ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
              }`}
            >
              <option value="" disabled>Select Role</option>
              <option value="Content-manager">Content Manager</option>
              
              <option value="Finance-controller">Finance Controller</option>
              <option value="superadmin">Super Admin</option>
            </select>
            {errors.adminRole && <p className="text-red-500 text-sm">{errors.adminRole}</p>}
          </div>

          {/* Server Error Display */}
          {errors.serverError && <p className="text-red-500 text-sm">{errors.serverError}</p>}

          {/* Submit Button */}
          <CustomLoadingButton 
        action={()=>{}} 
        isLoading={isLoading} 
        buttonText="Set Admin " 
        loadingText="Adding as Admin..."
        type="submit"
      />
          
          <button
            onClick={()=>setShowAdminDetails(false)}
            className="w-full text-blue-500 bg-white py-2 rounded-md border-blue-600 border-[1px] border-solid transition duration-300"
          >
            Change User
          </button>
          
        </form>
      )}
          
    </div>
  );
};

export default AddAdmin;
