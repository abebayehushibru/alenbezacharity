import React from 'react'
import img1 from "../../asserts/images/landingimage.jpg";
import { formatDate } from '../../services/functions';
const TransactionCard = ({name,type,date,amount}) => {
  return (
    <div className=' flex gap-5 border-black/10 border-solid border-[1px] p-2 rounded-sm'>
          <img src={img1} className=' h-10 w-10 rounded-full object-cover' alt='post'>
          </img>
          <div className=' flex justify-between flex-1'>

          <div className=' flex flex-col gap-2'>
            <h2 className=' font-bold font-sans tracking-wider capitalize text-[13px]'>{name}</h2>
            <p className=' text-black/60 text-[12px]'> {type} </p>
          </div>
          <div className=' flex flex-col gap-2'>
            <h2 className=' font-bold font-sans tracking-wider capitalize text-[13px]'>{amount} Br</h2>
            <p className=' text-black/60 text-[12px] capitalize'> {formatDate(date)} </p>
          </div>
          </div>
    </div>
  )
}

export default TransactionCard