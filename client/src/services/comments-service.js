import ApiService from "./api-service";

class CommentsService {
  #PATH = "/comments";

  getComments(postId, options = {}) {
    return ApiService.get(`${this.#PATH}/${postId}`, options);
  }

  addCommentToPost(postId, commentBody, options = {}) {
    return ApiService.post(`${this.#PATH}/${postId}`, { commentBody }, options);
  }

  deleteComment(commentId, options = {}) {
    return ApiService.delete(`${this.#PATH}/${commentId}`, options);
  }
}

let commentsService = new CommentsService();

export default commentsService;
