import ApiService from "../api-service";
import AuthStorageService from "./auth-storage-service";

class AuthRequestsService {
  #PATH = "/auth";

  signUp(data, options = {}) {
    AuthStorageService.clearAccessToken();
    return ApiService.post(`${this.#PATH}/sign-up`, data, options).then(
      (res) => {
        AuthStorageService.setAccessToken(res.data.accessToken);
        return res;
      },
    );
  }

  login(data, options = {}) {
    AuthStorageService.clearAccessToken();
    return ApiService.post(`${this.#PATH}/login`, data, options).then((res) => {
      AuthStorageService.setAccessToken(res.data.accessToken);
      return res;
    });
  }

  refresh(options = {}) {
    return ApiService.get(`${this.#PATH}/refresh`, {
      ...options,
      prevent401Redirect: true,
    });
  }

  updatePassword(data, options = {}) {
    return ApiService.post(`${this.#PATH}/update-password`, data, options);
  }
}

let authRequestsService = new AuthRequestsService();

export default authRequestsService;
