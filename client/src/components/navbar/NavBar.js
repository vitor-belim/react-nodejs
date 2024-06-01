import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <div className="links">
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} /> Home
      </Link>
      <Link to="/posts/new">
        <FontAwesomeIcon icon={faSquarePlus} /> Create Post
      </Link>
    </div>
  );
}

export default NavBar;
