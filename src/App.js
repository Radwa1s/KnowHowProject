import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Login from "./pages/login";
import Register from "./pages/register";
import ResetPassword from "./components/reset";
import Profle from "./pages/profle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/profile" element={<Profle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
