import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Reference } from "yup";
import FormPage from "../../../components/forms/form/FormPage";
import Spinner from "../../../components/spinner/Spinner";
import { AuthContext } from "../../../contexts/auth-context";
import ApiErrorResponse from "../../../models/api/api-error-response";
import AuthRequestsService from "../../../services/auth/auth-requests-service";

interface UpdatePasswordFormFields {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  result: string;
}

const UpdatePasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.checked && !auth.status) {
      navigate("/login?from=" + window.location.pathname);
    }
  }, [auth, navigate]);

  if (!auth.checked) {
    return null;
  }

  const initialValues: UpdatePasswordFormFields = {
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
      [Yup.ref("newPassword")] as Reference<string>[],
      "Confirm password must match new password",
    ),
    result: Yup.string(),
  });

  const onSubmit = (
    data: UpdatePasswordFormFields,
    formHelpers: FormikHelpers<UpdatePasswordFormFields>,
  ) => {
    setIsLoading(true);

    AuthRequestsService.updatePassword({
      password: data.oldPassword,
      newPassword: data.newPassword,
    })
      .then((apiResponse) => {
        formHelpers.resetForm();
        window.alert(apiResponse.message);
      })
      .catch((error: AxiosError<ApiErrorResponse>) => {
        formHelpers.setFieldError(
          "result",
          error.response?.data.message || error.message,
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <FormPage title="Change Password">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-container">
          <label>Old Password</label>
          <ErrorMessage name="oldPassword" component="span" className="error" />
          <Field
            id="old-password"
            name="oldPassword"
            type="password"
            placeholder="Your current password"
            autoComplete="off"
          />

          <label>New Password</label>
          <ErrorMessage name="newPassword" component="span" className="error" />
          <Field
            id="new-password"
            name="newPassword"
            type="password"
            placeholder="Your new password"
            autoComplete="off"
          />

          <label>Confirm Password</label>
          <ErrorMessage
            name="newPasswordConfirm"
            component="span"
            className="error"
          />
          <Field
            id="new-password-confirm"
            name="newPasswordConfirm"
            type="password"
            placeholder="Confirm your new password"
            autoComplete="off"
          />

          <button type="submit">
            <FontAwesomeIcon icon={faUser} /> Change Password
          </button>

          <ErrorMessage name="result" component="span" className="error" />

          <Spinner isLoading={isLoading} />
        </Form>
      </Formik>
    </FormPage>
  );
};

export default UpdatePasswordPage;
