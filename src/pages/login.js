import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import "./css.css";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();
  const Loginuser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success("done.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.massage);
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
      {isLoading && <Loader />}
      <form onSubmit={Loginuser}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login </button>
        <div>
          <Link to="/reset">forget password?</Link>
        </div>
        <div>
          <h6>don't have account?</h6>
          <Link to="/register">Sign up </Link>
        </div>
        <button
          type="button"
          onClick={SignInWithGoogle}
          className="login-with-google-btn"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};
export default Login;
