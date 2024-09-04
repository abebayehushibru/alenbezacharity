import React from "react";
import { useParams } from "react-router-dom";
import { datas } from "../asserts/images/data"; // Assuming this is your data array
import img1 from "../asserts/images/landingimage.jpg";
import RecentCards from "../components/Cards/RecentCards";

const PostDetail = () => {
  const { id } = useParams(); // Get the id from URL params
  // Convert id from params to a number and match it with data
  const post = datas.find((item) => item.id === Number(id)); // Ensure matching types

  // Get the most recent posts, excluding the current one
  const recentPosts = datas.filter((item) => item.id !== parseInt(id)).slice(0, 5); // Change 5 to your desired number of recent posts

  if (!post) {
    return <p className=" flex flex-1 justify-center items-center py-40">Post not found {id}</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap p-4 sm:px-16 sm:py-16 gap-10">
      <div className="sm:w-[70%] w-full flex flex-col gap-5">
        <img src={post.img || img1} className="relative w-full rounded-md" alt="Post Detail" />
        <div className="px-5 items-start flex flex-col gap-2">
          <h2 className="text-xl font-bold capitalize hover:text-[#F84D42] cursor-pointer">
            {post.title}
          </h2>
          <p className="text-left text-sm text-black/80 font-serif">{post.content}</p>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex flex-row gap-2 items-center">
          <div className="h-7 w-1 bg-red-600"></div>
          <h2 className="font-serif text-base font-bold">Recent News</h2>
        </div>
        <div className="flex flex-col space-y-3">
          {recentPosts.map((recentPost) => (
            <RecentCards key={recentPost.id} data={recentPost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
