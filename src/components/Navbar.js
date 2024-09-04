import React, { useState, useRef, useEffect } from "react";
import img1 from "../asserts/images/Abc.PNG";
import { FaTelegramPlane, FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoMenu, IoClose } from "react-icons/io5"; // Import Close icon
import HoverIcon from "./HoverIcon";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    logout();
  };
 

const Greeting = ({ user }) => {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Good Morning ";
    } else if (hours < 18) {
        greeting = "Good Afternoon ";
    } else {
        greeting = "Good Evening ";
    }

    return (
        <span>
            {greeting} {user?.firstname || "User "} !
        </span>
    );
};




  return (
    <div className="w-full max-w-[1360px] mx-auto">
      {/* Top Bar */}
      <div className="bg-[#1e1e1e] px-2 py-3 justify-between flex">
        <div className="text-white text-[13px]">
          <span className="text-red-600">HI </span>
          <Greeting user={user}/>
          <span className="ml-3 pl-3 border-l-[0.5px] border-slate-500">
            Dilla, Ethiopia
          </span>
        </div>
        <div className="flex gap-3 text-[13px] items-center">
          <h2 className="text-white">Follow us</h2>
          <HoverIcon Icon={FaTelegramPlane} />
          <HoverIcon Icon={FaFacebookF} />
          <HoverIcon Icon={AiFillInstagram} />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex bg-white p-2 px-2 justify-between shadow-md">
        <div className="flex items-center justify-center gap-3">
          <img
            src={img1}
            className="h-[60px] w-[60px] rounded-full object-cover flex items-center justify-center"
            alt="logo"
          ></img>
          <div className="flex flex-col justify-center gap-0 items-center">
            <h2 className="uppercase text-black text-[16] font-bold m-0 px-0 tracking-[2px]">
              Alenbeza
            </h2>
            <p className="m-0 p-0 text-black/50 font-bold uppercase tracking-[2px] text-[11px]">
              Charity
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-[20px] items-center">
          <div className="gap-0 items-center flex font-sans">
            <Link
              to="/"
              className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold px-3"
            >
              Home
            </Link>
            <a
              href="./#blogs"
              className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold px-3"
            >
              Blogs
            </a>
            <Link
              to="/donate-now"
              className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold px-3"
            >
              Donate now
            </Link>
            <Link
              to="/About"
              className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold px-3"
            >
              About
            </Link>
            <Link
              to="#contact"
              className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold px-3"
            >
              Contact
            </Link>
          </div>

        { !user && <div className="pl-11">
            <Link
              className="p-3 py-2 bg-[#F84D42] text-white font-semibold text-base rounded-[3px] hover:bg-[#F96056]"
              to="/sign-up"
            >
              Register now
            </Link>
          </div>}
      
        {/* User Info and Dropdown */}
        {user && (
          <div className="relative flex items-center md:ml-5" ref={dropdownRef}>
            <img
              src={user.photo || img1} // Fallback to a default image if no photo
              alt="User"
              className="h-[40px] w-[40px] rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            <p
              className="ml-2 cursor-pointer text-black"
              onClick={toggleDropdown}
            >
              {user.firstname}
            </p>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-[180px] bg-white border rounded shadow-lg z-10">
                <ul className="py-2 text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  
                    >
                    <Link to="/payments">My donation</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Edit Profile clicked")}
                  >
                    Edit Profile
                  </li>
                  {user?.role=="member"&& <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <Link to="/admin"> Switch to admin</Link>
                   
                  </li>}
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

          
        </div>

        {/* Mobile Menu Toggle Button */}
        <div
          className="flex md:hidden gap-3 items-center justify-center cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <IoClose size={25} /> : <IoMenu size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col md:hidden bg-white shadow-md p-4">
          <Link
            to="/"
            className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold py-2"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/#blogs"
            className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold py-2"
            onClick={toggleMobileMenu}
          >
            Blogs
          </Link>
          <Link
            to="/donate-now"
            className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold py-2"
            onClick={toggleMobileMenu}
          >
            Donate now
          </Link>
          <Link
            to="/About"
            className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold py-2"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            to="/#contact"
            className="text-[15px] text-[rgba(38,38,38,0.6)] hover:text-[#F96056] font-semibold py-2"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
          { !user &&    <Link
            className="p-3 py-2 bg-[#F84D42] text-white font-semibold text-base rounded-[3px] hover:bg-[#F96056] mt-2"
            to="/sign-up"
            onClick={toggleMobileMenu}
          >
            Register now
          </Link>}
          {user && (
          <div className="relative flex items-center md:ml-5" ref={dropdownRef}>
            <img
              src={user.photo || img1} // Fallback to a default image if no photo
              alt="User"
              className="h-[40px] w-[40px] rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            <p
              className="ml-2 cursor-pointer text-black"
              onClick={toggleDropdown}
            >
              {user.firstname}
            </p>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-[180px] bg-white border rounded shadow-lg z-10">
                <ul className="py-2 text-gray-700">
                <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  
                    >
                    <Link to="/payments">My donation</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Edit Profile clicked")}
                  >
                    Edit Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        </div>
      )}
    </div>
  );
};

export default Navbar;
