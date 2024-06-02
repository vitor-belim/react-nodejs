import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthService from "../../services/auth-service";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    result: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("The username is required"),
    password: Yup.string().required("The password is required"),
    result: Yup.string(),
  });

  const onSubmit = (data, { setFieldError }) => {
    AuthService.login(data)
      .then((response) => {
        console.log("Logged in!", response.data);
        navigate(`/`);
      })
      .catch((error) => {
        setFieldError("result", error.response.data.message);
      });
  };

  return (
    <div className="login-page">
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

          <button type="submit">Login</button>

          <ErrorMessage name="result" component="span" />
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
