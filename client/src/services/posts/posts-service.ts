import { AxiosRequestConfig } from "axios";
import PostModel from "../../models/db-objects/post-model";
import PageI from "../../models/pagination/page-i";
import ApiService from "../api-service";

class PostsService {
  private readonly PATH = "/posts";

  getAllPosts(
    search: Record<string, string> | null = null,
    options: AxiosRequestConfig<void> = {},
  ) {
    let url = this.PATH;

    if (search) {
      url += "?" + new URLSearchParams(search).toString();
    }

    return ApiService.get<void, PageI<PostModel>>(url, options);
  }

  getPostsByUser(id: number, options: AxiosRequestConfig<void> = {}) {
    return ApiService.get<void, PageI<PostModel>>(
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
