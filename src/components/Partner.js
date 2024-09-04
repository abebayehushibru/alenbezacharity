import React from 'react'
import Marquee from 'react-fast-marquee';
import img2 from '../asserts/images/ahavah_logo.png';
import img3 from '../asserts/images/desire.jpg';
import img4 from '../asserts/images/Ma.jpg';
import img1 from '../asserts/images/bethel-school.png';
import img5 from '../asserts/images/emnet-electronics.png';
import img6 from '../asserts/images/sabeh-cafe.png';
import SectionHeading from './SectionHeading';
const Partner = () => {
    const images=[img2,img6,img3,img5,img4,img1,img2,img6,img3,img5,img4,img1];
  return (
    <div className=" relative py-10">
      <SectionHeading topText={"our partners"}/>    
        <Marquee direction="left" speed={90} delay={5} gradientWidth={350} className='overflow-hidden' pauseOnHover ={true}>
          {
               images.map((item,index)=>{
                return <div className="h-[120px] max-w-40 flex justify-center items-center" key={index}>
               <img src={item} className="object-contain " alt="" />
              </div>
            })
            
          }
          
        </Marquee>
     
    </div>
  )
}

export default Partner