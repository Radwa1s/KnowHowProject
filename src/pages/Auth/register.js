import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "../css.css";
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import imgRig from "../Group 5.png";
import logo from "../Group.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

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

    console.log(auth, email, password, userName);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: userName,
        });
        // const user = userCredential.user;
        // console.log(user);
        navigate("/profile");
        window.location.reload();
        window.localStorage.setItem("Loggedin", true);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const provider = new GoogleAuthProvider();

  const SignInWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // console.log(result);
        // toast.success("done");
        navigate("/");
        window.localStorage.setItem("Loggedin", true);
      })
      .catch((error) => {
        toast.error(error.massage);
      });
  };
  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-900 w-full h-full"></div>

      <section className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="grid  max-w-screen    lg:grid-cols-12">
          <div className="place-self-center lg:col-span-6">
            <div className="bg-gray-50 dark:bg-gray-900 m-4 ml-[-20px]">
              <Link to="/">
                <img src={logo} />
              </Link>
            </div>
            <img
              className="hidden mx-auto mt-[70px] lg:flex"
              src={imgRig}
              alt="illustration"
            />
          </div>
          <div className="w-full mt-[25px] p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:max-w-xl lg:col-span-6 sm:p-8">
            <h1 className="mb-9 text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Create a new account
            </h1>

            <div className="space-y-3">
              <Link to="/">
                <button
                  onClick={SignInWithGoogle}
                  className="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_13183_10121)">
                      <path
                        d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                        fill="#3F83F8"
                      />
                      <path
                        d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13183_10121">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Sign up with Google
                </button>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
              <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                or
              </div>
              <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <form className="mt-4 space-y-6 sm:mt-6" onSubmit={registerUser}>
              <div className=" w-full ">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-3 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="full-name"
                    className="block mb-3 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. Bonnie Green"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-3 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm password"
                    className="block mb-3 mt-3 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
              </div>
              <Link to="/">
                <button
                  type="submit"
                  className="w-full text-balck bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
              </Link>
              <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Register;
