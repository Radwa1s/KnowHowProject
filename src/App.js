import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Login from "./pages/Auth/login";
import Register from "./pages//Auth/register";
import ResetPassword from "./components/reset";
import Profle from "./pages/profle";
import CreatePost from "./pages/Posts/createPost";
// import PostDetails from "./pages/Posts/postDetails";
import Navbar from "./pages/Navbar";
import PostList from "./pages/Posts/postList";
import PostSummary from "./pages/Posts/PostSummary";
import PostDetails from "./pages/Posts/postDetails";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Posts" element={<CreatePost />} />
          <Route path="/profile" element={<Profle />} />

          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/Post/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
