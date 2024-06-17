import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AuthRequestsService from "../../services/auth/auth-requests-service";
import Authentication from "./Authentication";

function Login() {
  const handleLogin = ({ username, password }) =>
    AuthRequestsService.login({
      username,
      password,
    });

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

export default Login;
