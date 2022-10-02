import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../components/loader";
import { Link, useNavigate } from "react-router-dom";
import "./css.css";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Password do not match");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
        setIsLoading(false);
        toast.success("done.");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  const provider = new GoogleAuthProvider();

  const SignInWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("done");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.massage);
      });
  };
  return (
    <div>
      <ToastContainer />
      {isLoading && <Loader />}
      <form onSubmit={registerUser}>
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
          required
        />
        <button type="submit">Sign up</button>
        <div>
          <h6>already have account ?</h6>

          <Link to="/login">Login</Link>

          <button
            type="button"
            onClick={SignInWithGoogle}
            className="login-with-google-btn"
          >
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
