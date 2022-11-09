import { getDocs } from "firebase/firestore";
import UserPostSummary from "./userPostSummary";
import { where } from "firebase/firestore";
import { query } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { colRef } from "../../firebase";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

export default function UserPostList() {
  const [post, setPost] = useState([]);
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
        return (
          <Link key={post.id}>
            <UserPostSummary post={post} handleDelete={handleDelete} />
          </Link>
        );
      })}
    </div>
  );
}
