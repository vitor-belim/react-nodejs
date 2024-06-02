import ApiService from "./api-service";

class AuthService {
  #URL = "/auth";

  register = (data) => {
    return ApiService.post(`${this.#URL}/register`, data);
  };

  login = (data) => {
    return ApiService.post(`${this.#URL}/login`, data);
  };
}

const singleton = new AuthService();

export default singleton;
