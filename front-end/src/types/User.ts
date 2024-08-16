import UserRole from './UserRole';
import UserStatus from './UserStatus';

/**
 * @interface User - This interface is used to define a user.
 * @param {string} _id - The id of the user.
 * @param {string} email - The email of the user.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {UserRole} role - The role of the user.
 * @param {string} refreshToken - The refresh token of the user.
 * @param {string} password - The password of the user.
 * @param {string} photoUrl - The photo url of the user.
 * @param {string} phoneNumber - The phone number of the user.
 * @param {string[]} userIds - The ids of the users.
 * @param {string[]} trainerIds - The ids of the trainers.
 * @param {UserStatus} userStatus - The status of the user.
 * @see {@link UserRole} for more information on the UserRole interface.
 * @see {@link UserStatus} for more information on the UserStatus interface.
 */
export interface User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  refreshToken?: string;
  password?: string;
  photoUrl?: string;
  phoneNumber?: string;
  userIds?: string[];
  trainerIds?: string[];
  userStatus?: UserStatus;
}
