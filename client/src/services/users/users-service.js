import ApiService from "../api-service";

class UsersService {
  #PATH = "/users";

  getUser(id, options = {}) {
    return ApiService.get(`${this.#PATH}/${id}`, options);
  }

  getPostsByUser(id, options = {}) {
    return ApiService.get(`${this.#PATH}/${id}/posts`, options);
  }
}

const usersService = new UsersService();

export default usersService;
