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
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const logout = () => {
    AuthStorageService.clearAccessToken();
    setAuthenticated(false);
  };

  return (
    <div className="links">
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} /> Home
      </Link>

      {authenticated && (
        <>
          <Link to="/posts/new">
            <FontAwesomeIcon icon={faSquarePlus} /> Create Post
          </Link>
          <Link onClick={logout} to="/">
            <FontAwesomeIcon icon={faUser} /> Logout
          </Link>
        </>
      )}

      {!authenticated && (
        <Link to="/login">
          <FontAwesomeIcon icon={faUser} /> Login
        </Link>
      )}
    </div>
  );
}

export default NavBar;
