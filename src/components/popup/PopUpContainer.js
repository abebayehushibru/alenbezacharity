import React from 'react'

import SignInForm from '../forms/SignIn';
import { usePopup } from '../../context/popUpContext';
import { IoClose } from 'react-icons/io5';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import EditProfileForm from '../forms/EditProfileForm';


const PopUpContainer = () => {
    const { type, hidePopup ,visible} = usePopup(); 
  return (
    <div  className={`  ${visible ? "flex":"hidden"} h-[100vh] w-full fixed bg-[rgba(0,0,0,0.4)] top-0  left-0   justify-center items-center` }
    >
        <div className=' mx-4 w-full sm:max-w-[500px] bg-white  p-6  rounded-md relative' >
            
         
            <SignInForm />
            {/* <ChangePasswordForm/> */}
            {/* <EditProfileForm/> */}
            <button className=' absolute right-4 top-4  ' onClick={()=>hidePopup()}> <IoClose size={25} /> </button>
        
        </div>
    </div>
  )
}

export default PopUpContainer