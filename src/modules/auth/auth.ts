import axios from "axios";
import tokenStorage from "../../lib/axios/tokenStorage";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class Auth {
  login(payload: object): Promise<void> {
    return axios
      .post(`${API_ENDPOINT}/auth/v1/login`, payload)
      .then((resp) => tokenStorage.store(JSON.stringify(resp.data?.data)))
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  register(payload: object): Promise<void> {
    return axios
      .post(`${API_ENDPOINT}/auth/v1/register`, payload)
      .then((resp) => console.log(resp.data?.message))
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
  refreshToken(payload: object): Promise<void> {
    const accessToken = tokenStorage.getAccessToken();
    return axios
      .post(`${API_ENDPOINT}/auth/v1/refresh`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resp) => tokenStorage.store(JSON.stringify(resp.data?.data)));
  }

  logout(callback: Function): void {
    tokenStorage.revoke();
    callback();
  }

  isAuthenticated(): boolean {
    return tokenStorage.hasToken();
  }
}

export default new Auth();
