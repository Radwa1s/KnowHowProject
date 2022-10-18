// //
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getFirestore } from "redux-firestore";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);

  async function getPost() {
    const docRef = doc(db, "PostList", id);
    getDoc(docRef).then((resp) => setPost(resp.data()));
  }

  return (
    <>
      <div>{"Title: " + post.Title}</div>
      <div>{"Content: " + post.Contant}</div>
      <div>{"Author: " + post.author}</div>
    </>
  );
}
