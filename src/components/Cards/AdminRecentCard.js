import React from 'react'
import img from "../../asserts/images/avatar.png"
const AdminRecentCard = () => {
  return (
    <div className='flex justify-between items-center border-[1px] border-black/15 border-solid px-3 py-2 rounded-[5px]'>
        <div className='flex gap-4 items-center'>
            <img src={img} className='h-8 w-8 rounded-full' alt='i'/>
            <div className='space-y-0'>
                <p className=' font-bold text-[11px] '>Abebayehu Shibru</p>
                <span className=' rounded-full bg-blue-600 text-white text-center text-[10px] px-2 py-[2px]'>July 2, 2024</span>
            </div>
        </div>

        <div>
         
                <span className='text-sm text-green-500 font-bold'> 300 Birr </span>
           
        </div>
    </div>
  )
}

export default AdminRecentCard