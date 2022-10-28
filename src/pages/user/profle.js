import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import { useEffect, useState } from "react";
import app, { auth, colRef } from "../../firebase";
import imgRig from "../Group 5.png";
import logo from "../Group.png";
import { Link } from "react-router-dom";
import { doc, getDocs, onSnapshot } from "firebase/firestore";
import UserPostSummary from "./userPostSummary";
import { where } from "firebase/firestore";
import { query } from "firebase/firestore";
export default function Profle() {
  const [displayName, setDisplayName] = useState("");
  const [email, setDisplayEmail] = useState("");
  const [uid, setDisplayUid] = useState("");
  const [userPosts, setUserPosts] = useState({});
  const [post, setPost] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);

        setDisplayName(user.displayName);
        setDisplayEmail(user.email);
        setDisplayUid(user.uid);

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,

            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(colRef, where("AuthorID", "==", uid));
    getDocs(q).then((snap) => {
      const res = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // console.log(res);
      setPost(res);
    });
  });
  // console.log(post);

  // const auth = getAuth();
  // const user = auth.currentUser;
  // if (user.uid) {
  //   const uid = user.uid;
  //   console.log(user.uid);
  // } else {
  // }

  return (
    <div className=" bg-whiteGray w-full h-full">
      <section className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="grid">
          <nav className="bg-whiteGray m-[30px] border-gray-200  dark:bg-gray-900">
            <Link to="/">
              <img src={logo} />
            </Link>
          </nav>
          <div className="grid grid-cols-2 divide-x-0">
            <div className=" p-6 ml-[50px] h-[600px]  bg-white rounded-lg shadow dark:bg-gray-800 sm:max-w-xl  sm:p-8">
              <div className="flex justify-center">
                <img
                  src={imgRig}
                  className="w-[240px] h-[240px] rounded-full border-4 "
                />
              </div>
              <h1 className="flex justify-center p-5">{displayName}</h1>
              <h2>{email}</h2>
              <Link to={"/userPost/" + post.id} key={post.id}>
                <UserPostSummary post={post} />
              </Link>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
