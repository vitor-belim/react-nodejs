import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListPosts from "./pages/posts/list/ListPosts";
import CreatePost from "./pages/posts/create/CreatePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Link to="/">Home Page</Link>
        <Link to="/createpost">Create a Post</Link>
        <Routes>
          <Route exact path="/" Component={ListPosts} />
          <Route exact path="/createpost" Component={CreatePost} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
