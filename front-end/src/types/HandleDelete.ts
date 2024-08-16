import UserRole from './UserRole';

/**
 * @type HandleDelete - This type is used to handle delete.
 * @param {string} _id - The id of the object to delete.
 * @param {function} setDeleteLoading - The function to set delete loading.
 * @param {function} closeDelete - The function to close delete.
 * @param {UserRole} role - The role of the user who is deleting (permission).
 * @returns {Promise<void>} The result of the delete request.
 */
export type HandleDelete = (
  _id: string,
  setDeleteLoading: (value: boolean) => void,
  closeDelete: () => void,
  role?: UserRole,
) => Promise<void>;
