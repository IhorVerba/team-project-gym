import axios from 'axios';
import { refreshToken } from './authService';
/**
 * @constant {string | undefined} API_URL
 * @description This constant is used to store the API URL from the environment variables.
 * @returns API_URL
 */
const API_URL = process.env.REACT_APP_API_URL;

/**
 * @constant {AxiosInstance} axiosService
 * @description This service is used to handle axios requests. It sets the base URL of the API and adds the authorization header with the access token from the local storage. It also handles the refresh token request if the access token is expired. Use this service to make requests to the API.
 * @returns axiosService
 */
const axiosService = axios.create({
  baseURL: API_URL,
});

axiosService.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem('accessToken')}`;
  return config;
});
axiosService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      return axiosService(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosService;
