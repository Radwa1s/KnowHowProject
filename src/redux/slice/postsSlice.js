import { createSlice } from "@reduxjs/toolkit";
const initState = {
  post: [],
};
const postSlice = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("created project", action.post);
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("created project ERROR", action.err);
      return state;
    default:
      return state;
  }
};
export default postSlice;
