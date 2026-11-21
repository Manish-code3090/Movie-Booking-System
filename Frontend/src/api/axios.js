import axios from "axios";

let accessToken = null;
let authFailureHandler = null;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

let responePrommis = null;

api.interceptors.response.use(
  (responce) => responce,
  async (error) => {
    let originalRequest = error.config;
    if (
      !originalRequest ||
      originalRequest._retry ||
      error.response.status !== 401 ||
      originalRequest.skipRefresh
    ) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;
    try {
      if (!responePrommis) {
        responePrommis = api
          .post("/api/auth/refresh", {}, { skipRefresh: true })
          .then((response) => {
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);
            return newAccessToken;
          })
          .finally(() => {
            responePrommis = null;
          });
        // setAccessToken(response.accessToken)
      }
      const newToken = await responePrommis;

      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (err) {
      authFailureHandler?.();
      return Promise.reject(err);
    }
  },
);

export const setAccessToken = (token) => {
  accessToken = token;
};

export const setAuthFailureHandler = (handler) => {
  authFailureHandler = handler;
};
