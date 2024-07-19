import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  withBackButton?: boolean;
}

const Header = ({ title, withBackButton = true }: HeaderProps) => {
  let navigate = useNavigate();

  return (
    <div className="header">
      {withBackButton && (
        <div className="go-back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
      )}
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
