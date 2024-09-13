import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import SectionHeading from './SectionHeading';
import PostCard from './Cards/PostCard';
import { ABC_BACKEND_API_URL } from '../configf/config';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the API using Axios
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(ABC_BACKEND_API_URL+'/posts');
        console.log(response.data);
        
        setPosts(response.data); // Assuming response.data is an array of posts
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch posts'); // Display error message
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="blogs">
      <SectionHeading topText="Our Blog Post" midleText="Our Latest News & Update" />
      <div className="flex justify-center gap-5 flex-wrap">
        {posts.map((post) => (
          <PostCard
            key={post._id} // Use the correct key based on your post ID property (usually `_id` in MongoDB)
            id={post._id}
            img={post.images[0]} // Assuming images is an array, adjust if needed
            title={post.title}
            content={post.content}
            date={post.date} // Ensure `date` is formatted correctly
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
