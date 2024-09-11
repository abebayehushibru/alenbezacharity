import React, { useState } from "react";
import axios from "axios";
import { usePopup } from "../../context/popUpContext";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import { TiTimes } from "react-icons/ti";

const PostForm = () => {
  const { showPopup, hidePopup } = usePopup();

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [],
  });

  // State for errors
  const [errors, setErrors] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle image file input changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  // Function to clear the error for a specific field
  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = "Title is required.";
    }
    if (!formData.content) {
      newErrors.content = "Content is required.";
    }
    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formData.images.forEach((file) => formDataToSend.append("images", file));

      try {
        showPopup("loading");
        const response = await axios.post(ABC_BACKEND_API_URL + "/posts", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // Reset the form after successful submission
        setFormData({
          title: "",
          content: "",
          images: [],
        });
        setSelectedImages([]);
        hidePopup();
        alert("Post added successfully");
      } catch (error) {
        setErrors({ serverError: error.response?.data?.message || "An error occurred" });
        hidePopup();
      }
    }
  };

  // Function to remove an image from the selected images
  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4 text-center">Add Post</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter Title"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter Content"
            className={`w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 ${
              errors.content ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
            rows="4"
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
        </div>

        {/* Image Upload */}
        <div className="flex flex-row  justify-between items-center">
          <label className="  flex-1 text-sm font-medium mb-2">Upload Images *</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            onFocus={handleFocus}
            className={` w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.images ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
            }`}
          />
         </div>
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
       

        {/* Selected Images Preview */}
        {selectedImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="w-full h-12 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform "
                >
                  <TiTimes/>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Server Error Display */}
        {errors.serverError && <p className="text-red-500 text-sm">{errors.serverError}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
