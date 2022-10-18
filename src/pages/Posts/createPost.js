import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useState } from "react";
import { colRef, db } from "../../firebase";

function CreatePost() {
  const [contant, setContant] = useState("");
  const [id, setId] = useState("");

  getDocs(colRef)
    .then((snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      console.log(posts);
    })

    .catch((err) => console.log(err.massage));

  const handleAddPost = (e) => {
    const addPost = document.querySelector(".add");

    e.preventDefault();
    addDoc(colRef, {
      Title: addPost.title.value,
      Contant: addPost.contant.value,
      Author: addPost.author.value,
    });
    addPost.reset();
  };

  // const handleEditPost = () => {
  //   const docRef = doc(db, "PostList", { id: doc.id });
  //   updateDoc(docRef, contant)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err.massage);
  //     });
  // };

  return (
    <div>
      <form className="add">
        {/* <input placeholder="Title" name="title" /> */}
        <textarea placeholder="Contant" name="contant" required />
        {/* <input name="author" placeholder="Author" /> */}
        <button onClick={handleAddPost}>Create</button>
      </form>

      {/* <form>
        <label htmlFor="contant">Edit post</label>
        <input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <textarea
          placeholder="Contant"
          name="Contant"
          value={contant}
          required
          onChange={(e) => setContant(e.target.value)}
        />
        <button onClick={handleEditPost}>Edit</button>
      </form> */}
    </div>
  );
}

export default CreatePost;
