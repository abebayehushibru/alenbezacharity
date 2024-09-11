import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Assuming you have this context for user roles
import { ABC_BACKEND_API_URL } from '../../configf/config';
import CustomLoadingButton from '../../components/controls/CustomButton';
import AdminRecentCard from '../../components/Cards/AdminRecentCard';
import { formatDate } from '../../services/functions';

const MemberDetailPage = () => {
  const { id } = useParams(); // Get the member ID from URL params
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useAuth(); // Get the current user from context

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/users/findById/${id}`); // Update the URL to match your users API endpoint
        setMember(response.data);
      } catch (error) {
        console.error('Error fetching member details:', error);
      }
    };

    fetchMemberDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validateFields()) {
      try {
        await axios.put(`${ABC_BACKEND_API_URL}/user/edit/${id}`, member);
        setIsLoading(false);
        setIsEditing(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error saving member details:', error);
      }
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!member.firstname) newErrors.firstname = 'First name is required';
    if (!member.lastname) newErrors.lastname = 'Last name is required';
    if (!member.email) newErrors.email = 'Email is required';
    if (!member.phonenumber) newErrors.phonenumber = 'Phone number is required';
    if (!member.monthlyamount) newErrors.monthlyamount = 'Monthly amount is required';
    if (!member.createdate) newErrors.createdate = 'Creation date is required';
    if (!member.address) newErrors.address = 'Address is required'; // Added validation for address
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally, you can refetch the details to revert changes
    // fetchMemberDetails();
  };

  if (!member) {
    return <div className='h-full w-full flex items-center justify-center'>Member not found</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-1 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Member Details</h1>

      <div className="flex justify-between items-center mb-4">
        { (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Editable Mode</span>
            <div className="flex items-center">
              <label htmlFor="editableToggle" className="switch">
                <input
                  id="editableToggle"
                  type="checkbox"
                  checked={isEditing}
                  onChange={() => setIsEditing(!isEditing)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" method='post'>
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstname"
            value={member.firstname}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.firstname ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={member.lastname}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.lastname ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
        </div>
         <div>
          <label className="block text-sm font-medium mb-2">User Id</label>
          <input
            type=""
            name=""
            value={member.customId}
            onChange={handleChange}
            disabled
            className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={member.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            value={member.phonenumber}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.phonenumber ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Monthly Amount</label>
          <input
            type="number"
            name="monthlyamount"
            value={member.monthlyamount}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.monthlyamount ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.monthlyamount && <p className="text-red-500 text-sm">{errors.monthlyamount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Creation Date</label>
          <input
            type="text"
            name="createdate"
            value={formatDate(member.createdate)}
            onChange={handleChange}
            disabled
            className={`w-full px-4 py-2 border rounded-md ${errors.createdate ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.createdate && <p className="text-red-500 text-sm">{errors.createdate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={member.address || ''} // Handle cases where address might be undefined
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {(isEditing || isLoading) && (
          <div className="col-span-full flex justify-end gap-4 mt-4">
            <div className='w-32'>
              <CustomLoadingButton buttonText='Update' loadingText='Updating' isLoading={isLoading} type='submit' />
            </div>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </form>

      <div className="flex flex-col overflow-hidden bg-white rounded-md py-4 gap-3 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold uppercase text-black/40">
            Recent Added Donation from {member.firstname} {member.lastname} 
          </h2>
          <Link to="/" className="text-blue-500 hover:underline">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AdminRecentCard />
          <AdminRecentCard />
          <AdminRecentCard />
          <AdminRecentCard />
          <AdminRecentCard />
          <AdminRecentCard />
          <AdminRecentCard />
          <AdminRecentCard />
          <AdminRecentCard />
        </div>
      </div>
    </div>
  );
};

export default MemberDetailPage;
