import React from 'react';
import SectionHeading from './SectionHeading';
import PostCard from './Cards/PostCard';
import { datas } from '../asserts/images/data';

const Blogs = () => {
  return (
    <div id='blogs'>
      <SectionHeading topText="Our Blog Post" midleText="Our Latest News & Update" />
      <div className='flex justify-center gap-5 flex-wrap'>
        {datas.map((data) => (
          <PostCard 
            key={data.id} 
            id={data.id} 
            img={data.img} 
            title={data.title} 
            content={data.content} 
            date={data.date} 
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
