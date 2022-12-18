import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, colRef, db, reqRef } from "../../firebase";
import imgRig from "../Group 5.png";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDoc, collection, doc } from "firebase/firestore";
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
} from "firebase/database";
import downImg from "../../img/arrow-up-circle (1).svg";
import upImg from "../../img/arrow-up-circle.svg";

export default function PostSummary({ post, handleDelete, vote }) {
  const [displayName, setDisplayName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [count, setCount] = useState(0);
  const [userLikes, setUserLikes] = useState([]);
  const [userDisLikes, setUserDisLikes] = useState([]);
  const [postVote, setPostVote] = useState([]);

  const [upisDisabled, setUpIsDisabled] = useState(false);
  const [downisDisabled, setDownIsDisabled] = useState(false);

  const [email, setDisplayEmail] = useState("");
  const quary = collection(db, "PostList");
  const [docs] = useCollectionData(quary);

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
        setDisplayEmail(user.email);
        // setDisplayUid(user.uid);

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
  var dislikes = [];
  const handleDownClick = () => {
    setUpIsDisabled(false);
    setDisLike((current) => !current);
    if (setLike) {
      // setCount(likes + dislikes);
      setLike(false);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userdisLikes = dislikes.push(user.uid);
          setUserDisLikes(userdisLikes);
          console.log(dislikes);

          {
            dislikes.includes(user.uid)
              ? dislikes.splice(user.uid) && setDownIsDisabled(true)
              : "";
          }
        }
      });
    }
  };

  const handleUpClick = () => {
    setLike((current) => !current);
    // setCount(likes + dislikes);
    setDisLike(false);
    // setCount(count + 1);
    setDownIsDisabled(false);
    setUpIsDisabled(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const childRef = collection(colRef, `${post.id}`, "upVote");

        update({ upVote: user.uid });
        console.log(childRef);
        const updateNote = async (note) => {
          const noteRef = doc(colRef, `${post.id}`, "upVote");
          await update(noteRef, user.uid);
        };
        updateNote(note);
      }
    });
  };

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
                    <h6 className="text-[14px] font-bold text-center ">0</h6>
                    {/* // ))} */}
                  </div>

                  <button
                    style={down}
                    className="mt-2"
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
