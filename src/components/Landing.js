import React from "react";
import img1 from "../asserts/images/landingimage.jpg";
import { usePopup } from "../context/popUpContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
const Landing = () => {
  const { user } = useAuth();
  const {
showPopup
  }=usePopup();
  return (
    <div className="relative h-[100vh] max-h-[600px] sm:max-h-[1200px] min-w-full bg-[#1e1e1e] justify-center items-center">
      <img src={img1} className=" relative h-full w-full object-cover " alt=""></img>

      <div className=" absolute top-0 left-0 bg-black/75 h-[100vh] max-h-[600px] sm:max-h-[1200px] flex min-w-full items-center justify-center ">
        <div className="flex flex-col gap-8 items-center">
          <h2 className="text-2xl text-white font-bold md:text-7xl sm:4xl"> መስጠትን ሲሰጠን ነው የምንሰጠው</h2>
          <p className="text-white text-[12px] md:text-lg sm:text-sm">
          ልጆች የዓለማችን እጅግ ውድ ሀብት እና የወደፊት ተስፋ ናቸው!
          </p>
          <div className=" w-64 flex gap-3">
          {!user?.token?<button
              className="justify-center flex flex-1 p-3 bg-[#F84D42] text-white font-semibold text-base rounded-[3px]  text-center"
             onClick={()=>showPopup()}
            >
              Login
            </button>: <Link
                  className="justify-center flex flex-1 p-3 bg-[#F84D42] text-white font-semibold text-base rounded-[3px]  text-center" href="/"
            >
              Donate now
            </Link>}
            <a
              className=" justify-center flex flex-1 p-3 bg-[#ffb840] text-white font-semibold text-base rounded-[3px] "
              href="/"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
