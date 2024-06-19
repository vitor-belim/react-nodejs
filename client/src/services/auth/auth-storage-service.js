class AuthStorageService {
  #SESSION_STORAGE_KEY = "access-token";

  getAccessToken() {
    let parsedSession;

    try {
      parsedSession = JSON.parse(
        localStorage.getItem(this.#SESSION_STORAGE_KEY),
      );
    } catch (e) {}

    if (
      !parsedSession ||
      !parsedSession.accessToken ||
      !parsedSession.expiration ||
      new Date(parsedSession.expiration) < new Date()
    ) {
      this.clearAccessToken();
      return null;
    }

    return parsedSession.accessToken;
  }

  setAccessToken(accessToken, expiration) {
    localStorage.setItem(
      this.#SESSION_STORAGE_KEY,
      JSON.stringify({ accessToken, expiration }),
    );
  }

  clearAccessToken() {
    localStorage.removeItem(this.#SESSION_STORAGE_KEY);
  }
}

let authStorageService = new AuthStorageService();

export default authStorageService;
