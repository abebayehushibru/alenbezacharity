import React from 'react';
import { FaPhone } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const LeaderCard = ({ from ,phone ,tg,img,role,name}) => {
  return (
    <div className='flex flex-col gap-5 rounded-md overflow-hidden mainleadercard flex-1 '>
      <div className='relative'>
        <img src={img} alt='leaders_image' className='h-[300px]  w-full object-cover' />
        <div className={"flex items-start justify-end flex-col absolute bottom-0 px-5 pb-0   w-full subcard"} style={{backgroundImage: `linear-gradient(to top, ${from} var(--tw-gradient-from-position), rgba(255, 255, 255, 0) var(--tw-gradient-to-position))`,
}}>
          <a href={`tel:${phone}`} className='flex gap-2 items-center text-white px-3'>
            <FaPhone color='white' size={14} />{phone}
          </a>
          <a href={`${tg}`} className='flex gap-2 items-center text-white px-3 mb-3'>
            <FaTelegramPlane color='white' size={16} />Telegram
          </a>
        </div>
      </div>
      <div className={`text-white py-4 px-5 flex-1`} style={{ backgroundColor: from }}>
        <h2 className='font-bold text-xl'>
          {name}
        </h2>
        <p>
        {role}
        </p>
      </div>
    </div>
  );
}

export default LeaderCard;
