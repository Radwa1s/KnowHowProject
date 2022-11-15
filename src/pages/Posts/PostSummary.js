import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, colRef } from "../../firebase";
import imgRig from "../Group 5.png";

import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import upImg from "../up.png";
import downImg from "../down.png";
import { get, push } from "firebase/database";
export default function PostSummary({ post, handleDelete }) {
  const [displayName, setDisplayName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [count, setCount] = useState(0);
  const [userLikes, setUserLikes] = useState([]);
  const [upisDisabled, setUpIsDisabled] = useState(false);
  const [downisDisabled, setDownIsDisabled] = useState(false);

  const [email, setDisplayEmail] = useState("");
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
  var likes = [];
  const handleDownClick = () => {
    setUpIsDisabled(false);
    setDisLike((current) => !current);
    if (setLike) {
      setCount(count - 1);
      setLike(false);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userLikes = likes.push(user.uid);
          setUserLikes(userLikes);
          console.log(likes);
          {
            likes.includes(user.uid)
              ? likes.splice(user.uid) && setDownIsDisabled(true)
              : "";
          }
        }
      });
    }
  };

  const handleUpClick = () => {
    setLike((current) => !current);
    setCount(count + 1);

    setDisLike(false);
    setCount(count + 1);
    setDownIsDisabled(false);
    setUpIsDisabled(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userLikes = likes.push(user.uid);
        setUserLikes(userLikes);
        console.log(likes);
        {
          likes.includes(user.uid) ? likes.splice(user.uid) : "";
        }
      }
    });
  };
  console.log(likes);

  const down = {
    backgroundColor: disLike ? "#FFA8A8 " : "",
    borderRadius: disLike ? "50%" : "",
  };

  const up = {
    backgroundColor: like ? "#50FF81 " : "",
    borderRadius: like ? "50%" : "",
  };

  return (
    <div className="justify-between items-baseline flex border-t-[1px] w-[800px] h-[300px] ">
      <div className="flex items-center mt-[28px]">
        <div className="flex   ">
          <div className="mr-[10px]">
            <button style={up} disabled={upisDisabled} onClick={handleUpClick}>
              <img src={upImg} className="w-[29px] h-[29px] rounded-full " />
            </button>
            <h6 className="text-[14px] font-bold text-center ">{count}</h6>

            <button
              style={down}
              disabled={downisDisabled}
              onClick={handleDownClick}
            >
              <img
                src={downImg}
                className="w-[29px] h-[29px] rounded-full mt-[5px] "
              />
            </button>
            {/* <h6 className="text-[11px] font-bold text-center mt-[-4px]">
              {decrease}
            </h6> */}
          </div>

          <div className="flex ">
            <div>
              <button
                onClick={toggleDropdown}
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
              <h1 className="ml-[10px] text-[14px] font-bold">{displayName}</h1>
              <h1 className="text-[11px] ml-[10px]">15/8/2022</h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={toggleDropdown}
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          class="inline-flex  items-center p-2 font-[2px]  text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            (isDropdownOpen ? "visible float-left mt-[10px] " : "hidden") +
            " z-10 w-[200px] bg-gray rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          }
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="bottom"
        >
          <div className="py-1 block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            <button
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
