import React from 'react'

import SignInForm from '../forms/SignIn';
import { usePopup } from '../../context/popUpContext';
import { IoClose } from 'react-icons/io5';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import EditProfileForm from '../forms/EditProfileForm';
import SignUpForm from '../forms/Signup';
import Loading from './Loading';


const PopUpContainer = () => {
    const { type, hidePopup ,visible} = usePopup(); 
  return (
    <div  className={`  ${visible ? "flex":"hidden"} h-[100vh] w-full fixed bg-[rgba(0,0,0,0.4)] top-0  left-0   justify-center items-center z-50` }
    >
       {type!=="loading"&&  <div className=' mx-4 w-full sm:max-w-[500px] bg-white  p-6  rounded-md relative' >
            
         
            {type==="sign-in"&&<SignInForm />}
            {type==="change-pwd"&&<ChangePasswordForm/> }
            {type==="edit-profile"&&<EditProfileForm/>}
            {type==="sign-up"&&<SignUpForm/>}
            <button className=' absolute right-4 top-4  ' onClick={()=>hidePopup()}> <IoClose size={25} /> </button>
        </div>}
        {type==="loading"&&<Loading/>}
    </div>
  )
}

export default PopUpContainer