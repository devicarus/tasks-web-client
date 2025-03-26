import axios, { AxiosInstance } from "axios";

import { refreshAccessToken } from "@/api";
import { Queue } from "@/util";

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setupRequestInterceptor = (
  axiosInstance: AxiosInstance,
  token: string | null,
) => {
  const requestIntercept = axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"] && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  return requestIntercept; // Return the interceptor ID so it can be ejected
};

export const ejectInterceptor = (
  axiosInstance: AxiosInstance,
  interceptId: number,
) => {
  axiosInstance.interceptors.request.eject(interceptId);
};

let isRefreshing = false;
let failedQueue: Queue<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}>;

const processQueue = (error?: any) => {
  while (!failedQueue.empty()) {
    const { resolve, reject } = failedQueue.pop();

    if (error) reject(error);
    else resolve();
  }
};

export const setupResponseInterceptor = (
  axiosInstance: AxiosInstance,
  setToken: (token: string | null) => void,
) => {
  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        const promise = new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosPrivate.request(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });

        if (!isRefreshing) {
          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const accessToken = await refreshAccessToken();

            setToken(accessToken);
            processQueue();
          } catch (refreshError) {
            processQueue(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return promise;
      }

      return Promise.reject(error);
    },
  );

  return responseInterceptor;
};
