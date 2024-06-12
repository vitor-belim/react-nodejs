import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPosts from "./pages/posts/list/ListPosts";
import CreatePost from "./pages/posts/create/CreatePost";
import DetailsPost from "./pages/posts/details/DetailsPost";
import NavBar from "./components/navbar/NavBar";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { AuthContext } from "./helpers/auth-context";
import { useEffect, useState } from "react";
import AuthRequestsService from "./services/auth/auth-requests-service";
import AuthStorageService from "./services/auth/auth-storage-service";

function App() {
  const [auth, setAuth] = useState({
    user: null,
    status: false,
  });

  useEffect(() => {
    if (AuthStorageService.getAccessToken()) {
      AuthRequestsService.refresh()
        .then((response) => setAuth({ user: response.data.user, status: true }))
        .catch((err) => err);
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter basename="/">
          <NavBar />
          <Routes>
            <Route exact path="/" Component={ListPosts} />
            <Route exact path="/posts/new" Component={CreatePost} />
            <Route exact path="/posts/:id" Component={DetailsPost} />
            <Route exact path="/sign-up" Component={SignUp} />
            <Route exact path="/login" Component={Login} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
