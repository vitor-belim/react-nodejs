import {
  faArrowRightFromBracket,
  faHouse,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
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
      <div className="left">
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} /> Home
        </Link>

        {auth.status && (
          <>
            <Link to="/posts/new">
              <FontAwesomeIcon icon={faSquarePlus} /> Create Post
            </Link>
          </>
        )}
      </div>

      <div className="right">
        {auth.status ? (
          <>
            <h2>
              <i>Welcome {auth.user.username}!</i>
            </h2>
            <Link to={"/profile/" + auth.user.id}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            <Link onClick={logout} to="/">
              <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
            </Link>
          </>
        ) : (
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} /> Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
