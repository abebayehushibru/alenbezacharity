import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineGift,
  AiOutlineEdit,
} from "react-icons/ai"; // Example icons
import { BiChevronDown, BiLogOut } from "react-icons/bi"; // Icon for dropdown and logout

import avatar from "../../asserts/images/avatar.png";
import logo from "../../asserts/images/Abc.PNG";
import { TiArrowSyncOutline } from "react-icons/ti";
import { FaChild } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import SmallPopUpContainer from "../../components/popup/SmallPopUpContainer";
const Home = () => {
  const [openDropdown, setOpenDropdown] = useState("");
  const { user } = useAuth;
  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? "" : menu);
  };

  return (
    <div className=" relative   w-full flex flex-col h-screen bg-gray-100">
      {/* Dashboard Navbar */}
      <div className="flex justify-between items-center p-2 px-4 bg-white shadow-lg">
        <div className="flex items-center space-x-4">
          {/* Logo and Name */}
          <div className="text-lg font-bold">
            {" "}
            <img
              src={logo}
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="text-sm">Alenbeza Charity</div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Avatar and Admin Info */}
          <div className="flex items-center space-x-2">
            <img
              src={avatar}
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm">{user?.firstname}</div>
          </div>
          <div className="switch relative flex flex-row gap-3 w-7 items-center ">
            {/* Switch Account Icon */}
            <div className="hidden absolute p-2 py-1 bg-black/80 rounded-sm  text-white -left-32 shadow-sm ">
              <span> Switch account </span>
            </div>
            <Link
              to={"/"}
              className="bg-black/5 p-2 rounded-full hover:bg-black/80 hover:text-white text-black"
            >
              <TiArrowSyncOutline size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[250px] bg-black text-white p-3 flex flex-col">
          {/* Menu */}
          <div className="flex-1 space-y-3">
            <div className="max-h-full overflow-y-hidden">
              {/* Dashboard Menu */}
              <div>
                <Link
                  to="./"
                  className="flex items-center p-2 rounded hover:bg-gray-700"
                >
                  <AiOutlineDashboard className="mr-2" />
                  Dashboard
                </Link>
              </div>

              {/* Members Menu */}
              <div>
                <button
                  onClick={() => handleDropdown("members")}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
                >
                  <span className="flex items-center">
                    <AiOutlineUser className="mr-2" />
                    Members
                  </span>
                  <BiChevronDown />
                </button>
                {openDropdown === "members" && (
                  <div className="ml-4 space-y-2">
                    <Link
                      to="./members/all"
                      className="block p-2 rounded hover:bg-gray-700"
                    >
                      All Members
                    </Link>
                    <Link
                      to="./members/admins"
                      className="block p-2 rounded hover:bg-gray-700"
                    >
                      Admins
                    </Link>
                    <Link
                      to="./members/deleted"
                      className="block p-2 rounded hover:bg-gray-700"
                    >
                      Removed
                    </Link>
                    
                  </div>
                )}
              </div>

              {/* Donations Menu */}
              <div>
                <button
                  onClick={() => handleDropdown("donations")}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
                >
                  <span className="flex items-center">
                    <AiOutlineGift className="mr-2" />
                    Gift Donation
                  </span>
                  <BiChevronDown />
                </button>
                {openDropdown === "donations" && (
                  <div className="ml-4 space-y-2">
                    <Link
                      to="./donations/gifts"
                      className="block p-2 pl-3 rounded hover:bg-gray-700"
                    >
                      All Gifts
                    </Link>
                    <Link
                      to="./donations/material"
                      className="block p-2 pl-3 rounded hover:bg-gray-700"
                    >
                      Material Gifts
                    </Link>
                    <Link
                      to="/donations/material"
                      className="block p-2 pl-3 rounded hover:bg-gray-700"
                    >
                      Money Gifts
                    </Link>
                    <Link
                      to="/donations/completed"
                      className="block p-2 pl-3 rounded hover:bg-gray-700"
                    >
                      Completed Gifts
                    </Link>
                  </div>
                )}
              </div>

              {/* Post Menu */}
              <div>
                <Link
                  to="./posts"
                  className="flex items-center p-2 rounded hover:bg-gray-700"
                >
                  <AiOutlineEdit className="mr-2" />
                  Post
                </Link>
              </div>

              {/* P     Beneficiary Children */}
              <div>
                <Link
                  to="./childrens"
                  className="flex items-center p-2 rounded hover:bg-gray-700"
                >
                  <FaChild className="mr-2" />
                  Beneficiary Children
                </Link>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button className="mt-auto flex items-center bg-red-600 p-2 rounded hover:bg-red-700">
            <BiLogOut className="mr-2" />
            Logout
          </button>
        </div>

        {/* Main Content Area */}
        <div className="relative flex-1  ">
          <div className="absolute max-h-full overflow-y-auto min-w-full min-h-full bg-slate-300 grid grid-cols-1">
            <Outlet />
            <SmallPopUpContainer />
            {/* <Dashboard/> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white p-4 text-center flex items-center justify-between text-sm">
        <span>
          &copy; {new Date().getFullYear()} Alenbeza Charity. All Rights
          Reserved.
        </span>

        <span>Design & Developed by: Ahavah SWD & Technology</span>
      </div>
    </div>
  );
};

export default Home;
