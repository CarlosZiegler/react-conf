import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, params?: object) => {
    return axiosInstance.get<T>(url, {
      ...params,
    });
  },
  post: <T>(url: string, data: any) => {
    return axiosInstance.post<T>(url, data, {});
  },
  patch: <T>(url: string, data: any) => axiosInstance.patch<T>(url, data, {}),
  delete: <T>(url: string) => axiosInstance.delete<T>(url, {}),
};
