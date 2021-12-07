import './App.css';

// Import Components
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import Hooks from React
import {useState, useEffect} from "react"

// Import Router 6 Component (Route -> Route, Switch -> Routes)
import { Route, Routes, Link, useNavigate } from "react-router-dom";

/////////////////////////
// Style Object
/////////////////////////
const h1 = {
  textAlign: "center",
  margin: "10px"
}

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App() {

  ///////////////////////////
  // State and Other Variables
  ///////////////////////////

  const navigate = useNavigate()

  const url = "https://seirp-masonite-blog-backend.herokuapp.com/blogs/";

  // state to hold list of posts
  const [posts, setPosts] = useState([]);

  // an empty todo for initializing the create form
  const nullPost = {
    title: "",
    author: "",
    article: ""
  }

  const [targetPost, setTargetPost] = useState(nullPost)

  //////////////
  // Functions
  //////////////
  const getPosts = async () => {
    const response = fetch(url)
    const data = await (await response).json()
    setPosts(data)
  }

  // function to add posts
  const addPosts = async (newPost) => {
    const response = await fetch(url, {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPost)
    })

    console.log(response)
    //update the list of posts
    getPosts()
  };

  // to select a post to edit
  const getTargetPost = (post) => {
    setTargetPost(post);
    navigate("/edit");
  };

  // update post for handlesubmit prop
  const updatePost = async (post) => {
    await fetch(url + post.id, {
      method: "put",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(post),
    });

    //update posts
    getPosts();
  };

  const deletePost = async (post) => {
    await fetch(url + post.id, {
      method: "delete"
    })

    getPosts()
    navigate('/')
  }

  //////////////
  // useEffects
  //////////////

  useEffect(() => {
    getPosts()
  }, [])

  //////////////////////////
  // Returned JSX
  //////////////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Blog</h1>
      <Link to="/new"><button style={button}>Create New Post</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts} />}/>
        <Route path="/post/:id" element={<SinglePost 
          posts={posts} 
          edit={getTargetPost}
          deletePost={deletePost}
        />} />
        <Route path="/new" element={<Form 
          initialPost={nullPost}
          handleSubmit={addPosts}
          buttonLabel="Create Post"
        />} />
        <Route path="/edit" element={<Form
          initialPost={targetPost}
          handleSubmit={updatePost}
          buttonLabel="Update Post"
        />} />
      </Routes>
    </div>
  );
}

export default App;
