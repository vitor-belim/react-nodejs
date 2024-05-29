import axios from "axios";

class ApiService {
  #SERVER_URL = "http://localhost:3001";

  get(url) {
    return axios.get(this.#SERVER_URL + url);
  }

  post(url, body) {
    return axios.post(this.#SERVER_URL + url, body);
  }
}

const singleton = new ApiService();

export default singleton;
