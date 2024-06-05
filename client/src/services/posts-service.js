import ApiService from "./api-service";

class PostsService {
  #PATH = "/posts";

  getAllPosts(options = {}) {
    return ApiService.get(this.#PATH, options);
  }

  createPost(post, options = {}) {
    return ApiService.post(this.#PATH, post, options);
  }

  getPost(id, options = {}) {
    return ApiService.get(`${this.#PATH}/${id}`, options);
  }
}

const postsService = new PostsService();

export default postsService;
