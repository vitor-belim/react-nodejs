import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Authentication from "../../components/auth/Authentication";
import AuthParams from "../../models/auth/auth-params";
import AuthRequestsService from "../../services/auth/auth-requests-service";

function LoginPage() {
  const handleLogin = (authParams: AuthParams) =>
    AuthRequestsService.login(authParams);

  return (
    <Authentication
      authRequest={handleLogin}
      title="Sign in to your account"
      submitText="Login"
      submitIcon={faUser}
      otherAuthDescription="Don't have an account?"
      otherAuthLinkPath="/sign-up"
      otherAuthLinkText="Sign Up Now"
    />
  );
}

export default LoginPage;
