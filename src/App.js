import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages//Auth/register";
import ResetPassword from "./components/reset";
import Profle from "./pages/user/profle";

import Login from "./pages/Auth/login";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />

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
