import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../redux/slice/authSlice";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function Profle() {
  const [displayName, setDisplayName] = useState("");
  const [email, setDisplayEmail] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);

        setDisplayName(user.displayName);
        setDisplayEmail(user.email);

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

  return (
    <div>
      <h1>{displayName}</h1>
      <h2>{email}</h2>
    </div>
  );
}
