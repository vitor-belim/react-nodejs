import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Spinner from "./components/spinner/Spinner";
import { AuthContext } from "./contexts/auth-context";
import { LoadingContext } from "./contexts/loading-context";
import AuthModel from "./models/auth/auth-model";
import SpinnerSize from "./models/spinner-size";
import LoginPage from "./routes/pages/auth/LoginPage";
import SignUpPage from "./routes/pages/auth/SignUpPage";
import HomePage from "./routes/pages/home/HomePage";
import NotFoundPage from "./routes/pages/not-found/NotFoundPage";
import DetailsPostPage from "./routes/pages/posts/details/DetailsPostPage";
import CreatePostPage from "./routes/pages/posts/form/CreatePostPage";
import EditPostPage from "./routes/pages/posts/form/EditPostPage";
import SearchPage from "./routes/pages/search/SearchPage";
import ProfilePage from "./routes/pages/users/profile/ProfilePage";
import UpdatePasswordPage from "./routes/pages/users/update-password/UpdatePasswordPage";
import AuthRequestsService from "./services/auth/auth-requests-service";
import AuthStorageService from "./services/auth/auth-storage-service";
import "./App.scss";
import "./styles/breakpoint-mixins.scss";
import "./styles/buttons.scss";
import "./styles/form-elements.scss";

function App() {
  const [auth, setAuth] = useState<AuthModel>({
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
      .then((authResponse) =>
        setAuth({ user: authResponse.user, status: true, checked: true }),
      )
      .catch((_err) => {
        setAuth((auth) => ({ ...auth, checked: true }));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="app">
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <BrowserRouter basename="/">
            <div className="content">
              <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/posts/new" Component={CreatePostPage} />
                <Route path="/posts/:id" Component={DetailsPostPage} />
                <Route path="/posts/:id/edit" Component={EditPostPage} />
                <Route path="/sign-up" Component={SignUpPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/profile/:id" Component={ProfilePage} />
                <Route path="/search/:query?" Component={SearchPage} />
                <Route path="/change-password" Component={UpdatePasswordPage} />
                <Route path="*" Component={NotFoundPage} />
              </Routes>

              <Spinner isLoading={isLoading} size={SpinnerSize.FULL_PAGE} />
            </div>

            <NavBar />
          </BrowserRouter>
        </AuthContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
