class AuthStorageService {
  #SESSION_STORAGE_KEY = "access-token";

  getAccessToken() {
    return sessionStorage.getItem(this.#SESSION_STORAGE_KEY);
  }

  setAccessToken(accessToken) {
    sessionStorage.setItem(this.#SESSION_STORAGE_KEY, accessToken);
  }

  clearAccessToken() {
    sessionStorage.removeItem(this.#SESSION_STORAGE_KEY);
  }
}

let authStorageService = new AuthStorageService();

export default authStorageService;
