import React from "react";
import CreatePost from "./Posts/createPost";
import PostList from "./Posts/postList";
import ShowOnLogin, {
  ShowOnLogout,
} from "../components/hiddenLinks/hiddenLinks";
import SearchHome from "./searchHome";
import Navbar from "./Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="bg-bgImg mt-[150px] bg-contain bg-no-repeat w-full h-screen">
        <ShowOnLogin>
          <CreatePost />
          <PostList />
        </ShowOnLogin>
        <ShowOnLogout>
          <SearchHome />
        </ShowOnLogout>
      </div>
    </>
  );
}
