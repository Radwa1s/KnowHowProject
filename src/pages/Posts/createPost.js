import { onSnapshot, addDoc } from "firebase/firestore";
import { colRef } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useState } from "react";

function CreatePost() {
  const [data, setData] = useState([]);

  onSnapshot(colRef, (snapshot) => {
    let posts = [];
    snapshot.docs.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    setData(posts);
  });

  const handleAddPost = (e) => {
    const addPost = document.querySelector(".add");

    e.preventDefault();
    const auth = getAuth();

    const user = auth.currentUser;

    addDoc(colRef, {
      Contant: addPost.contant.value,
      AuthorID: user.uid,
    });

    addPost.reset();
  };

  return (
    <div>
      <form className="add">
        <div className="relative flex  ">
          <textarea placeholder="Contant" name="contant" required />
          {/* <input name="author" placeholder="Author" /> */}
          <button
            onClick={handleAddPost}
            className="text-black absolute   bg-lightGreen  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
