import { AxiosRequestConfig } from "axios";
import CommentModel from "../../models/db-objects/comment-model";
import Page from "../../models/pagination/page";
import ApiService from "../api/api-service";

class CommentsService {
  #PATH = "/comments";

  getComments(postId: number, options: AxiosRequestConfig<void> = {}) {
    return ApiService.get<void, Page<CommentModel>>(
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
