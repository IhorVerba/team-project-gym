import { FileWithPath } from '@mantine/dropzone';
import { User } from '../types/User';
import UserRole from '../types/UserRole';
import axiosService from './axiosService';

/**
 * @function getAllUsers - This service is used to get all users.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<User[]>} The result of the get all users request.
 */
export const getAllUsers = async () => {
  const res = await axiosService.get('users');
  return res.data;
};

/**
 * @function getDisabledUsers - This service is used to get all disabled users.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<User[]>} The result of the get all disabled users request.
 */
export const getDisabledUsers = async () => {
  const response = await axiosService.get('users/disabled-users');
  return response.data;
};

/**
 * @function uploadUserProfileImage - This service is used to upload user profile image.
 * @async
 * @param {FileWithPath} file - The file to upload.
 * @see {@link axiosService} for the request handling.
 */
export const uploadUserProfileImage = async (file: FileWithPath) => {
  const formData = new FormData();
  formData.append('pic', file);
  await axiosService.post('imageUploader/addPicture', formData);
};

/**
 * @function getUserFromToken - This service is used to get user from token.
 * @async
 * @param {string} token - The token to get user.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<User>} The result of the get user from token request.
 */
export const getUserFromToken = async (token: string) => {
  const response = await axiosService.get(`user-report/${token}`);
  return response.data;
};

/**
 * @function fetchClients - This service is used to fetch clients.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<User[]>} The result of the fetch clients request.
 */
export const fetchClients = async () => {
  const response = await axiosService.get('users/all-clients');
  return response.data;
};

export const fetchDisabledClients = async () => {
  const response = await axiosService.get('users/disabled-clients');
  return response.data;
};

/**
 * @function fetchClientsMainInfo - This service is used to fetch clients main info.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<User[]>} The result of the fetch clients main info request.
 */
export const fetchClientsMainInfo = async () => {
  const response = await axiosService.get('users/clients-main-info');
  return response.data;
};

/**
 * @function fetchTrainers - This service is used to fetch trainers.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<User[]>} The result of the fetch trainers request.
 */
export const createUserWithRole = async (newUser: User) => {
  const res = await axiosService.post(
    `users/create-${newUser.role.toLowerCase()}`,
    newUser,
  );

  return res.data._id;
};

/**
 * @function updateUser - This service is used to update user.
 * @async
 * @param {User} newUser - The new user object which is used to update the data.
 * @param {string} userId - The id of the user to update.
 * @see {@link axiosService} for the request handling.
 */
export const updateUser = async (newUser: User, userId: string) => {
  await axiosService.put(`users/update-${newUser.role.toLowerCase()}`, {
    updatedUser: newUser,
    updatedUserId: userId,
  });
};

/**
 * @function deleteUser - This service is used to delete user.
 * @async
 * @param {string} userId - The id of the user to delete.
 * @param {UserRole} userRole - The role of the user how is deleting (permission).
 * @see {@link axiosService} for the request handling.
 */
export const deleteUser = async (userId: string, userRole: UserRole) => {
  await axiosService.delete(`users/delete-${userRole.toLowerCase()}`, {
    data: { userToDeleteId: userId },
  });
};

/**
 * @function disableUser - This service is used to disable user.
 * @async
 * @param {string} userId - The id of the user to disable.
 * @param {UserRole} userRole - The role of the user to disable.
 * @see {@link axiosService} for the request handling.
 */
export const disableUser = async (userId: string, userRole: UserRole) => {
  await axiosService.post(`users/disable-${userRole.toLowerCase()}`, {
    data: { userToDisableId: userId },
  });
};

export const activateUser = async (userId: string, userRole: UserRole) => {
  await axiosService.post(`users/activate-${userRole.toLowerCase()}`, {
    data: { userToActivateId: userId },
  });
};

/**
 * @function sendMountReports - This service is used to send month report to all users.
 * @async
 * @see {@link axiosService} for the request handling.
 */
export const sendMountReports = async (
  selectedChart?: string[],
  date?: [Date | null, Date | null],
) => {
  await axiosService.post('users/send-reports', { selectedChart, date });
};
