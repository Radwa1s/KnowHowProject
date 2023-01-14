import React from "react";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import imgRig from "../.././img/Group 5.png";

import UserPostList from "./userPostList";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../Navbar";
import CreatePost from "../Posts/createPost";

export default function Profle() {
  const [displayName, setDisplayName] = useState("");
  const [email, setDisplayEmail] = useState("");

  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
  }, []);

  return (
    <>
      <div className="mt-[10px]">
        <Navbar />
      </div>

      <div>
        <section className=" h-screen ">
          <div>
            <div className="grid grid-cols-11 divide-x-0 w-full h-full">
              <div className="ml-[6%] col-span-7 border-[1px] mb-[40px]   rounded-lg  pl-[47px] pr-[47px] pt-[40px]  pb-[40px]  ">
                <CreatePost />

                <UserPostList />
              </div>
              <div className="col-span-4 ">
                <div className="   h-[300px]   w-[300px] bg-white rounded-lg ml-8 border-[1px] ">
                  <div className="flex justify-center w-[298px] max-h-[100px] bg-whiteGray rounded-lg">
                    <img
                      src={imgRig}
                      className="w-[120px] mt-[35px]   h-[120px] rounded-full border-2 "
                    />
                  </div>

                  <h1 className="flex justify-center text-2xl font-regular mt-[60px]  pt-2 font-inter">
                    {displayName}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
