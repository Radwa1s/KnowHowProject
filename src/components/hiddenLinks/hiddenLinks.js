import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { Loggedin } from "../../App";
// const ShowOnLogin = ({ children }) => {
//   const isLoggedin = useSelector(selectIsLoggedIn);
//   if (isLoggedin) {
//     return children;
//   }
//   return null;
// };

// export const ShowOnLogout = ({ children }) => {
//   const isLoggedin = useSelector(selectIsLoggedIn);
//   if (!isLoggedin) {
//     return children;
//   }
//   return null;
// };

const ShowOnLogin = ({ children }) => {
  // console.log(children);
  const isLoggedin = useSelector(selectIsLoggedIn);
  if (isLoggedin) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedin = useSelector(selectIsLoggedIn);
  if (!isLoggedin) {
    return children;
  }
  return null;
};

export default ShowOnLogin;
