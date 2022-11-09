import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Register from "./pages//Auth/register";
import ResetPassword from "./components/reset";
import Profle from "./pages/user/profle";
import CreatePost from "./pages/Posts/createPost";
// import PostDetails from "./pages/Posts/postDetails";

import PostDetails from "./pages/Posts/postDetails";
import UserPostDetails from "./pages/user/userPostDetails";
import SearchHome from "./pages/searchHome";
import Login from "./pages/Auth/login";
function App() {
  // console.log(Loggedin, "login");
  return (
    <>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={Loggedin ? <HomePage /> : <SearchHome />}
          />

          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/Posts" element={<CreatePost />} /> */}
          <Route path="/profile" element={<Profle />} />

          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/Post/:id" element={<PostDetails />} />
          {/* <Route path="/userPost/:id" element={<UserPostDetails />} /> */}
        </Routes>
      </div>
    </>
  );
}
export const Loggedin = window.localStorage.getItem("Loggedin");

export default App;
