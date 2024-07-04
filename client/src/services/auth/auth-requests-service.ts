import { AxiosRequestConfig } from "axios";
import AuthParams from "../../models/auth/auth-params";
import AuthResponse from "../../models/auth/auth-response";
import UpdatePasswordParams from "../../models/auth/update-password-params";
import ApiService from "../api-service";
import AuthStorageService from "./auth-storage-service";

class AuthRequestsService {
  private readonly PATH = "/auth";

  signUp(data: AuthParams, options: AxiosRequestConfig<AuthParams> = {}) {
    AuthStorageService.clearAccessToken();

    return ApiService.post<AuthParams, AuthResponse>(
      `${this.PATH}/sign-up`,
      data,
      options,
    ).then(this.storeAccessToken);
  }

  login(data: AuthParams, options: AxiosRequestConfig<AuthParams> = {}) {
    AuthStorageService.clearAccessToken();

    return ApiService.post<AuthParams, AuthResponse>(
      `${this.PATH}/login`,
      data,
      options,
    ).then(this.storeAccessToken);
  }

  refresh(options: AxiosRequestConfig<void> = {}) {
    return ApiService.get<void, AuthResponse>(
      `${this.PATH}/refresh`,
      options,
      true,
    ).then(this.storeAccessToken);
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

  private storeAccessToken(authResponse: AuthResponse) {
    AuthStorageService.setAccessToken(
      authResponse.accessToken,
      authResponse.expiration,
    );
    return authResponse;
  }
}

let authRequestsService = new AuthRequestsService();

export default authRequestsService;
