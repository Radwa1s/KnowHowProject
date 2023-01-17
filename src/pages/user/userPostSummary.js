import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { colRef } from "../../firebase";
import imgRig from "../.././img/Group 5.png";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import { query, where } from "firebase/firestore";

export default function UserPostSummary({ post, handleDelete }) {
  console.log(post);
  const [edit, setEdit] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [update, setUpdate] = useState();
  const handleUpdatePost = (e) => {
    setEdit(false);
  };
  const dropdown = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
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

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
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
  return (
    <div>
      {edit === false ? (
        <>
          <div className="">
            <div className="justify-between  items-baseline flex border-t-[1px] w-full h-full  ">
              <div className="flex  item-center mt-[28px] mb-[28px] ">
                <div className="flex">
                  <div className=" ">
                    <div className="flex">
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

                      <div>
                        <h1 className="ml-[10px] text-[14px] font-bold">
                          {displayName}
                        </h1>
                        <h1 className="text-[11px] ml-[10px]">
                          {post.CreateAt}
                        </h1>
                      </div>
                    </div>
                    <div className=" ml-[15px]  mt-[20px]">
                      <p>{post.Contant}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={dropdown}
                  id="dropdownMenuIconButton"
                  data-dropdown-toggle="dropdownDots"
                  className="inline-flex items-center p-2  text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                    (isOpen ? "  absolute" : "hidden") +
                    " z-10  bg-gray   rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
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
                  <button
                    className="py-1 block py-2 w-full px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => setEdit(true)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
        </>
      ) : (
        <>
          {edit === true && (
            <>
              <div className="flex border-t-[1px] ">
                <form>
                  <textarea
                    defaultValue={post.Contant}
                    type="text"
                    name="contant"
                    onChange={(e) => {
                      setUpdate(e.target.defaultValue);
                    }}
                    className=" mt-[20px]  bg-whiteGray  h-[160px]  w-[725px] .placeholder-whiteGray .placeholder-font-inter resize-none rounded-md border-gray-100"
                  />
                  <button
                    onClick={handleUpdatePost}
                    className="text-black relative bg-lightGreen  w-[75px] font-inter bottom-[52px] left-[550px]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className="text-black relative bg-lightGreen w-[75px] font-inter bottom-[52px] left-[560px]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
