import { AxiosRequestConfig } from "axios";
import UserModel from "../../models/user-model";
import ApiService from "../api-service";

class UsersService {
  private readonly PATH = "/users";

  getUser(id: number, options: AxiosRequestConfig<void> = {}) {
    return ApiService.get<void, UserModel>(`${this.PATH}/${id}`, options);
  }
}

const usersService = new UsersService();

export default usersService;
