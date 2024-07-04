import { faSadCry } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="page-not-found">
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
