import React, { useState } from 'react';


const HoverIcon = ({Icon}) => {
  const [color, setColor] = useState("rgba(255, 255, 205, 0.3)");

  return (
    <a 
      href="/"  
      className="" 
      onMouseEnter={() => setColor("rgb(248,77,67)")}  // Change color on hover
      onMouseLeave={() => setColor("rgba(255, 255, 205, 0.3)")}  // Revert color on mouse leave
    >
      <Icon color={color} />
    </a>
  );
};

export default HoverIcon;
