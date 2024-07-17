import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBarLink.scss";

interface SideBarLinkProps {
  link: string;
  icon: IconProp;
  text: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const SideBarLink = ({
  link,
  icon,
  text,
  onClick = () => {},
}: SideBarLinkProps) => {
  let location = useLocation();
  const path = location.pathname;

  return (
    <Link
      onClick={onClick}
      to={link}
      className={"side-bar-link-container" + (path === link ? " active" : "")}
    >
      <FontAwesomeIcon icon={icon} /> <span className="text">{text}</span>
    </Link>
  );
};

export default SideBarLink;
