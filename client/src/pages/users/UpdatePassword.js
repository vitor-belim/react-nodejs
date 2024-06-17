import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import AuthRequestsService from "../../services/auth/auth-requests-service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/auth-context";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.checked && !auth.status) {
      navigate("/login?from=" + window.location.pathname);
    }
  }, [auth]);

  if (!auth.checked) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
    result: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(4)
      .required("The current password is required"),
    newPassword: Yup.string().min(4).required("The new password is required"),
    newPasswordConfirm: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Confirm password must match new password",
    ),
    result: Yup.string(),
  });

  const onSubmit = (data, { setFieldError, resetForm }) => {
    AuthRequestsService.updatePassword({
      password: data.oldPassword,
      newPassword: data.newPassword,
    })
      .then((response) => {
        resetForm();
        window.alert(response.data.message);
      })
      .catch((error) => {
        setFieldError("result", error.response.data.message);
      });
  };

  return (
    <div className="auth-page">
      <h2>Change password</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-container">
          <label>Old Password</label>
          <ErrorMessage name="oldPassword" component="span" />
          <Field
            id="old-password"
            className="input"
            name="oldPassword"
            type="password"
            placeholder="Your current password"
            autoComplete="off"
          />

          <label>New Password</label>
          <ErrorMessage name="newPassword" component="span" />
          <Field
            id="new-password"
            className="input"
            name="newPassword"
            type="password"
            placeholder="Your new password"
            autoComplete="off"
          />

          <label>Confirm Password</label>
          <ErrorMessage name="newPasswordConfirm" component="span" />
          <Field
            id="new-password-confirm"
            className="input"
            name="newPasswordConfirm"
            type="password"
            placeholder="Confirm your new password"
            autoComplete="off"
          />

          <button type="submit">
            <FontAwesomeIcon icon={faUser} /> Update Password
          </button>

          <ErrorMessage name="result" component="span" />
        </Form>
      </Formik>
    </div>
  );
};

export default UpdatePassword;
