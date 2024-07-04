import {
  faArrowRightFromBracket,
  faHouse,
  faMagnifyingGlass,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context";
import AuthStorageService from "../../services/auth/auth-storage-service";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);

  const logout = () => {
    AuthStorageService.clearAccessToken();
    setAuth({ status: false, checked: true });
  };

  return (
    <div className="links">
      <div className="left">
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} /> <span>Home</span>
        </Link>

        {auth.status && (
          <>
            <Link to="/posts/new">
              <FontAwesomeIcon icon={faSquarePlus} /> <span>Create Post</span>
            </Link>
          </>
        )}

        <Link to="/search">
          <FontAwesomeIcon icon={faMagnifyingGlass} /> <span>Search</span>
        </Link>
      </div>

      <div className="right">
        {auth.status && auth.user ? (
          <>
            <h2>
              <i>Welcome {auth.user.username}!</i>
            </h2>
            <Link to={"/profile/" + auth.user.id}>
              <FontAwesomeIcon icon={faUser} /> <span>Profile</span>
            </Link>
            <Link onClick={logout} to="/">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
              <span>Logout</span>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} /> <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
