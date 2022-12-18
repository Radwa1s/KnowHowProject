import { addDoc } from "firebase/firestore";
import { colRef } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import imgRig from "../Group 5.png";

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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      useEffect(() => {
        handleAddPost();
      }, []);
    }
  });

  const handleAddPost = () => {
    const addPost = document.querySelector(".add");

    const user = auth.currentUser;

    addDoc(colRef, {
      Contant: addPost.contant.value,
      AuthorID: user.uid,
      upVote: [],
      downVote: [],
      CreateAt: new Intl.DateTimeFormat("en-GB", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date()),
    });

    addPost.reset();
  };
  const handleInputStyle = () => {
    setIsOpen(true);
  };
  const input = {
    width: isOpen ? "700px" : "",
    height: isOpen ? "150px" : "",
  };
  return (
    <div className="flex ">
      <div className="mt-[6px]">
        <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          className="flex mx-3  text-sm bg-gray-800 rounded-full md:mr-0 "
          type="button"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-[38px] h-[38px] rounded-full bg-white"
            src={imgRig}
            alt="user photo"
          />
        </button>
      </div>

      <form className="add">
        <div className="w-[200px] mb-[28px] ">
          <textarea
            placeholder="Share your experience...."
            name="contant"
            style={input}
            onClick={handleInputStyle}
            required
            className="bg-whiteGray ml-3 h-[50px] outline-0 outline-none focus:border-white w-[700px] .placeholder-whiteGray .placeholder-font-inter resize-none rounded-md border-gray-200"
          />
          {isOpen ? (
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  handleAddPost();
                }}
                className="text-black relative bg-lightGreen w-[100px] font-inter  left-[600px] bottom-[50px]  focus:ring-4 focus:outline-none  font-sm rounded-lg text-sm px-4 py-2 "
              >
                Post
              </button>
              <button
                onClick={(e) => {
                  setIsOpen(false);
                }}
                className="text-black hover:bg-gray-100 relative bg-white border-gray-200 border-2 w-[100px] font-inter  left-[395px] bottom-[50px]  focus:ring-4 focus:outline-none  font-sm rounded-lg text-sm px-4 py-2 "
              >
                Cancel
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
