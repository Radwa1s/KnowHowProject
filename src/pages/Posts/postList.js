import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { auth, db } from "../../firebase";
import PostSummary from "./PostSummary";
import { deleteDoc, doc } from "firebase/firestore";
import { colRef } from "../../firebase";

export default function PostList() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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

  // const handleDelete = async (id) => {
  //   await deleteDoc(doc(colRef, id));
  // };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       handleDelete();
  //     }
  //   });
  // }, []);

  return (
    <div>
      {post.map((post) => {
        // console.log(post);
        return (
          // <Link key={post.id}>
          <PostSummary key={post.id} post={post} />
          // </Link>
          // handleDelete={handleDelete}
        );
      })}
    </div>
  );
}
