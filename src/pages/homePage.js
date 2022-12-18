import React from "react";
import CreatePost from "./Posts/createPost";
import PostList from "./Posts/postList";
import ShowOnLogin, {
  ShowOnLogout,
} from "../components/hiddenLinks/hiddenLinks";
import SearchHome from "./searchHome";
import Navbar from "./Navbar";
import { getAuth } from "firebase/auth";
export default function HomePage() {
  return (
    <div>
      <Navbar />

      <div className="ml-[4%] mb-[40px]  border-[1px] rounded-lg  w-[60%] pl-[47px] pr-[47px] pt-[40px]  pb-[40px]">
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
}
