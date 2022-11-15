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

      <div className="ml-[4%] border-[1px] p-[22px] w-[60%]">
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
}
