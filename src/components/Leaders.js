import React from 'react'
import SectionHeading from './SectionHeading'
import LeaderCard from './Cards/LeaderCard'
import wofu from "../asserts/images/wofu.jpg";
import bety from "../asserts/images/bety.jpg";
import Kald from "../asserts/images/457402075_388993077572231_4446532916212192415_n.jpg";
const Leaders = () => {
  const data=[
    {
      from:"#35C57F",
      img:Kald,
      name:"Kaleb Eyasu",
      role:"Founder",
      phone:"+251 95 472 4868",
      tg:"https://t.me/Kalebo2013"
    },
    {from:"#f84d43",
      img:wofu,
      name:"Teketel Feleke",
      role:"Main Leader",
      phone:"+251 94 631 8978",
      tg:"https://t.me/Kalebo2013"
    },
    {
      from:"#feb840",
      img:bety,
      name:"Bethelhem Abreham",
      role:"Finance ",
      phone:"+251 96 869 1497",
      tg:"https://t.me/Kalebo2013"
    }
  ]
  return (
    <div>
        <SectionHeading topText={"Our leaders"} midleText={"Meet With Charity leaders"} />
        <div className=' flex w-full flex-col justify-center sm:px-8 px-4 gap-5 sm:w-[75%] sm:flex-row mx-auto'>

{
  data.map((leader,index)=>{
return   <LeaderCard key={index} from={leader.from} img={leader.img} role={leader.role} phone={leader.phone} tg={leader.tg} name={leader.name}/>
  })
}
       
        </div>
    </div>
  )
}

export default Leaders