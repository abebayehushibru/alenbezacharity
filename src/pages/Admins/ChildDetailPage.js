import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Assuming you have this context for user roles
import { ABC_BACKEND_API_URL } from '../../configf/config';
import CustomLoadingButton from '../../components/controls/CustomButton';
import AdminRecentCard from '../../components/Cards/AdminRecentCard';

const ChildDetailPage = () => {
  const { id } = useParams(); // Get the child ID from URL params
  const [child, setChild] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useAuth(); // Get the current user from context

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/child/${id}`); // Update the URL to match your children API endpoint
        setChild(response.data);
      } catch (error) {
        console.error('Error fetching child details:', error);
      }
    };

    fetchChildDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChild({
      ...child,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true)
    if (validateFields()) {
      try {
        await axios.put(`/child/edit/${id}`, child);
        setIsLoading(false)
        setIsEditing(false);
      } catch (error) {
        setIsLoading(false)
        console.error('Error saving child details:', error);
      }
    }
  };
  const validateFields = () => {
    const newErrors = {};
    if (!child.firstName) newErrors.firstName = 'First name is required';
    if (!child.lastName) newErrors.lastName = 'Last name is required';
    if (!child.grade) newErrors.grade = 'Grade is required';
    if (!child.enteryYear) newErrors.enteryYear = 'Enrollment year is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally, you can refetch the details to revert changes
    // fetchChildDetails();
  };

  if (!child) {
    return <div className='h-full w-full flex items-center justify-center'>Child not found</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-1 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Child Details</h1>

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
            name="firstName"
            value={child.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={child.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Grade</label>
          <input
            type="text"
            name="grade"
            value={child.grade}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.grade ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            value={child.hobbies.join(', ')}
            onChange={(e) => handleChange({ target: { name: 'hobbies', value: e.target.value.split(', ') } })}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.hobbies ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Favorite Subject</label>
          <input
            type="text"
            name="favoriteSubject"
            value={child.favoriteSubject}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.favoriteSubject ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.favoriteSubject && <p className="text-red-500 text-sm">{errors.favoriteSubject}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Enrollment Year</label>
          <input
            type="text"
            name="enteryYear"
            value={child.enteryYear}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${errors.enteryYear ? 'border-red-500' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.enteryYear && <p className="text-red-500 text-sm">{errors.enteryYear}</p>}
        </div>

        {(isEditing|| isLoading )&& (
          <div className="col-span-full flex justify-end gap-4 mt-4 ">
            <div className='w-32'>
            <CustomLoadingButton  buttonText='Update' loadingText='Updating' isLoading={isLoading} type='submit'/>
            
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

      <div className="flex flex-col overflow-hidden bg-white rounded-md py-4 gap-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold uppercase text-black/40">
          Recent Added Gifts for { child.firstName} { child.lastName} Or his/her family
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

export default ChildDetailPage;
