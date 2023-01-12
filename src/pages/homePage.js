import React from "react";
import CreatePost from "./Posts/createPost";
import PostList from "./Posts/postList";

import Navbar from "./Navbar";
export default function HomePage() {
  return (
    <div>
      <div className="w-full">
        <Navbar />
      </div>

      <div className="ml-[4%] mb-[40px]  border-[1px] rounded-lg  w-[60%]  pl-[47px] pr-[47px] pt-[40px]  pb-[40px]">
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
}
