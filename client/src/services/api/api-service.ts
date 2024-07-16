import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import ApiErrorResponse from "../../models/api/api-error-response";
import ApiResponse from "../../models/api/api-response";
import AuthApiService from "../auth/auth-api-service";

class ApiService {
  private readonly SERVER_URL: string =
    process.env.REACT_APP_API_URL || "http://localhost:3001";

  get<D, T>(
    path: string,
    options: AxiosRequestConfig<D>,
    prevent401Redirect: boolean = false,
  ): Promise<ApiResponse<T>> {
    return this.request<D, T>(path, "GET", options, prevent401Redirect);
  }

  post<D, T>(
    path: string,
    data: D,
    options: AxiosRequestConfig<D>,
    prevent401Redirect: boolean = false,
  ): Promise<ApiResponse<T>> {
    return this.request<D, T>(
      path,
      "POST",
      { ...options, data },
      prevent401Redirect,
    );
  }

  put<D, T>(
    path: string,
    data: D,
    options: AxiosRequestConfig<D>,
    prevent401Redirect: boolean = false,
  ): Promise<ApiResponse<T>> {
    return this.request<D, T>(
      path,
      "PUT",
      { ...options, data },
      prevent401Redirect,
    );
  }

  delete<D, T>(
    path: string,
    options: AxiosRequestConfig<D>,
    prevent401Redirect: boolean = false,
  ): Promise<ApiResponse<T>> {
    return this.request<D, T>(path, "DELETE", options, prevent401Redirect);
  }

  private handleError(
    error: AxiosError<ApiErrorResponse>,
    prevent401Redirect: boolean = false,
  ) {
    console.error("request error", error);

    if (error.response && error.response.status === 401) {
      AuthApiService.handle401Error(prevent401Redirect);
    }

    return error;
  }

  private async request<D, T>(
    path: string,
    method: Method,
    options: AxiosRequestConfig<D>,
    prevent401Redirect: boolean = false,
  ): Promise<ApiResponse<T>> {
    let url = this.SERVER_URL + path;
    const config: AxiosRequestConfig<D> = {
      ...AuthApiService.addAuthenticationHeaders<D>(options),
      url,
      method,
    };

    try {
      const response = await axios.request<T, AxiosResponse<ApiResponse<T>>, D>(
        config,
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error, prevent401Redirect);
    }
  }
}

let apiService = new ApiService();

export default apiService;
