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
  const [isOpen, setIsOpen] = useState(false);

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
  ///////////////////////////
  // useEffect(() => {
  //   handleAddPost();
  // }, []);

  // const handleAddPost = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const addPost = document.querySelector(".add");

  //       const user = auth.currentUser;

  //       addDoc(colRef, {
  //         Contant: addPost.contant.value,
  //         AuthorID: user.uid,
  //         // CreateAt: toDate(),
  //       });

  //       addPost.reset();
  //     }
  //   });
  // };
  const handleInputStyle = () => {
    setIsOpen(true);
  };
  const input = {
    width: isOpen ? "725px" : "",
    height: isOpen ? "100px" : "",
  };
  return (
    <div>
      <form className="add">
        <div className="w-[850px]">
          <textarea
            placeholder="Share your experience...."
            name="contant"
            style={input}
            onClick={handleInputStyle}
            required
            className="bg-whiteGray ml-6 h-[50px]  w-[725px] .placeholder-whiteGray .placeholder-font-inter resize-none rounded-md border-gray-100"
          />
          {isOpen?
          <button
            // onClick={(e) => {
            //   e.preventDefault();

            //   handleAddPost();
            // }}
            className="text-black relative bg-lightGreen w-[100px] font-inter right-[14%] bottom-[22px]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
          >
            Post
          </button>}
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
