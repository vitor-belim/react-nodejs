import ApiService from "../api-service";
import AuthStorageService from "./auth-storage-service";

class AuthRequestsService {
  #PATH = "/auth";

  #storeAccessToken(res) {
    AuthStorageService.setAccessToken(
      res.data.accessToken,
      res.data.expiration,
    );
    return res;
  }

  signUp(data, options = {}) {
    AuthStorageService.clearAccessToken();
    return ApiService.post(`${this.#PATH}/sign-up`, data, options).then(
      this.#storeAccessToken,
    );
  }

  login(data, options = {}) {
    AuthStorageService.clearAccessToken();
    return ApiService.post(`${this.#PATH}/login`, data, options).then(
      this.#storeAccessToken,
    );
  }

  refresh(options = {}) {
    return ApiService.get(`${this.#PATH}/refresh`, {
      ...options,
      prevent401Redirect: true,
    }).then(this.#storeAccessToken);
  }

  updatePassword(data, options = {}) {
    return ApiService.post(`${this.#PATH}/update-password`, data, options);
  }
}

let authRequestsService = new AuthRequestsService();

export default authRequestsService;
