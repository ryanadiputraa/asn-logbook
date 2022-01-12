import axios from "axios";
import auth from "../../modules/auth/auth";
import tokenStorage from "./tokenStorage";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

axiosInstance.interceptors.request.use((config) => {
  if (tokenStorage.hasToken()) {
    if (tokenStorage.getTokenExpiredTime() < Date.now() / 1000) {
      auth
        .refreshToken({ refresh_token: tokenStorage.getRefreshToken() })
        .then((resp) => {
          const accessToken = tokenStorage.getAccessToken();
          if (config.headers === undefined) config.headers = {};
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          window.location.reload();
        })
        .catch((err) => console.error(err));
    } else {
      const accessToken = tokenStorage.getAccessToken();
      if (accessToken !== "") {
        if (config.headers === undefined) config.headers = {};
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      } else {
        console.error("access token is empty");
      }
    }
  }
});

export default axiosInstance;
