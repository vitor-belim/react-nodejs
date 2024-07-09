import { AxiosRequestConfig } from "axios";
import ApiResponse from "../../models/api/api-response";
import AuthParams from "../../models/auth/auth-params";
import AuthResponse from "../../models/auth/auth-response";
import UpdatePasswordParams from "../../models/auth/update-password-params";
import ApiService from "../api-service";
import AuthStorageService from "./auth-storage-service";

class AuthRequestsService {
  private readonly PATH = "/auth";

  async signUp(data: AuthParams, options: AxiosRequestConfig<AuthParams> = {}) {
    return this.authenticate(data, options, `${this.PATH}/sign-up`);
  }

  async login(data: AuthParams, options: AxiosRequestConfig<AuthParams> = {}) {
    return this.authenticate(data, options, `${this.PATH}/login`);
  }

  async refresh(options: AxiosRequestConfig<void> = {}) {
    const apiResponse = await ApiService.get<void, AuthResponse>(
      `${this.PATH}/refresh`,
      options,
      true,
    );
    return this.storeAccessToken(apiResponse);
  }

  updatePassword(
    data: UpdatePasswordParams,
    options: AxiosRequestConfig<UpdatePasswordParams> = {},
  ) {
    return ApiService.post<UpdatePasswordParams, AuthResponse>(
      `${this.PATH}/update-password`,
      data,
      options,
    );
  }

  private async authenticate(
    data: AuthParams,
    options: AxiosRequestConfig<AuthParams> = {},
    path: string,
  ) {
    AuthStorageService.clearAccessToken();

    const apiResponse = await ApiService.post<AuthParams, AuthResponse>(
      path,
      data,
      options,
    );
    return this.storeAccessToken(apiResponse);
  }

  private storeAccessToken(apiResponse: ApiResponse<AuthResponse>) {
    AuthStorageService.setAccessToken(
      apiResponse.data.accessToken,
      apiResponse.data.expiration,
    );
    return apiResponse;
  }
}

let authRequestsService = new AuthRequestsService();

export default authRequestsService;
