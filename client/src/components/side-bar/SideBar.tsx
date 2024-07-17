import {
  faArrowRightFromBracket,
  faHouse,
  faMagnifyingGlass,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { MouseEvent, useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import AuthStorageService from "../../services/auth/auth-storage-service";
import SideBarLink from "./side-bar-link/SideBarLink";
import "./SideBar.scss";

const SideBar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const logout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    AuthStorageService.clearAccessToken();
    setAuth({ status: false, checked: true });
  };

  return (
    <div className="side-bar">
      <div className="top">
        <SideBarLink link="/" icon={faHouse} text="Home" />
        <SideBarLink link="/search" icon={faMagnifyingGlass} text="Search" />
        {auth.status && auth.user && (
          <>
            <SideBarLink
              link="/posts/new"
              icon={faSquarePlus}
              text="Create Post"
            />
            <SideBarLink
              link={"/profile/" + auth.user.id}
              icon={faUser}
              text="Profile"
            />
          </>
        )}
      </div>

      <div className="bottom">
        <h2 className="welcome-msg">
          <i>Welcome {auth.user?.username || "human"}!</i>
        </h2>

        {auth.status && auth.user ? (
          <>
            <SideBarLink
              onClick={logout}
              link="/logout"
              icon={faArrowRightFromBracket}
              text="Logout"
            />
          </>
        ) : (
          <SideBarLink link="/login" icon={faUser} text="Login" />
        )}
      </div>
    </div>
  );
};

export default SideBar;
