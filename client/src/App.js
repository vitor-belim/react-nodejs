import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      console.log(response);
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
