const tokenKey = "asn-logbook-token";

interface Token {
  access_token: string;
  expired_at: number;
  refresh_token: string;
}

class TokenStorage {
  store(token: string): void {
    localStorage.setItem(tokenKey, token);
  }

  revoke(): void {
    localStorage.removeItem(tokenKey);
  }

  getTokenExpiredTime(): number {
    const token: Token = JSON.parse(String(localStorage.getItem(tokenKey)));
    return token.expired_at;
  }

  getAccessToken(): string {
    const token: Token = JSON.parse(String(localStorage.getItem(tokenKey)));
    return token.access_token;
  }

  getRefreshToken(): string {
    const token: Token = JSON.parse(String(localStorage.getItem(tokenKey)));
    return token.refresh_token;
  }

  hasToken(): boolean {
    return Boolean(this.getAccessToken());
  }
}

export default new TokenStorage();
