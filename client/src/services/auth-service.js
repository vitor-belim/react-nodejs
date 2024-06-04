import ApiService from "./api-service";

class AuthService {
  #URL = "/auth";

  signUp = (data) => {
    return ApiService.post(`${this.#URL}/sign-up`, data);
  };

  login = (data) => {
    return ApiService.post(`${this.#URL}/login`, data);
  };
}

const singleton = new AuthService();

export default singleton;
