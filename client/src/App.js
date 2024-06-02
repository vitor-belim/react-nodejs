import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPosts from "./pages/posts/list/ListPosts";
import CreatePost from "./pages/posts/create/CreatePost";
import DetailsPost from "./pages/posts/details/DetailsPost";
import NavBar from "./components/navbar/NavBar";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <NavBar />
        <Routes>
          <Route exact path="/" Component={ListPosts} />
          <Route exact path="/posts/new" Component={CreatePost} />
          <Route exact path="/posts/:id" Component={DetailsPost} />
          <Route exact path="/register" Component={Registration} />
          <Route exact path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
