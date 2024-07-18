import {
  faAnglesLeft,
  faArrowRightFromBracket,
  faHouse,
  faMagnifyingGlass,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import AuthStorageService from "../../services/auth/auth-storage-service";
import SideBarLink from "./side-bar-link/SideBarLink";
import "./SideBar.scss";

const SIDE_MENU_CLOSED_STORAGE_KEY = "side-menu-closed";

const SideBar = () => {
  const [isClosed, setIsClosed] = useState(
    !!localStorage.getItem(SIDE_MENU_CLOSED_STORAGE_KEY),
  );
  const { auth, setAuth } = useContext(AuthContext);

  const logout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    AuthStorageService.clearAccessToken();
    setAuth({ status: false, checked: true });
  };

  function handleToggle() {
    setIsClosed(!isClosed);

    if (isClosed) {
      localStorage.removeItem(SIDE_MENU_CLOSED_STORAGE_KEY);
    } else {
      localStorage.setItem(SIDE_MENU_CLOSED_STORAGE_KEY, "closed");
    }
  }

  return (
    <div className={"side-bar" + (isClosed ? " closed" : "")}>
      {isClosed && (
        <style>{`
          :root {
            --side-bar-width: 68px;
          }
      `}</style>
      )}
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

      <button className="toggle-button" onClick={handleToggle}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
    </div>
  );
};

export default SideBar;
