class AuthStorageService {
  #SESSION_STORAGE_KEY = "access-token";

  getAccessToken() {
    return localStorage.getItem(this.#SESSION_STORAGE_KEY);
  }

  setAccessToken(accessToken) {
    localStorage.setItem(this.#SESSION_STORAGE_KEY, accessToken);
  }

  clearAccessToken() {
    localStorage.removeItem(this.#SESSION_STORAGE_KEY);
  }
}

let authStorageService = new AuthStorageService();

export default authStorageService;
