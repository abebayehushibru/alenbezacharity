import React from 'react'

const SectionHeading = ({topText,midleText,botomText}) => {
  return (
    <div className=' items-center flex flex-col m-0 py-2 gap-3 mb-4' >
        <p className=' text-[#F84D42] font-semibold text-lg capitalize font-Pacifico '>{topText}</p>
        <h2 className=' text-2xl sm:text-4xl font-bold text-[#2C2C2B]'>{midleText}</h2>
        <p className=' pt-2 text-base text-black/45 max-w-[600px] text-center'>{botomText}</p>
    </div>
  )
}

export default SectionHeading