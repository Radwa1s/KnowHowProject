import React from "react";

export default function PostSummary({ post }) {
  console.log(post);
  return (
    <div>
      <h1>{post.data.Title}</h1>
      <h6>{post.data.Contant}</h6>
      <h6>{post.data.Author}</h6>
    </div>
  );
}
