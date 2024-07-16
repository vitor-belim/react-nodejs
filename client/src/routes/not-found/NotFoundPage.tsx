import { faSadCry } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>
        Page Not Found <FontAwesomeIcon icon={faSadCry} />
      </h1>
      <h2>
        Go back to <Link to="/">Home Page</Link>
      </h2>
    </div>
  );
};

export default NotFoundPage;
