import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import imgRig from "../.././img/Group 5.png";

import { doc, setDoc } from "firebase/firestore";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import downImg from "../../img/arrow-up-circle (1).svg";
import upImg from "../../img/arrow-up-circle.svg";
import ShowOnLogin from "../../components/hiddenLinks/hiddenLinks";

export default function PostSummary({ post, handleDelete }) {
  const [displayName, setDisplayName] = useState("");
  const [uid, setUserID] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [email, setDisplayEmail] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setDisplayName(user.displayName);
        // setDisplayEmail(user.email);
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
    if (!downvoters.includes(userID)) {
      upvoters = upvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { upVote: upvoters }, { merge: true });
      downvoters.push(userID);
      setDoc(q, { downVote: downvoters }, { merge: true });
    } else {
      downvoters = downvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { downVote: downvoters }, { merge: true });
      upvoters = upvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { upVote: upvoters }, { merge: true });
    }
  };

  let upvoters = [...post.data.upVote];
  const handleUpClick = () => {
    if (!upvoters.includes(userID)) {
      downvoters = downvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { downVote: downvoters }, { merge: true });

      upvoters.push(userID);
      setDoc(q, { upVote: upvoters }, { merge: true });
      // setLike(true);
    } else {
      upvoters = upvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { upVote: upvoters }, { merge: true });
      downvoters = downvoters.filter((ele) => {
        return ele != userID;
      });
      setDoc(q, { downVote: downvoters }, { merge: true });
      // setLike(false);
    }
  };

  // useEffect(() => {
  //   // const docRef = collection(db, "PostList")doc(`${post.id}`);
  //   const auth = getAuth();
  //   const user = auth.currentUser.uid;
  //   // console.log(user);
  //   onSnapshot(doc(colRef, `${post.id}`), async (snapshot) => {
  //     const snap = await snapshot;
  //     let postData;
  //     let postId;
  //     let docData = snap.data();
  //     // console.log(userID);
  //     if (docData.upVote.includes(user)) {
  //       console.log(docData.upVote, upvoters);

  //       upvoters.push(user);
  //     }
  //     // snap.docChanges().map((doc) => {
  //     //   if (doc) {
  //     //     postId = doc.doc.id;
  //     //     if (postId === `${post.id}`) postData = doc.doc.data();
  //     //     console.log(postData);
  //     //     if (postData.upVote.includes(userID)) {
  //     //       console.log("Aha, upvoter found.");
  //     //       upvoters.push(userID);
  //     //     }
  //     //   }
  //     // })
  //     // console.log(await snapshot);
  //     // if (upvoters.includes(userID)) {
  //     //   ("bg-[#FFA8A8] border rounded-full mt-2");
  //     // }
  //   });
  // }, []);

  return (
    <ShowOnLogin>
      <div className="">
        <div className="justify-between items-baseline flex border-t-[1px] w-full h-full ">
          <div className="flex  item-center mt-[28px] mb-[28px] ">
            <div className="flex">
              <div className="mr-[10px] ">
                <div className="flex ">
                  <div>
                    <button
                      className={
                        upvoters.includes(userID)
                          ? "bg-[#50FF81] border rounded-full"
                          : ""
                      }
                      onClick={handleUpClick}
                    >
                      <img
                        src={upImg}
                        className="w-[27px] h-[27px] rounded-full "
                      />
                    </button>
                    <div>
                      <h6
                        className="text-[14px] font-bold text-center mb-1
                    "
                      >
                        {upvoters.length - downvoters.length}
                      </h6>
                    </div>

                    <button
                      className={
                        downvoters.includes(userID)
                          ? "bg-[#FFA8A8] border rounded-full "
                          : ""
                      }
                      onClick={handleDownClick}
                    >
                      <img
                        src={downImg}
                        className="w-[27px] h-[27px] rounded-full "
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
                        {/* {displayName} */}
                        {post.data.UserName}
                      </h1>

                      <h1 className="text-[11px] ml-[10px]">
                        {post.data.CreateAt}
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
              className="inline-flex items-center p-2   text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-5 h-6 "
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
              {/* <button
                className="py-1 block py-2 w-full px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={() => {
                  handleDelete(post.id);
                }}
              >
                Delete
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </ShowOnLogin>
  );
}
