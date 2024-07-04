import React, { ReactNode } from "react";
import "./FormPage.css";

interface FormPageProps {
  title: string;
  children: ReactNode;
}

const FormPage = ({ title, children }: FormPageProps) => {
  return (
    <div className="form-page">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default FormPage;
