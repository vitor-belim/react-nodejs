import AuthStorageService from "./auth-storage-service";

class AuthApiService {
  #API_AUTH_HEADER = "access-token";

  addAuthenticationHeaders(options) {
    let accessToken = AuthStorageService.getAccessToken();

    if (!accessToken) {
      return options;
    }

    return {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        [this.#API_AUTH_HEADER]: accessToken,
      },
    };
  }

  handle401Error() {
    AuthStorageService.clearAccessToken();
    // redirect to /login and redirect back to current path when authenticated
    window.location.href = "/login?from=" + window.location.pathname;
  }
}

let authApiService = new AuthApiService();

export default authApiService;
