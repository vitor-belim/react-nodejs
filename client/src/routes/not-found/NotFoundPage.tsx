import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";
import Header from "../../components/header/Header";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <Header title="Page Not Found" />
      <h2>
        Go back to <Link to="/">Home Page</Link>
      </h2>
    </div>
  );
};

export default NotFoundPage;
