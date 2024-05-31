import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListPosts from "./pages/posts/list/ListPosts";
import CreatePost from "./pages/posts/create/CreatePost";
import DetailsPost from "./pages/posts/details/DetailsPost";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <div className="links">
          <Link to="/">Home Page</Link>
          <Link to="/posts/new">Create a Post</Link>
        </div>
        <Routes>
          <Route exact path="/" Component={ListPosts} />
          <Route exact path="/posts/new" Component={CreatePost} />
          <Route exact path="/posts/:id" Component={DetailsPost} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
