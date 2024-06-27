import ApiService from "../api-service";

class LikesService {
  #PATH = "/likes";

  like(postId, options = {}) {
    return ApiService.post(`${this.#PATH}/${postId}`, {}, options);
  }
}

const likesService = new LikesService();

export default likesService;
