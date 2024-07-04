import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import AuthParams from "../../../models/auth/auth-params";
import AuthRequestsService from "../../../services/auth/auth-requests-service";
import Authentication from "../../components/auth/Authentication";

function SignUpPage() {
  const handleSignUp = (authParams: AuthParams) =>
    AuthRequestsService.signUp(authParams);

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

export default SignUpPage;
