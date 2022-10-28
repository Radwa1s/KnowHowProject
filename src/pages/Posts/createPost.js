import { onSnapshot, addDoc } from "firebase/firestore";
import { colRef, db } from "../../firebase";
import { getAuth } from "firebase/auth";

function CreatePost() {
  // getDocs(colRef)
  //   .then((snapshot) => {
  //     let posts = [];
  //     snapshot.docs.forEach((doc) => {
  //       posts.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log(posts);
  //   })

  //   .catch((err) => console.log(err.massage));

  onSnapshot(colRef, (snapshot) => {
    // console.log(snapshot);
    let posts = [];
    snapshot.docs.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    // console.log(posts);
  });

  const handleAddPost = (e) => {
    const addPost = document.querySelector(".add");

    e.preventDefault();
    const auth = getAuth();

    const user = auth.currentUser;

    addDoc(colRef, {
      // Title: addPost.title.value,

      Contant: addPost.contant.value,
      AuthorID: user.uid,
    });

    addPost.reset();
  };

  console.log(colRef);

  // Add a new document in collection "cities" with ID 'LA'
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
        <div class="relative flex  ">
          {/* <input placeholder="Title" name="title" /> */}
          <textarea placeholder="Contant" name="contant" required />
          {/* <input name="author" placeholder="Author" /> */}
          <button
            onClick={handleAddPost}
            class="text-black absolute   bg-lightGreen  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
          >
            Create
          </button>
        </div>
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
