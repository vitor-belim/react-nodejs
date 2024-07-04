import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import AuthApiService from "./auth/auth-api-service";

class ApiService {
  private readonly SERVER_URL: string =
    process.env.REACT_APP_API_URL || "http://localhost:3001";

  get<D, T>(
    path: string,
    options: AxiosRequestConfig<D>,
    prevent401Redirect: boolean = false,
  ): Promise<T> {
    return this.request<D, T>(path, "GET", options, prevent401Redirect);
  }

  post<D, T>(
    path: string,
    data: D,
    options: AxiosRequestConfig<D>,
    prevent401Redirect: boolean = false,
  ): Promise<T> {
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
  ): Promise<T> {
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
  ): Promise<T> {
    return this.request<D, T>(path, "DELETE", options, prevent401Redirect);
  }

  private handleError(error: any, prevent401Redirect: boolean = false) {
    console.error("request error", error);

    if (error.response && error.response.status === 401) {
      AuthApiService.handle401Error(prevent401Redirect);
    }

    // Hack needed to avoid axios responses from being "T | void"
    if (error) {
      throw error;
    }

    return error;
  }

  private request<D, T>(
    path: string,
    method: Method,
    options: AxiosRequestConfig<D>,
    prevent401Redirect: boolean = false,
  ): Promise<T> {
    let url = this.SERVER_URL + path;
    const config: AxiosRequestConfig<D> = {
      ...AuthApiService.addAuthenticationHeaders<D>(options),
      url,
      method,
    };

    return axios
      .request<T, AxiosResponse<T>, D>(config)
      .then((response): T => response.data)
      .catch((error: any) => this.handleError(error, prevent401Redirect));
  }
}

let apiService = new ApiService();

export default apiService;
