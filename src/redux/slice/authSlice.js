import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser;
// console.log(user);
// localStorage.setItem(user, JSON.stringify(user));
// export const userLocalStorage = window.localStorage.setItem("user", user);
// localStorage.setItem("currentUser", JSON.stringify(user));

const initialState = {
  isLoggedin: false,
  email: null,
  userName: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
      const { email, userName, userID } = action.payload;
      state.isLoggedin = true;
      state.email = email;
      state.userName = userName;

      state.userID = userID;
      // localStorage.setItem("currentUser", JSON.stringify(state.email));
      // window.localStorage.setItem("user", state.userName);
      // window.localStorage.setItem("user", state.userID);
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedin = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      // console.log(state.isLoggedin);
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedin;
export const selectUserName = (state) => state.auth.userName;

export const selectEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.userID;

export default authSlice.reducer;
