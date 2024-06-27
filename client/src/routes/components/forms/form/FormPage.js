import React from "react";
import "./FormPage.css";

const FormPage = ({ title, children }) => {
  return (
    <div className="form-page">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default FormPage;
