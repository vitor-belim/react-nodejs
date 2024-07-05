import {
  faArrowRightFromBracket,
  faHouse,
  faMagnifyingGlass,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import AuthStorageService from "../../services/auth/auth-storage-service";
import NavBarLink from "./nav-bar-link/NavBarLink";
import "./NavBar.scss";

function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);

  const logout = () => {
    AuthStorageService.clearAccessToken();
    setAuth({ status: false, checked: true });
  };

  return (
    <div className="nav-bar-container">
      <div className="column left">
        <NavBarLink link="/" icon={faHouse} text="Home" />

        {auth.status && (
          <NavBarLink
            link="/posts/new"
            icon={faSquarePlus}
            text="Create Post"
          />
        )}

        <NavBarLink link="/search" icon={faMagnifyingGlass} text="Search" />
      </div>

      <div className="column right">
        {auth.status && auth.user ? (
          <>
            <h2 className="welcome-msg">
              <i>Welcome {auth.user.username}!</i>
            </h2>
            <NavBarLink
              link={"/profile/" + auth.user.id}
              icon={faUser}
              text="Profile"
            />
            <NavBarLink
              onClick={logout}
              link="/"
              icon={faArrowRightFromBracket}
              text="Logout"
            />
          </>
        ) : (
          <NavBarLink link="/login" icon={faUser} text="Login" />
        )}
      </div>
    </div>
  );
}

export default NavBar;
