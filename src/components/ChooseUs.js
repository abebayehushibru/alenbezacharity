import React, { useState } from "react";
import Buttons from "./Buttons";
import img1 from "../asserts/images/landingimage.jpg";
const ChooseUs = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  return (
    <div id="why-choose-us" className="sm:p-24 p-8 flex  sm:flex-row flex-col justify-between bg-black gap-6 sm:gap-0">
      <div className="sm:w-[40%]  gap-5 flex flex-col">
        <div className=" items-start flex flex-col m-0 py-2 gap-2">
          <p className=" text-[#F84D42] font-semibold text-lg capitalize font-Pacifico ">
            Why Choose Us
          </p>
          <h2 className=" text-4xl font-bold text-white capitalize text-left">
            Trusted non profit donation center
          </h2>
        </div>

        <div className="gap-5 flex flex-col">
          <div className=" flex gap-3 justify-center sm:justify-start">
            <Buttons
              text={"Mission"}
              bg={selectedButtonIndex == 0 ? "#F84D43" : "#2d2d2d"}
              onclick={() => {
                setSelectedButtonIndex(0);
              }}
            />
            <Buttons
              text={"Vission"}
              bg={selectedButtonIndex == 1 ? "#F84D43" : "#2d2d2d"}
              onclick={() => {
                setSelectedButtonIndex(1);
              }}
            />
            <Buttons
              text={"Value"}
              bg={selectedButtonIndex == 2 ? "#F84D43" : "#2d2d2d"}
              onclick={() => {
                setSelectedButtonIndex(2);
              }}
            />
          </div>
          <p className=" text-white text-[13px] text-left">
            {selectedButtonIndex == 0
              ? "Our Mission: በማንኛውም ሁኔታ ውስጥ ላሉና ድጋፍ ለሚያስፈልጋቸው ወገኖቻችን በተገቢው ሰዓትና ጊዜ መድረስ"
              : selectedButtonIndex == 1
              ? "Our Vission: በትምህርት ቁሳቁስ ዕጦት ምክንያት ትምህርት የማይማሩትን ሆነ የሚያቋርጡትን በቋሚነት በመደገፍ ወደ ትምህርት ገበታ እንዲመለሱ ማድረግ፤ወጣቱን ለበጎ ስራ ማነሳሳት ፤ በአከባቢያችን ላሉ አጋዥና ደጋፊ ላጡ ወገኖቻችን በምያስፈልጋቸው ነገር ሁሉ ከጎናቸው በመሆን በምንችለው መጠን መደገፍ እና"
              : "Our Value: መረዳዳትና መርዳት ፣ ግልጸኝነት ፣ ተጠያቂነትን ፣ ፍትሀዊነት ፣ ታማኝነት ፣ አገልጋይነት"}
          </p>
        </div>
      </div>
      <div className="sm:w-[45%]  flex items-center justify-center relative">
      <img src={img1} className=" z-10 h-full w-[90%] object-cover rounded-lg rotate-2 after:border-red-500 " alt=""></img>
<div className="max-w-[90%] rotate-2 shadowBorder text-red rounded-lg ">hh</div>
      </div>
     
    </div>
  );
};

export default ChooseUs;
