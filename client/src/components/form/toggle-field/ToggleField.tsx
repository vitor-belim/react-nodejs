import { Field } from "formik";
import React from "react";
import "./ToggleField.css";

interface ToggleFieldProps {
  name: string;
}

const ToggleField = ({ name }: ToggleFieldProps) => {
  return (
    <label className="toggle-container">
      <Field
        type="checkbox"
        className="checkbox"
        name={name}
        autoComplete="off"
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleField;
