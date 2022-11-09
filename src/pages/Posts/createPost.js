import { addDoc } from "firebase/firestore";
import { colRef } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onSnapshot } from "firebase/firestore";

function CreatePost() {
  // const [authUser, setAuthUser] = useState(null);
  // const [theContant, setTheContant] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setData(posts);
    });
  }, []);
  // function handleChanges(e) {
  //   setTheContant(e.target.value);
  //   e.preventDefault();
  // }

  // useEffect(() => {
  //   handleAddPost();
  // });

  // function handleAddPost() {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (theContant === "") {
  //         return;
  //       }
  //       // console.log(user);

  //       const auth = getAuth();
  //       const user = auth.currentUser;
  //       addDoc(colRef, {
  //         Contant: theContant,
  //         AuthorID: user.uid,
  //       }).then((response) => {
  //         console.log(response);
  //       });
  //       setTheContant("");
  //     }
  //   });
  useEffect(() => {
    handleAddPost();
  }, []);

  const handleAddPost = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const addPost = document.querySelector(".add");

        const user = auth.currentUser;

        addDoc(colRef, {
          Contant: addPost.contant.value,
          AuthorID: user.uid,
        });

        addPost.reset();
      }
    });
  };
  return (
    <div>
      <form className="add">
        <div className="relative flex  ">
          <textarea
            placeholder="Contant"
            name="contant"
            // defaultValue={theContant}
            // onChange={handleChanges}
            required
          />
          {/* <input name="author" placeholder="Author" /> */}
          <button
            // type="submit"
            onClick={(e) => {
              e.preventDefault();

              handleAddPost();
            }}
            className="text-black absolute   bg-lightGreen  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
          ></button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
