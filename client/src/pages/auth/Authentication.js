import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../helpers/auth-context";
import "./Authentication.css";

const Authentication = ({
  authRequest,
  title,
  submitText,
  submitIcon,
  otherAuthDescription,
  otherAuthLinkPath,
  otherAuthLinkText,
}) => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { setAuth } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
    result: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("The username is required"),
    password: Yup.string().min(4).required("The password is required"),
    result: Yup.string(),
  });

  const onSubmit = (data, { setFieldError }) => {
    authRequest(data)
      .then((response) => {
        setAuth({ user: response.data.user, status: true, checked: true });
        navigate(searchParams.get("from") || "/");
      })
      .catch((error) => {
        setFieldError("result", error.response.data.message);
      });
  };

  return (
    <div className="auth-page">
      <h2>{title}</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-container">
          <label>Username</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="username"
            className="input"
            name="username"
            placeholder="(Ex.: Jhon123...)"
            autoComplete="off"
          />

          <label>Password</label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="post-text"
            className="input"
            name="password"
            type="password"
            placeholder="(Ex.: Lorem ipsum...)"
            autoComplete="off"
          />

          <button type="submit">
            <FontAwesomeIcon icon={submitIcon} /> {submitText}
          </button>

          <ErrorMessage name="result" component="span" />

          <div className="alternative-auth-container">
            <span className="description">{otherAuthDescription}</span>
            <Link
              to={{
                pathname: otherAuthLinkPath,
                search: window.location.search,
              }}
            >
              {otherAuthLinkText}
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Authentication;
