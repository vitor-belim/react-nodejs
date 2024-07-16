import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/auth-context";
import { LoadingContext } from "../../contexts/loading-context";
import ApiErrorResponse from "../../models/api/api-error-response";
import ApiResponse from "../../models/api/api-response";
import AuthParams from "../../models/auth/auth-params";
import AuthResponse from "../../models/auth/auth-response";
import FormPage from "../forms/form/FormPage";
import "./Authentication.scss";

interface AuthenticationProps {
  authRequest: (authParams: AuthParams) => Promise<ApiResponse<AuthResponse>>;
  title: string;
  submitText: string;
  submitIcon: IconProp;
  otherAuthDescription: string;
  otherAuthLinkPath: string;
  otherAuthLinkText: string;
}

interface AuthenticationFormValues {
  username: string;
  password: string;
  result: string;
}

const Authentication = ({
  authRequest,
  title,
  submitText,
  submitIcon,
  otherAuthDescription,
  otherAuthLinkPath,
  otherAuthLinkText,
}: AuthenticationProps) => {
  const { setAuth } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const initialValues: AuthenticationFormValues = {
    username: "",
    password: "",
    result: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("The username is required"),
    password: Yup.string().min(4).required("The password is required"),
    result: Yup.string(),
  });

  const onSubmit = (
    data: AuthenticationFormValues,
    formHelpers: FormikHelpers<AuthenticationFormValues>,
  ) => {
    setIsLoading(true);

    authRequest(data)
      .then((apiResponse) => {
        setAuth({ user: apiResponse.data.user, status: true, checked: true });
        navigate(searchParams.get("from") || "/");
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
    <div className="authentication-container">
      <FormPage title={title}>
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
    </div>
  );
};

export default Authentication;
