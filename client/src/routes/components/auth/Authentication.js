import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../../contexts/auth-context";
import "./Authentication.css";
import { LoadingContext } from "../../../contexts/loading-context";
import FormPage from "../forms/form/FormPage";

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
  const { setIsLoading } = useContext(LoadingContext);

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
    setIsLoading(true);

    authRequest(data)
      .then((response) => {
        setAuth({ user: response.data.user, status: true, checked: true });
        navigate(searchParams.get("from") || "/");
      })
      .catch((error) => {
        setFieldError("result", error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <FormPage title={title}>
      <h2>{title}</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-container">
          <label>Username</label>
          <ErrorMessage name="username" component="span" className="error" />
          <Field
            id="username"
            name="username"
            placeholder="(Ex.: Jhon123...)"
            autoComplete="off"
          />

          <label>Password</label>
          <ErrorMessage name="password" component="span" className="error" />
          <Field
            id="post-text"
            name="password"
            type="password"
            placeholder="(Ex.: Lorem ipsum...)"
            autoComplete="off"
          />

          <button type="submit">
            <FontAwesomeIcon icon={submitIcon} /> {submitText}
          </button>

          <ErrorMessage name="result" component="span" className="error" />

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
    </FormPage>
  );
};

export default Authentication;
