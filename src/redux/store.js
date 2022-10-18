import { configureStore, combineReducers } from "@reduxjs/toolkit";

import postReducer from "./slice/postsSlice";

import authReducer from "./slice/authSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
