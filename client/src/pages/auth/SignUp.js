import React from "react";
import AuthRequestsService from "../../services/auth/auth-requests-service";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Authentication from "./Authentication";

function SignUp() {
  const handleSignUp = ({ username, password }) =>
    AuthRequestsService.signUp({
      username,
      password,
    });

  return (
    <Authentication
      authRequest={handleSignUp}
      title="Create a new account"
      submitText="Sign Up"
      submitIcon={faUserPlus}
      otherAuthDescription="Already have an account?"
      otherAuthLinkPath="/login"
      otherAuthLinkText="Sign In Now"
    />
  );
}

export default SignUp;
