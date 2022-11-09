import React from "react";
import { useState } from "react";
import { ref, child, push, update } from "firebase/database";
import { database } from "../../firebase";
import { doc, getDoc, deleteDoc, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { colRef } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { get } from "firebase/database";
export default function UserPostSummary({ post, handleDelete }) {
  console.log(post);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState();
  const handleUpdatePost = (e) => {
    setEdit(false);
  };

  //   const updatePost = document.querySelector(".update");
  //   updatePost.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     const CR = doc(db, "projects", post.Contant);
  //     setUpdate(CR);
  //     updateDoc(CR, {
  //       Contant: update,
  //     }).then(updatePost.reset());
  //   });
  // };
  // useEffect(() => {
  //   handleDelete();
  // });

  // const handleDelete = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       getDocs(colRef).then((response) => {
  //         const pt = response.docs.filter(() => ({
  //           id: post.id,
  //         }));
  //         const q = query(colRef, where("id", "==", post.id));
  //         console.log(q);
  //       });
  //     }
  //   }).catch((err) => console.log(err.massage));
  // };
  // const user = auth.currentUser;

  // const q = query(colRef, where("AuthorID" == user.uid));
  // getDocs(q).then((snap) => {
  //   const res = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  //   console.log(res);
  // });

  // })
  // }

  // }
  // })

  // const res = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  // console.log(res);
  // deleteDoc(docRef);

  // deleteDoc(doc(db, "PostList", post));

  // useEffect(() => {
  //   // function handleDelete() {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const q = query(colRef, where("id", "==", post.id));
  //       get(q).then((querySnapshot) => {
  //         console.log(querySnapshot);
  //       });
  //     }
  //   });
  //   // }
  // }, []);

  return (
    <div className="border-2">
      {edit === false ? (
        <>
          <h6>{post.Contant}</h6>
          <button className="bg-lightGreen m-5" onClick={() => setEdit(true)}>
            edit
          </button>
          <button
            className=" delete bg-lightGreen m-5"
            type="submit"
            onClick={() => {
              handleDelete(post.id);
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <>
          {edit === true && (
            <>
              <form className="update">
                <textarea
                  defaultValue={post.Contant}
                  type="text"
                  name="contant"
                  onChange={(e) => {
                    setUpdate(e.target.defaultValue);
                  }}
                />
                <button onClick={handleUpdatePost}>Update</button>

                <button
                  type="button"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </>
      )}

      {/* {edit === true && (
        <>
          <form>
            <input
              placeholder="update"
              type="text"
              onChange={(e) => setUpdate(e.target.value)}
            />
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              Update
            </button>
          </form>
        </>
      )} */}
    </div>
  );
}
