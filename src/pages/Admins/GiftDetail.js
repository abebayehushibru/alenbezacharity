import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ABC_BACKEND_API_URL } from '../../configf/config';
import CustomLoadingButton from '../../components/controls/CustomButton';
import { useToast } from '../../context/ToastContext';

const GiftDetailPage = () => {
  const { id } = useParams(); // Get the gift ID from URL params
  const [gift, setGift] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast(); 

  useEffect(() => {
    const fetchGiftDetails = async () => {
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/donations/gifts/${id}`); // Update the URL to match your gifts API endpoint
      
      console.log(response.data);
        setGift(response.data.gift);
      } catch (error) {
        showToast("Error fetching gift details, check internet connection", "error");
        console.error('Error fetching gift details:', error);
      }
    };

    fetchGiftDetails();
  }, [id, showToast]);

  const handleStatusChange = async (status) => {
    setIsLoading(true);
    try {
      await axios.post(`${ABC_BACKEND_API_URL}/donations/gifts/${id}/status`, { status });
      setGift(prevGift => ({ ...prevGift, status }));
      showToast(`Gift status updated to ${status}`, "success");
    } catch (error) {
      showToast("Error updating gift status, try again", "error");
      console.error('Error updating gift status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!gift) {
    return <div className='h-full w-full flex items-center justify-center'>Gift not found</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-1 bg-white py-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Gift Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <p className="border p-2 rounded-md bg-gray-100 capitalize">{gift.firstName} {gift.lastName}</p>
        </div>

       

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <p className="border p-2 rounded-md bg-gray-100">{gift.phoneNumber}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <p className="border p-2 rounded-md bg-gray-100">{gift.email || 'N/A'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <p className="border p-2 rounded-md bg-gray-100">{gift.address || 'N/A'}</p>
        </div>
       

       

        <div>
          <label className="block text-sm font-medium mb-2">Type of Gift</label>
          <p className="border p-2 rounded-md bg-gray-100 capitalize">{gift.typeOfGift}</p>
        </div>

        {gift.typeOfGift === 'material' && (
          <div>
            <label className="block text-sm font-medium mb-2">Material Name</label>
            <p className="border p-2 rounded-md bg-gray-100">{gift.materialName || 'N/A'}</p>
          </div>
        )}

        {gift.typeOfGift === 'money' && (
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <p className="border p-2 rounded-md bg-gray-100">{gift.amount || 'N/A'}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Gift Recipient</label>
          <p className="border p-2 rounded-md bg-gray-100 capitalize">{gift.giftRecipient}</p>
        </div>

        {gift.giftRecipient === 'child' || gift.giftRecipient === 'childFamily' ? (
          <div>
            <label className="block text-sm font-medium mb-2 ">Selected Child</label>
            <p className="border p-2 rounded-md bg-gray-100 capitalize">{gift.selectedChild || 'N/A'}</p>
          </div>
        ) : null}

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <p className={`border p-2 rounded-md capitalize text-white ${gift.status === 'pending' ? 'bg-black' : gift.status === 'completed' ? 'bg-green-600 ' : 'bg-red-600'}`}>
            {gift.status}
          </p>
        </div>
        <div className='relative col-span-2 row-span-2 flex flex-col'>
          <label className="block text-sm font-medium mb-2">Reason for Gift</label>
          <p className=" relative border p-2 rounded-md bg-gray-100 flex-1">{gift.reasonForGift || 'N/A'}</p>
        </div>
        {(gift.status === 'Pending' || gift.status === 'pending' )&& (
        <div className="flex gap-4 mb-4 flex-col">
             <label className="block text-sm font-medium mb-2">Update Status</label>
             <div className=' flex gap-4'> 
        
             <CustomLoadingButton
              buttonText='Set as Completed'
              loadingText='Setting Completed'
              isLoading={isLoading}
              className="bg-green-500 text-sm hover:bg-green-600 "
              action={() => handleStatusChange('completed')}
              type='button'
            />
            <CustomLoadingButton
              buttonText='Set as Failed'
              loadingText='Setting Failed'
              isLoading={isLoading}
              action={() => handleStatusChange('failed')}
              type='button'
              className="bg-red-500  text-sm hover:bg-red-600 "
            />
         
          </div>
        </div>
      )}
      </div>

    

      <Link to="../donations/gifts" className="text-blue-500 hover:underline">
        Back to Gifts List
      </Link>
    </div>
  );
};

export default GiftDetailPage;
