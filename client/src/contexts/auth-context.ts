import { createContext } from "react";
import AuthModel from "../models/auth/auth-model";

interface AuthContextModel {
  auth: AuthModel;
  setAuth: (auth: AuthModel) => void;
}

export const AuthContext = createContext<AuthContextModel>({
  auth: {
    status: false,
    checked: false,
  },
  setAuth: (_auth) => undefined,
});
