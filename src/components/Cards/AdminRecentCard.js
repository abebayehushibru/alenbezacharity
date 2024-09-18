import React from 'react'
import img from "../../asserts/images/avatar.png"
import { formatDate } from '../../services/functions'
const AdminRecentCard = ({data}) => {
  
  return (
    <div className='flex justify-between items-center border-[1px] border-black/15 border-solid px-3 py-2 rounded-[5px]'>
        <div className='flex gap-4 items-center'>
            <img src={img} className='h-8 w-8 rounded-full' alt='i'/>
            <div className='space-y-0'>
                <p className=' font-bold text-[11px] '>{data.name}</p>
                <span className=' rounded-full bg-blue-600 text-white text-center text-[10px] px-2 py-[2px]'> {
           formatDate( data.date)
                }</span>
            </div>
        </div>

        <div>
         
                <span className='text-sm text-green-500 font-bold capitalize'> {data.amount? `${data.amount} Birr`: data.typeOfGift} </span>
           
        </div>
    </div>
  )
}

export default AdminRecentCard