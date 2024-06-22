import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Spinner from "./components/spinner/Spinner";
import { AuthContext } from "./helpers/auth-context";
import { LoadingContext } from "./helpers/loading-context";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import PageNotFound from "./pages/PageNotFound";
import DetailsPost from "./pages/posts/details/DetailsPost";
import CreatePost from "./pages/posts/form/CreatePost";
import EditPost from "./pages/posts/form/EditPost";
import ListPosts from "./pages/posts/list/ListPosts";
import Profile from "./pages/users/Profile";
import UpdatePassword from "./pages/users/UpdatePassword";
import AuthRequestsService from "./services/auth/auth-requests-service";
import AuthStorageService from "./services/auth/auth-storage-service";
import "./App.css";
import "./Form.css";

function App() {
  const [auth, setAuth] = useState({
    user: null,
    status: false,
    checked: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!AuthStorageService.getAccessToken()) {
      setAuth((auth) => ({ ...auth, checked: true }));
      return;
    }

    setIsLoading(true);
    AuthRequestsService.refresh()
      .then((response) =>
        setAuth({ user: response.data.user, status: true, checked: true }),
      )
      .catch((_err) => {
        setAuth((auth) => ({ ...auth, checked: true }));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <BrowserRouter basename="/">
            <div className="content">
              <Routes>
                <Route exact path="/" Component={ListPosts} />
                <Route exact path="/posts/new" Component={CreatePost} />
                <Route exact path="/posts/:id" Component={DetailsPost} />
                <Route exact path="/posts/:id/edit" Component={EditPost} />
                <Route exact path="/sign-up" Component={SignUp} />
                <Route exact path="/login" Component={Login} />
                <Route exact path="/profile/:id" Component={Profile} />
                <Route
                  exact
                  path="/change-password"
                  Component={UpdatePassword}
                />
                <Route exact path="*" Component={PageNotFound} />
              </Routes>

              <Spinner isLoading={isLoading} size="full-page" />
            </div>

            <NavBar />
          </BrowserRouter>
        </AuthContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
