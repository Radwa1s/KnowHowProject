import { getDocs } from "firebase/firestore";
import UserPostSummary from "./userPostSummary";
import { where } from "firebase/firestore";
import { query } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { colRef } from "../../firebase";
import { auth } from "../../firebase";

export default function UserPostList() {
  const [post, setPost] = useState([]);
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
  }, []);
  const handleDelete = async (id) => {
    await deleteDoc(doc(colRef, id));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleDelete();
      }
    });
  }, []);

  return (
    <div>
      {post.map((post) => {
        return <UserPostSummary post={post} handleDelete={handleDelete} />;
      })}
    </div>
  );
}
