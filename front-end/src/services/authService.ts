import { UserLoginDTO } from '../types/UserLoginDTO';
import axiosService from './axiosService';

/**
 * @function logout
 * @async
 * @description This service is used to handle logout request. It removes the access token and refresh token from the local storage.
 * @returns {Promise<void>} The result of the logout request.
 */
export const logout = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
 * @function fetchUser
 * @async
 * @description This service is used to fetch the user data if accessToken is provided.
 * @returns {Promise<any>} The user data.
 */
export const fetchUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const response = await axiosService.get('/auth/me');
    const user = response.data.user;
    return user;
  }
};

/**
 * @function login
 * @async
 * @description This service is used to handle login request. It saves the access token and refresh token in the local storage.
 * @param {UserLoginDTO} userCreds - The user credentials.
 * @returns {Promise<void>} The result of the login request.
 */
export const login = async (userCreds: UserLoginDTO) => {
  const loginResponse = await axiosService.post('/auth', userCreds);
  const { accessToken, refreshToken } = loginResponse.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

/**
 * @function refreshToken
 * @async
 * @description This service is used to handle refresh token request using refreshToken from local storage. It saves the new access token in the local storage. If the refresh token request fails it logs the error message and calls the logout function.
 * @returns {Promise<void>} The result of the refresh token request.
 * @throws The error message if the refresh token request fails.
 */
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    try {
      const { data } = await axiosService.post('/auth/refresh', {
        refreshToken,
      });
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error! Unable to refresh token:', error.message);
      }
    }
  } else {
    logout();
  }
};

/**
 * @function forgotPassword
 * @async
 * @description This service is used to handle forgot password request.
 * @param {string} email - The email.
 * @returns {Promise<void>} The result of the forgot password request.
 */
export const verifyToken = async (token: string | null) => {
  const response = await axiosService.post('/auth/verification-token', {
    verificationToken: token,
  });
  const email = response.data.email;
  return email;
};

/**
 * @function forgotPassword
 * @async
 * @description This service is used to handle forgot password request.
 * @param {string} email - The email.
 * @returns {Promise<void>} The result of the forgot password request.
 */
export const setPassword = async (token: string | null, password: string) => {
  await axiosService.post('/auth/set-password', {
    verificationToken: token,
    password,
  });
};
