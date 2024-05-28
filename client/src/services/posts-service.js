import ApiService from "./api-service";

class PostsService {
  #URL = "/posts";

  getAllPosts = () => {
    return ApiService.get(this.#URL);
  };

  createPost = (post) => {
    return ApiService.post(this.#URL, post);
  };
}

export default new PostsService();
