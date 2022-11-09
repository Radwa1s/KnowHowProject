import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../redux/slice/authSlice";
import ShowOnLogin from "../components/hiddenLinks/hiddenLinks";
import { ShowOnLogout } from "../components/hiddenLinks/hiddenLinks";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Loggedin } from "../App";
import imgRig from "./Group 5.png";

import logo from "./Group.png";
export default function Navbar() {
  const [displayName, setDisplayName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setDisplayEmail] = useState("");
  const [useruid, setUserUid] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
        setDisplayEmail(user.email);
        setUserUid(user.uid);

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
    // });
  }, []);

  const LogoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("done");
        navigate("/");
        window.localStorage.removeItem("Loggedin");
      })
      .catch((error) => {
        toast.error(error.massage);
      });
  };
  const toggleDropdown = () => {
    isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true);
  };
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/">
          <img src={logo} />
        </Link>
        {/* <ShowOnLogout> */}
        {!Loggedin ? (
          <>
            <div>
              <Link to="/login">
                {" "}
                <button
                  type="button"
                  className="text-black font-inter bg-white  focus:ring-1 focus:ring-lightGreen font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2   focus:outline-none "
                >
                  Login
                </button>
              </Link>
              <Link to="/Register">
                <button
                  type="button"
                  className="text-black font-inter bg-lightGreen hover:bg-lightGreen focus:ring-1 focus:ring-lightGreen font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:lightGreen dark:hover:lightGreen focus:outline-none dark:focus:lightGreen"
                >
                  Sign up
                </button>
              </Link>
            </div>
          </>
        ) : (
          /* </ShowOnLogout> */

          /* <ShowOnLogin> */
          <>
            <button
              onClick={toggleDropdown}
              id="dropdownUserAvatarButton"
              data-dropdown-toggle="dropdownAvatar"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 "
              type="button"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={imgRig}
                alt="user photo"
              />
            </button>

            <div
              id="dropdownAvatar"
              className={
                (isDropdownOpen
                  ? "visible absolute right-[69px] top-16"
                  : "hidden") +
                " z-10 w-[200px] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              }
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="bottom"
            >
              <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                <Link to={"/profile"}>{displayName}</Link>;
                <div className="font-medium truncate">{email}</div>
              </div>

              <div className="py-1 block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                <NavLink to="/" onClick={LogoutUser}>
                  Logout
                </NavLink>
              </div>
            </div>
            {/* </ShowOnLogin> */}
          </>
        )}
      </div>
    </nav>
  );
}
