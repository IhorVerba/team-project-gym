import axiosService from './axiosService';

/**
 * @function fetchUserDetail - This service is used to fetch user detail.
 * @async
 * @param {string} userId - The user id to fetch.
 * @see {@link axiosService} for the request handling.
 * @returns - The result of the fetch user detail request.
 */
export const fetchUserDetail = async (userId: string) => {
  const { data } = await axiosService.get(`/users/${userId}`);
  if (data) return data;
};

/**
 * @function getUserTraining - This service is used to get user training.
 * @async
 * @param {string} userId - The user id to get training.
 * @see {@link axiosService} for the request handling.
 * @returns - The result of the get user training request.
 */
export const getUserTraining = async (userId: string) => {
  const { data } = await axiosService.get(`/training/get-all?userId=${userId}`);
  if (data) return data;
};

export const addClientTrainer = async (clientId: string) => {
  const { data } = await axiosService.post('/users/trainer/add-client', {
    clientId,
  });
  if (data) return data;
};

export const removeClientTrainer = async (clientId: string) => {
  const { data } = await axiosService.post('/users/trainer/remove-client', {
    clientId,
  });
  if (data) return data;
};
