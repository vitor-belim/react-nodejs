import { AxiosRequestConfig } from "axios";
import PostModel from "../../models/post-model";
import UserModel from "../../models/user-model";
import ApiService from "../api-service";

class UsersService {
  private readonly PATH = "/users";

  getUser(
    id: number,
    options: AxiosRequestConfig<void> = {},
  ): Promise<UserModel> {
    return ApiService.get<void, UserModel>(`${this.PATH}/${id}`, options);
  }

  getPostsByUser(
    id: number,
    options: AxiosRequestConfig<void> = {},
  ): Promise<PostModel[]> {
    return ApiService.get<void, PostModel[]>(
      `${this.PATH}/${id}/posts`,
      options,
    );
  }
}

const usersService = new UsersService();

export default usersService;
