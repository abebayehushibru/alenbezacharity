import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionHeading from './SectionHeading';
import PostCard from './Cards/PostCard';
import { ABC_BACKEND_API_URL } from '../configf/config';
import Pagination from '@mui/material/Pagination';

import ShimmerPlaceholder from './Cards/ShimmerPlaceholder';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page number
  const [totalPages, setTotalPages] = useState(1); // State for total number of pages
  const postsPerPage = 6; // Set the number of posts per page

  // Fetch posts from the API using Axios
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/posts/bypage`, {
          params: {
            page: currentPage,
            limit: postsPerPage,
          },
        });

        setPosts(response.data.posts); // Assuming response.data.posts contains an array of posts
        setTotalPages(response.data.totalPages); // Assuming response.data.totalPages contains total page count
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]); // Re-fetch posts whenever the current page changes

  // Handle pagination page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

 
  if (error) {
    return <p className='py-2 text-center'>Error please check your connection</p>;
  }

  return (
    <div id="blogs">
      <SectionHeading topText="Our Blog Post" midleText="Our Latest News & Update" />
      <div className="flex justify-center gap-5 flex-wrap  ">
      {loading
        ? // If loading, show 8 shimmer placeholders
          Array(6).fill().map((_, index) => (
            <ShimmerPlaceholder key={index} />
          ))
        : posts?.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            img={post.images[0]}
            title={post.title}
            content={post.content}
            date={post.date}
          />
        ))}
      </div>
      <div className='flex w-full justify-center pt-6'>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        
        />
   
      </div>
    </div>
  );
};

export default Blogs;
