import React from "react";
import { useState } from "react";
import { ref, child, push, update } from "firebase/database";
import { database } from "../../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { colRef, db } from "../../firebase";
import { useRef } from "react";
import { useEffect } from "react";
export default function UserPostSummary({ post }) {
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
  // const handleDelete = () => {

  //   const doc = db.collection("projects").doc();

  //   const observer = doc.onSnapshot((docSnapshot) => {
  //     console.log(docSnapshot);
  //   });
  // };

  // const handleDelete = () => {
  //   deleteDoc(doc(db, "projects", post.id));
  // };

  return (
    <div className="border-2">
      {edit === false ? (
        <>
          <h6>{post.Contant}</h6>
          <button className="bg-lightGreen m-5" onClick={() => setEdit(true)}>
            edit
          </button>
          <button className="bg-lightGreen m-5">Delete</button>
        </>
      ) : (
        <>
          {edit === true && (
            <>
              <form className="update">
                <textarea
                  defaultValue={post.contant}
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
