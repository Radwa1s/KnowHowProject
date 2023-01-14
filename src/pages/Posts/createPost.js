import { addDoc } from "firebase/firestore";
import { colRef } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import imgRig from "../.././img/Group 5.png";
import ShowOnLogin from "../../components/hiddenLinks/hiddenLinks";

function CreatePost() {
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
    width: isOpen ? "97%" : "",
    height: isOpen ? "150px" : "",
  };
  return (
    <ShowOnLogin>
      <div className="flex">
        <div className="mt-[6px] ml-[-9px]">
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

        <form className="add w-full">
          <div className=" mb-[28px] w-full ">
            <textarea
              placeholder="Share your experience...."
              name="contant"
              style={input}
              onClick={handleInputStyle}
              required
              className="bg-whiteGray  w-[97%] ml-3 h-[50px] outline-0 outline-none focus:border-white  .placeholder-whiteGray .placeholder-font-inter resize-none rounded-md border-gray-200"
            />
            {isOpen ? (
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    handleAddPost();
                  }}
                  className="text-black relative bg-lightGreen w-[100px] font-inter  left-[85%] bottom-[50px]  focus:ring-4 focus:outline-none  font-sm rounded-lg text-sm px-4 py-2 "
                >
                  Post
                </button>
                <button
                  onClick={(e) => {
                    setIsOpen(false);
                  }}
                  className="text-black hover:bg-gray-100 relative bg-white border-gray-200 border-2 w-[100px] font-inter  left-[60%] bottom-[50px]  focus:ring-4 focus:outline-none  font-sm rounded-lg text-sm px-4 py-2 "
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
    </ShowOnLogin>
  );
}

export default CreatePost;
