import React, { ReactNode } from "react";
import "./FormPage.scss";
import Header from "../../header/Header";

interface FormPageProps {
  title: string;
  children: ReactNode;
  withBackButton?: boolean;
}

const FormPage = ({
  title,
  children,
  withBackButton = true,
}: FormPageProps) => {
  return (
    <div className="form-page">
      <Header title={title} withBackButton={withBackButton} />
      {children}
    </div>
  );
};

export default FormPage;
