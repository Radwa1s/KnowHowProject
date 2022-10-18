import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../redux/slice/authSlice";
import ShowOnLogin from "../components/hiddenLinks/hiddenLinks";
import { ShowOnLogout } from "../components/hiddenLinks/hiddenLinks";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CreatePost from "./Posts/createPost";
export default function Navbar() {
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        setDisplayName(user.displayName);

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
  const LogoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("done");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.massage);
      });
  };
  return (
    <div>
      <Link to="/"> Know-How</Link>
      <ShowOnLogout>
        <Link to="/Register">Register</Link>
        <Link to="/login">Login</Link>
        {/* <Link to="/Posts">
          <button>Create Post</button>
        </Link> */}
      </ShowOnLogout>

      <ShowOnLogin>
        <Link to="/profile">{displayName}</Link>

        <NavLink to="/" onClick={LogoutUser}>
          Logout
        </NavLink>
      </ShowOnLogin>
    </div>
  );
}
