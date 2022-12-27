import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, colRef, db, reqRef } from "../../firebase";
import imgRig from "../Group 5.png";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import { arrayUnion } from "../../firebase";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  orderByChild,
  query,
  onValue,
  get,
} from "firebase/database";
import downImg from "../../img/arrow-up-circle (1).svg";
import upImg from "../../img/arrow-up-circle.svg";
import { onSnapshot } from "firebase/firestore";
import { FieldValue, getFirestore } from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";

export default function PostSummary({ post, handleDelete }) {
  const [displayName, setDisplayName] = useState("");
  const [uid, setUserID] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [count, setCount] = useState(0);
  const [userLikes, setUserLikes] = useState([]);
  const [userDisLikes, setUserDisLikes] = useState([]);
  const [postVote, setPostVote] = useState([]);

  const [upisDisabled, setUpIsDisabled] = useState(false);
  const [downisDisabled, setDownIsDisabled] = useState(false);
  const [arr, setArr] = useState(post.data.upVote);

  const [email, setDisplayEmail] = useState("");
  // const quary = collection(db, "PostList", ` ${post.id}`, "upVote");
  // const [docs] = useCollectionData(quary);

  // const childRef = collection(colRef, `${post.id}`, "upVote");

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
        setDisplayEmail(user.email);
        setUserID(user.uid);

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
  }, []);
  const toggleDropdown = () => {
    isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true);
  };

  let userID = uid;
  let downvoters = [...post.data.downVote];
  const q = doc(db, "PostList", `${post.id}`);

  const handleDownClick = () => {
    if (downvoters.includes(userID) || upvoters.includes(userID)) {
      downvoters = downvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { downVote: downvoters }, { merge: true });
      // setDisLike(false);
      upvoters = upvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { upVote: upvoters }, { merge: true });
    }
    if (!downvoters.includes(userID || upvoters.includes(userID))) {
      downvoters.push(userID);
      setDoc(q, { downVote: downvoters }, { merge: true });
      // setDisLike(true);
      // setLike(false);
    }
  };
  // old upvoters doc.data.upvoters

  let upvoters = [...post.data.upVote];
  const handleUpClick = () => {
    if (upvoters.includes(userID)) {
      upvoters = upvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { upVote: upvoters }, { merge: true });
      // setLike(false);
    }
    if (downvoters.includes(userID)) {
      downvoters = downvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { downVote: downvoters }, { merge: true });
      upvoters.push(userID);
      setDoc(q, { upVote: upvoters }, { merge: true });
      // setDisLike(false);
      // setLike(true);
    }
    if (!upvoters.includes(userID)) {
      upvoters.push(userID);
      setDoc(q, { upVote: upvoters }, { merge: true });
      // setLike(true);
      // setDisLike(false);
    }

    // setDisLike(false);
    // setLike(true);
  };
  //true

  // setCount(count + 1);
  // setDownIsDisabled(false);
  // const q = doc(db, "PostList", `${post.id}`);

  // setLike(false);
  // } else if (downvoters.includes(userID)) {
  //   downvoters = downvoters.filter((ele) => {
  //     return ele != userID;
  //   });
  //   setDoc(q, { downVote: downvoters }, { merge: true });

  // if (setLike((current) => current) && !upvoters.includes(userID)) {
  //   //false
  //   console.log(upvoters);

  //   const q = doc(db, "PostList", `${post.id}`);
  //   upvoters.push(userID);
  //   setDoc(q, { upVote: upvoters }, { merge: true });
  //   setLike((current) => !current);
  // }

  // setCount(likes + dislikes);
  // setLike(true) ? setLike(false) : setLike(true);
  // console.log(userID);
  // setDisLike(false);
  // // setCount(count + 1);
  // setDownIsDisabled(false);
  // setUpIsDisabled(false);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  // const cityRef = doc(colRef);

  //   const pt = response.docs.map((doc) => ({
  //     data: doc.data(),
  //     id: doc.id,
  // let upvoters = [...post.data.upVote]; // old upvoters doc.data.upvoters

  // if (!upvoters.includes(userID)) {
  //   const q = doc(db, "PostList", `${post.id}`);
  //   upvoters.push(userID);
  //   setDoc(q, { upVote: upvoters }, { merge: true });
  // } else {
  //   // upvoters.splice(user.uid);
  //   // setLike(false);

  //   const q = doc(db, "PostList", `${post.id}`);
  //   upvoters = upvoters.filter((ele) => {
  //     return ele != userID;
  //   });

  //   setDoc(q, { upVote: upvoters }, { merge: true });
  // }
  //
  // }

  // console.log(arrayUnion(post.data.upVote));
  // console.log(pt);
  // });
  // });

  // collection(db, "PostList").doc(snap.id).get();
  // console.log(snap);

  // const childRef = collection(colRef, `${post.id}`, "upVote");

  // update({ upVote: user.uid });
  // console.log(childRef);
  // const updateNote = async (note) => {
  //   const noteRef = doc(colRef, `${post.id}`, "upVote");
  //   await update(noteRef, user.uid);
  // };
  // updateNote(note);

  // let obj = {
  //   key: value
  // }
  // let clone = {...obj}
  // clone.key = "bla"

  // const childRef = collection(reqRef, `${post.id}`, "upVote");

  // console.log(childRef);
  // var childRef = collection(db, "upVote").push(user.uid);
  // console.log(childRef);
  // const userLikes = likes.push(user.uid);
  // setUserLikes(userLikes);
  // console.log(likes);

  // likes.includes(user.uid) ? likes.splice(user.uid) : "";

  // setCount(userLikes + userDisLikes);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     // function getPosts() {
  //     if (user) {
  //       const querySnapshot = collection(db, "req", { id: doc.id });
  //       getDoc(querySnapshot)
  //         .then((response) => {
  //           const pt = response.docs.map((doc) => ({
  //             data: doc.data(),
  //             id: doc.id,
  //           }));
  //           console.log(pt);
  //         })
  //         .catch((err) => console.log(err.massage));
  //       // const docRef = doc(db, "req");
  //       // getDocs(docRef).then((resp) => console.log(resp));
  //     }
  //   });
  // }, []);

  const down = {
    backgroundColor: disLike ? "#FFA8A8 " : "",
    borderRadius: disLike ? "50%" : "",
    width: disLike ? "27px" : "",
    height: disLike ? "27px" : "",
  };

  const up = {
    backgroundColor: like ? "#50FF81 " : "",
    borderRadius: like ? "50%" : "",
    width: like ? "27px" : "",
  };

  return (
    <div className="">
      <div className="justify-between items-baseline flex border-t-[1px] w-full h-full ">
        <div className="flex  item-center mt-[28px] mb-[28px] ">
          <div className="flex">
            <div className="mr-[10px] ">
              <div className="flex ">
                <div>
                  <button
                    style={up}
                    className={
                      upvoters.includes(userID)
                        ? "bg-[#50FF81] border rounded-full"
                        : ""
                    }
                    disabled={upisDisabled}
                    onClick={handleUpClick}
                  >
                    <img
                      src={upImg}
                      className="w-[27px] h-[27px] rounded-full "
                    />
                  </button>
                  <div>
                    {/* {docs?.map((doc) => ( */}
                    <h6 className="text-[14px] font-bold text-center">
                      {upvoters.length - downvoters.length}
                    </h6>
                    {/* // ))} */}
                  </div>

                  <button
                    className={
                      downvoters.includes(userID)
                        ? "bg-[#FFA8A8] border rounded-full mt-2"
                        : "mt-2"
                    }
                    disabled={downisDisabled}
                    onClick={handleDownClick}
                  >
                    <img
                      src={downImg}
                      className="w-[27px] h-[27px] rounded-full  "
                    />
                  </button>
                </div>
                <div className="flex mt-[25px]">
                  <div>
                    <button
                      id="dropdownUserAvatarButton"
                      data-dropdown-toggle="dropdownAvatar"
                      className="  mx-3  text-sm bg-gray-800 rounded-full md:mr-0 "
                      type="button"
                    >
                      <img
                        className="w-[40px] h-[40px]  rounded-full bg-white"
                        src={imgRig}
                        alt="user photo"
                      />
                    </button>
                  </div>
                  <div>
                    <h1 className="ml-[10px] text-[14px] font-bold">
                      {displayName}
                    </h1>

                    <h1 className="text-[11px] ml-[10px]">
                      {post.data.CreateAt}
                      {/* 15/2/2022 */}
                    </h1>
                  </div>
                </div>
              </div>
              <div className=" ml-[45px]  ">
                <p>{post.data.Contant}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={toggleDropdown}
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            class="inline-flex items-center p-2   text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              class="w-5 h-6 "
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
          <div
            id="dropdownAvatar"
            className={
              (isDropdownOpen ? "absolute  " : "hidden") +
              " z-10  bg-gray rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            }
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="bottom"
          >
            <button
              className="py-1 block py-2 w-full px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={() => {
                handleDelete(post.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
