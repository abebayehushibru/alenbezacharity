import React from 'react'

const Buttons = ( {text,bg,color,onclick}) => {
  return (
    <div onClick ={()=>onclick()} className='px-3 #2d2d2d py-2 text-center text-white font-serif font-semibold text-[11px] rounded-sm   cursor-pointer' style={{color:color,backgroundColor:bg}}>{text}</div>
  )
}

export default Buttons