import React from "react";
import "./Toggle.css";

const Toggle = ({ children }) => {
  return (
    <label className="toggle-container">
      {children || <input type="checkbox" />}
      <span className="slider"></span>
    </label>
  );
};

export default Toggle;
