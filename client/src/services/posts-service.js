import ApiService from "./api-service";

class PostsService {
  #URL = "/posts";

  getAllPosts = () => {
    return ApiService.get(this.#URL);
  };

  createPost = (post) => {
    return ApiService.post(this.#URL, post);
  };

  getPost(id) {
    return ApiService.get(`${this.#URL}/${id}`);
  }
}

const singleton = new PostsService();

export default singleton;
