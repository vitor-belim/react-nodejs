import { createContext } from "react";

export const AuthContext = createContext({
  auth: {
    user: null,
    status: false,
  },
  setAuth: (auth) => (this.auth = auth),
});
