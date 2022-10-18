import { createSlice } from "@reduxjs/toolkit";

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
