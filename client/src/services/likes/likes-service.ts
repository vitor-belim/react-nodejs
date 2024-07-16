import { AxiosRequestConfig } from "axios";
import LikeModel from "../../models/db-objects/like-model";
import ApiService from "../api/api-service";

class LikesService {
  private readonly PATH = "/likes";

  toggleLike(postId: number, options: AxiosRequestConfig<void> = {}) {
    return ApiService.post<void, LikeModel | null>(
      `${this.PATH}/${postId}`,
      undefined,
      options,
    );
  }
}

const likesService = new LikesService();

export default likesService;
