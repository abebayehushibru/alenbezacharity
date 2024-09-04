import React from "react";

import FeatureCard from "./Cards/FeatureCard";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { IoCash } from "react-icons/io5";
import { FaWallet } from "react-icons/fa";
import img1 from "../asserts/images/landingimage.jpg";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
const Features = () => {
  const content = [
    "የእኛን በጎ አድራጎት ማህበር በመቀላቀል ለውጥ ለማምጣት አባል ወይም አካል ይሁኑ። ልገሳዎን በትንሹ 25 ብር ወይም ከዚያ በላይ ይጀምሩ ፣እያንዳንዱ መዋጮዎ የተቸገሩትን ይረዳናል።",
    "ለአንድ ልጅ ወይም ለቤተሰባቸው ስጦታ በመስጠት  ለህልናዎ ልዩ ደስታን ይፍጠሩ፣ ስጦታዎ በሕይወታቸው ላይ ትርጉም ያለው ለውጥ የሚያመጣ  ነዉና  የትምህርት  ቁሳቁስ፣ አልባሳት ወይም ሌሎች አስፈላጊ ነገሮችን ማቅርብ ይችላሉ።",
    "ዛሬም በመለገስ ለውጥ ያምጡ። የአንድ ጊዜ ስጦታ መስጠት፣ ከ25 ብር ጀምሮ ወርሃዊ መዋጮ መክፍል ወይም እንደ ዩኒፎርም ወይም መጽሃፍ ያሉ ልዩ ቁሳቁሶችን ስፖንሰር ማድረግ ይችላሉ።",
  ];
  return (
    <div className=" bg-[#fcf7f3] flex  flex-col sm:flex-row ">
      <div className=" w-full sm:w-[30%] flex flex-col relative ">
        <img src={img1} alt="" className="h-full w-full object-cover" />
        <div className=" absolute top-0 left-0 bg-[rgba(0,0,0,0.9)] h-full w-full items-center justify-center gap-5 ">
          <div className=" flex flex-col items-center justify-center h-full px-6 gap-5">
            <h2 className=" text-4xl text-center  text-white font-bold capitalize font-sans">
              Child Education help
            </h2>
            <p className=" text-white text-sm">
              {" "}
              Your litle help can make million Childrean smile <br/>{"\n የእርስዎ ትንሽ እርዳታ ሚሊዮን ህጻናትን ፈገግ ሊያደርግ ይችላል። "}
            </p>
            
            
            <div className=" max-w-40">
              <Link to="donate-now">
              <Buttons bg={"red"} text={"Donate Now"} onclick={() => { }} />
        
              </Link>
              </div>
          </div>
        </div>
      </div>
      <div className="   flex flex-col flex-1 py-10  gap-5 sm:px-10 px-4">
        <div className=" items-center sm:items-start flex flex-col mx-0 py-2  gap-2">
          <p className=" text-[#F84D42] font-semibold text-lg capitalize font-Pacifico ">
            Our Features
          </p>
          <h2 className="  text-2xl sm:text-4xl font-bold text-[#2C2C2B] capitalize text-left">
            How Could You Help?
          </h2>
        </div>

        <div className="flex flex-row justify-start  flex-wrap items-center ">
          <FeatureCard
            color={"#35C57F"}
            Icon={FaWallet}
            title={"Become member"}
            content={content[0]}
          />
          <FeatureCard
            color={"#f84d43"}
      
            Icon={FaHeartCircleCheck}
            title={"quick fundrising"}
            content={content[1]}
          />
          <FeatureCard
            color={"#feb840"}
            Icon={IoCash}
            title={"Start donating "}
            content={content[2]}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
