import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.massge);
      });
  };

  return (
    <form onSubmit={resetPassword}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Reset password</button>
    </form>
  );
};
export default ResetPassword;
