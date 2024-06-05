import AuthStorageService from "./auth-storage-service";
import ApiService from "../api-service";

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
}

let authRequestsService = new AuthRequestsService();

export default authRequestsService;
