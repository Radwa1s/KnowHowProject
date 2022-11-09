import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import PostSummary from "./PostSummary";

export default function PostList() {
  const [post, setPost] = useState([]);
  // useEffect(() => {
  //   getPosts();
  // }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // function getPosts() {
      if (user) {
        const querySnapshot = collection(db, "PostList");
        getDocs(querySnapshot)
          .then((response) => {
            const pt = response.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }));
            setPost(pt);
          })
          .catch((err) => console.log(err.massage));
      }
    });
  }, []);

  return (
    <div>
      {post.map((post) => {
        // console.log(post);
        return (
          <Link to={"/Post/" + post.id} key={post.id}>
            <PostSummary post={post} />
          </Link>
        );
      })}
    </div>
  );
}
