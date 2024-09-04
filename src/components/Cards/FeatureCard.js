import React from 'react'


const FeatureCard = ({title, color,Icon,content,}) => {
  return (
    <div className=' flex flex-col  items-center sm:items-start gap-4  w-full sm:max-w-[260px]  px-3 h-full '>
      <div  className=' h-16 w-16 rounded-full  flex justify-center items-center' style={{backgroundColor:color}}>
<Icon size={26} color='white'/>
      </div>
      <h2 className=' text-xl capitalize font-bold text-[#2C2C2B] '>{title} </h2>
      <p className='text-black/45 text-base text-left'>{content}</p></div>
  )
}

export default FeatureCard