import { AxiosRequestConfig } from "axios";
import CommentModel from "../../models/comment-model";
import ApiService from "../api-service";

class CommentsService {
  #PATH = "/comments";

  getComments(postId: number, options: AxiosRequestConfig<void> = {}) {
    return ApiService.get<void, CommentModel[]>(
      `${this.#PATH}/${postId}`,
      options,
    );
  }

  addCommentToPost(
    postId: number,
    commentBody: string,
    options: AxiosRequestConfig<CommentModel> = {},
  ) {
    return ApiService.post<CommentModel, CommentModel>(
      `${this.#PATH}/${postId}`,
      { commentBody } as CommentModel,
      options,
    );
  }

  deleteComment(commentId: number, options: AxiosRequestConfig<void> = {}) {
    return ApiService.delete<void, void>(`${this.#PATH}/${commentId}`, options);
  }
}

let commentsService = new CommentsService();

export default commentsService;
