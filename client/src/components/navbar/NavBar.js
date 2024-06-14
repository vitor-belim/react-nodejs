import React, { useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../helpers/auth-context";
import AuthStorageService from "../../services/auth/auth-storage-service";

function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);

  const logout = () => {
    AuthStorageService.clearAccessToken();
    setAuth({ user: null, status: false, checked: true });
  };

  return (
    <div className="links">
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} /> Home
      </Link>

      {auth.status && (
        <>
          <Link to="/posts/new">
            <FontAwesomeIcon icon={faSquarePlus} /> Create Post
          </Link>
          <Link onClick={logout} to="/">
            <FontAwesomeIcon icon={faUser} /> Logout from {auth.user.username}
          </Link>
        </>
      )}

      {!auth.status && (
        <Link to="/login">
          <FontAwesomeIcon icon={faUser} /> Login
        </Link>
      )}
    </div>
  );
}

export default NavBar;
