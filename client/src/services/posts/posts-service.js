import ApiService from "../api-service";

class PostsService {
  #PATH = "/posts";

  getAllPosts(search = null, options = {}) {
    let url = this.#PATH;

    if (search) {
      url += "?" + new URLSearchParams(search).toString();
    }

    return ApiService.get(url, options);
  }

  createPost(post, options = {}) {
    return ApiService.post(this.#PATH, post, options);
  }

  getPost(id, options = {}) {
    return ApiService.get(`${this.#PATH}/${id}`, options);
  }

  deletePost(id, options = {}) {
    return ApiService.delete(`${this.#PATH}/${id}`, options);
  }

  editPost(id, post, options = {}) {
    return ApiService.put(`${this.#PATH}/${id}`, post, options);
  }
}

const postsService = new PostsService();

export default postsService;
