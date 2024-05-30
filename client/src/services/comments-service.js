import ApiService from "./api-service";

class CommentsService {
  #URL = "/comments";

  getComments = (postId) => {
    return ApiService.get(`${this.#URL}/${postId}`);
  };

  addCommentToPost = (postId, comment) => {
    return ApiService.post(`${this.#URL}/${postId}`, { commentBody: comment });
  };
}

const singleton = new CommentsService();

export default singleton;
