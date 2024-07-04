import { AxiosRequestConfig } from "axios";
import ApiService from "../api-service";

class LikesService {
  private readonly PATH = "/likes";

  like(postId: number, options: AxiosRequestConfig<void> = {}) {
    return ApiService.post(`${this.PATH}/${postId}`, null, options);
  }
}

const likesService = new LikesService();

export default likesService;
