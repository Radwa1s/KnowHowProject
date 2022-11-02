import { getDocs } from "firebase/firestore";
import UserPostSummary from "./userPostSummary";
import { where } from "firebase/firestore";
import { query } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { colRef } from "../../firebase";
import { Link } from "react-router-dom";
export default function UserPostList() {
  const [post, setPost] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(colRef, where("AuthorID", "==", user.uid));
        getDocs(q).then((snap) => {
          const res = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setPost(res);
        });
      }
    });
  });

  return (
    <div>
      {post.map((post) => {
        return (
          <Link key={post.id}>
            <UserPostSummary post={post} />
          </Link>
        );
      })}
    </div>
  );
}
