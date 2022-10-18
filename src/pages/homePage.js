//
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreatePost from "./Posts/createPost";
// import PostDetails from "./Posts/postDetails";
import PostList from "./Posts/postList";
import ShowOnLogin from "../components/hiddenLinks/hiddenLinks";

export default function HomePage() {
  return (
    <div>
      <ShowOnLogin>
        <CreatePost />
      </ShowOnLogin>
      <PostList />{" "}
    </div>
  );
}
