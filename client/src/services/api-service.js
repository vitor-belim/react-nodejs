import axios from "axios";
import AuthApiService from "./auth/auth-api-service";

class ApiService {
  #SERVER_URL = "http://localhost:3001";

  #handleError(error, options) {
    console.error("request error", error);

    if (error.response && error.response.status === 401) {
      AuthApiService.handle401Error(options.prevent401Redirect);
    }

    throw error;
  }

  get(path, options) {
    return axios
      .get(
        this.#SERVER_URL + path,
        AuthApiService.addAuthenticationHeaders(options),
      )
      .catch((error) => this.#handleError(error, options));
  }

  post(path, body, options) {
    return axios
      .post(
        this.#SERVER_URL + path,
        body,
        AuthApiService.addAuthenticationHeaders(options),
      )
      .catch((error) => this.#handleError(error, options));
  }

  delete(path, options) {
    return axios
      .delete(
        this.#SERVER_URL + path,
        AuthApiService.addAuthenticationHeaders(options),
      )
      .catch((error) => this.#handleError(error, options));
  }
}

let apiService = new ApiService();

export default apiService;
