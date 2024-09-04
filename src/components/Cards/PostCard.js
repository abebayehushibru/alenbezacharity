import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ img, title, content, date ,id}) => {
  return (
    <div className='flex flex-col rounded-md mx-4 sm:mx-0 sm:max-w-[350px] min-w-[320px] overflow-hidden gap-2 shadow-2xl pb-3'>
      <img src={img} alt='post_image' className='' />
      <div className='px-5 items-start flex flex-col gap-2'>
        <h2 className='text-xl font-bold capitalize hover:text-[#F84D42] cursor-pointer'>
          {title}
        </h2>
        <p className='text-left text-[13px] text-black/80 line-clamp-2 overflow-hidden'>
  {content}
</p>
        <span className='text-gray-500 text-sm'>{date}</span>
        <Link
          to={`/post-detail/${id}`} 
          className='flex justify-center items-center font-semibold uppercase text-[12px] gap-1'>
          read more <span className='bg-[#F84D42] h-0 w-0 p-[3px] rounded-full'></span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
