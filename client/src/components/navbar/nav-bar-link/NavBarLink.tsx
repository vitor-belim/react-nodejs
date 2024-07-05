import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./NavBarLink.scss";

interface NavLinkProps {
  link: string;
  icon: IconProp;
  text: string;
  onClick?: () => void;
}

const NavBarLink = ({ link, icon, text, onClick = () => {} }: NavLinkProps) => {
  return (
    <Link onClick={onClick} to={link} className="nav-bar-link-container">
      <FontAwesomeIcon icon={icon} /> <span className="text">{text}</span>
    </Link>
  );
};

export default NavBarLink;
