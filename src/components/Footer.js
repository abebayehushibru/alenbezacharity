import React from "react";
import Berhan from '../asserts/images/Berhan.png';
import cbe from '../asserts/images/cbe.jpg';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#1e1e1e] flex flex-wrap px-4 sm:px-16 py-14 gap-3 sm:gap-0 space-y-3 md:space-y-0 items-start">
        <div className=" md:w-1/4 max-w-[280] flex flex-col items-start gap-5" >
          <h2 className=" uppercase text-white font-bold font-serif tracking-wider">About Charity</h2>
          <div className=" relative h-[2px] w-[15%] bg-red-600 "></div>
          <p className="text-white/30 text-sm text-left pr-10 font-serif">
          ሩህሩህ ልብ ያላቸው ሰዎች ብዙ ገንዘብ
ካላቸው ሰዎች በእጅጉ ይበልጣሉ
            
          </p>
        </div>
        <div className=" md:w-1/4 max-w-[280] flex flex-col items-start gap-5" >
          <h2 className=" uppercase text-white font-bold font-serif tracking-wider">Quick links</h2>
          <div className=" relative h-[2px] w-[15%] bg-red-600 "></div>
          <div className="flex justify-between gap-10">
            <div className=" flex flex-col gap-1 items-start text-white/30 font-serif">
              <Link to="/" className=" hover:text-white">Home</Link>
              <Link to="/#blogs" className=" hover:text-white">Blogs</Link>
              <Link to="/donate-now" className=" hover:text-white">Donate</Link>
            </div>
            <div className=" flex flex-col gap-1 items-start text-white/30 font-serif">
          
              <Link to="/#contact" className=" hover:text-white">Contact Us</Link>
              <Link to="/About" className=" hover:text-white">About Us</Link>
              <Link to="/#why-choose-us" className=" hover:text-white">Why Choose us</Link>
            </div>
          </div>
        </div>
        <div className=" md:w-1/4 max-w-[280] flex flex-col items-start gap-5" >
          <h2 className=" uppercase text-white font-bold font-serif tracking-wider">Bank Accounts</h2>
          <div className=" relative h-[2px] w-[15%] bg-red-600 "></div>
          <div className="flex flex-col justify-between gap-3 font-serif">
            <div className=" flex flex-row gap-3 items-center text-white/30">
            <img src={cbe} className=" h-10 w-10  rounded-[5px]" alt="cbe">
            </img>
              <div className=" flex flex-col items-start">
                <p>CBE </p>
                <p className=" hover:text-white">1000353714884 </p>
              </div>
            </div>
            <div className=" flex  flex-row gap-3 items-center text-white/30 ">
            <img src={Berhan} className=" h-10 w-10  rounded-[5px] bg-[#EAAA00]" alt="cbe">
            </img>
              <div className=" flex flex-col items-start">
                <p>Birhan bank </p>
                <p className=" hover:text-white">1601660042923 </p>
              </div>
         
        
            </div>
          </div>
        </div>
        <div className=" md:w-1/4 max-w-[320] flex flex-col items-start gap-5" >
          <h2 className=" uppercase text-white font-bold font-serif tracking-wider">Contact Us</h2>
          <div className=" relative h-[2px] w-[15%] bg-red-600 "></div>
          <div className="flex justify-between ">
            <div className=" flex flex-col gap-3 items-start text-white/30 font-serif">
              <p  className=" flex gap-1" > <span className=" text-white flex gap-3 items-center"><FaMapMarkerAlt />Address : </span>Sabeh Dilla , Ethiopia</p>
              <p className=" flex gap-1"  > <span className=" text-white flex gap-3 items-center"> <FaPhoneAlt /> Phone : </span> +251-94-631-8978</p>
              <p className=" flex gap-1"  > <span className=" text-white flex gap-3 items-center"> <MdEmail  />Email : </span> alenbeza@gmail.com</p>
              
            </div>
         
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-5  justify-between py-3 bg-black text-white/50 text-sm sm:px-16 px-4">
        <span>Copyright &copy; Alenbeza Charity 2017. All Rights Reserved</span>
        <span>Design & Developed by: Ahavah SWD & Technology</span>
      </div>
    </div>
  );
};

export default Footer;
