import React from 'react';
import { usePopup } from '../../context/popUpContext';
import { IoClose } from 'react-icons/io5';
import AddMember from '../forms/addMember';

import AddChild from '../forms/ChildForm';
import AddAdmin from '../forms/AddAdmin';
import PostForm from '../forms/postForm';

const SmallPopUpContainer = () => {
  const { smallPopupContent, hideSmallPopup, smallPopupVisible } = usePopup();
const h=()=>{
    hideSmallPopup();
    
}
  return (
    <div
      className={`${
        smallPopupVisible ? 'flex' : 'hidden'
      } h-[100vh] w-full fixed bg-[rgba(0,0,0,0.4)] top-0 left-0 justify-center items-center z-50`}
    >
      <div className='mx-4 w-full sm:max-w-[500px] bg-white p-4 rounded-md relative'>
        {smallPopupContent === 'member' && <AddMember />}
        {smallPopupContent === 'child' && <AddChild />}
        {smallPopupContent === 'admin' && <AddAdmin />}
        {smallPopupContent ==='post' && <PostForm />}
        
        <button
          className='absolute right-4 top-4 hover:text-blue-700'
          onClick={()=>h()}
        >
         <IoClose size={25} />
        </button>
      </div>
    </div>
  );
};

export default SmallPopUpContainer;
