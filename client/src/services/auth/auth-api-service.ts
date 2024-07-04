import { AxiosRequestConfig } from "axios";
import AuthStorageService from "./auth-storage-service";

class AuthApiService {
  private readonly API_AUTH_HEADER = "access-token";

  addAuthenticationHeaders<T>(
    options: AxiosRequestConfig<T>,
  ): AxiosRequestConfig<T> {
    let accessToken = AuthStorageService.getAccessToken();

    if (!accessToken) {
      return options;
    }

    return {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        [this.API_AUTH_HEADER]: accessToken,
      },
    };
  }

  handle401Error(preventRedirect = false) {
    AuthStorageService.clearAccessToken();

    if (!preventRedirect) {
      // redirect to /login with reference to redirect back to current path when authenticated
      window.location.href = "/login?from=" + window.location.pathname;
    }
  }
}

let authApiService = new AuthApiService();

export default authApiService;
