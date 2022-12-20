import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Register from "./pages//Auth/register";
import ResetPassword from "./components/reset";
import Profle from "./pages/user/profle";
import CreatePost from "./pages/Posts/createPost";
// import PostDetails from "./pages/Posts/postDetails";

import PostDetails from "./pages/Posts/postDetails";
import SearchHome from "./pages/searchHome";
import Login from "./pages/Auth/login";
import { selectIsLoggedIn } from "./redux/slice/authSlice";
function App() {
  // console.log(Loggedin, "login");
  return (
    <>
      <div>
        <Routes>
          {selectIsLoggedIn === false ? (
            <Route exact path="/home" element={<SearchHome />} />
          ) : (
            <Route exact path="/" element={<HomePage />} />
          )}
          <Route exact path="/home" element={<SearchHome />} />

          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profle />} />

          <Route path="/reset" element={<ResetPassword />} />
          {/* <Route path="/Post/:id" element={<PostDetails />} /> */}
        </Routes>
      </div>
    </>
  );
}
export const Loggedin = window.localStorage.getItem("Loggedin");

export default App;
