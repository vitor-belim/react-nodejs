import AuthSessionStorage from "../../models/auth/auth-session-storage";

class AuthStorageService {
  private readonly SESSION_STORAGE_KEY = "access-token";

  getAccessToken(): string | null {
    let parsedSession: AuthSessionStorage | null = null;

    try {
      let storageItem = localStorage.getItem(this.SESSION_STORAGE_KEY);
      if (storageItem) {
        parsedSession = JSON.parse(storageItem);
      }
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

  setAccessToken(accessToken: string, expiration: string): void {
    localStorage.setItem(
      this.SESSION_STORAGE_KEY,
      JSON.stringify({ accessToken, expiration }),
    );
  }

  clearAccessToken(): void {
    localStorage.removeItem(this.SESSION_STORAGE_KEY);
  }
}

let authStorageService = new AuthStorageService();

export default authStorageService;
