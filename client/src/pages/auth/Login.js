import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AuthService from "../../services/auth-service";
import "./Authentication.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();

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
    AuthService.login(data)
      .then(() => {
        navigate(`/`);
      })
      .catch((error) => {
        setFieldError("result", error.response.data.message);
      });
  };

  return (
    <div className="auth-page">
      <h2>Sign in to your account</h2>
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
            <FontAwesomeIcon icon={faUser} /> Login
          </button>

          <ErrorMessage name="result" component="span" />

          <div className="alternative-auth-container">
            <span>Don't have an account?</span>
            <Link to="/sign-up">Sign Up Now</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
