import { AxiosRequestConfig } from "axios";
import PostModel from "../../models/db-objects/post-model";
import Page from "../../models/pagination/page";
import ApiService from "../api/api-service";

class PostsService {
  private readonly PATH = "/posts";

  getAllPosts(options: AxiosRequestConfig<void> = {}) {
    return ApiService.get<void, Page<PostModel>>(this.PATH, options);
  }

  getPostsByUser(id: number, options: AxiosRequestConfig<void> = {}) {
    return ApiService.get<void, Page<PostModel>>(
      `${this.PATH}/by-user/${id}`,
      options,
    );
  }

  createPost(post: PostModel, options = {}) {
    return ApiService.post<PostModel, PostModel>(this.PATH, post, options);
  }

  getPost(id: number, options = {}) {
    return ApiService.get<void, PostModel>(`${this.PATH}/${id}`, options);
  }

  deletePost(id: number, options = {}) {
    return ApiService.delete<void, void>(`${this.PATH}/${id}`, options);
  }

  editPost(id: number, post: PostModel, options = {}) {
    return ApiService.put<PostModel, PostModel>(
      `${this.PATH}/${id}`,
      post,
      options,
    );
  }
}

const postsService = new PostsService();

export default postsService;
