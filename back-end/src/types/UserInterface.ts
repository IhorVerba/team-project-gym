import { ObjectId } from 'mongoose';
import UserStatus from './UserStatus';

/**
 * @interface User
 * @description User interface
 * @property {ObjectId} _id - User ID
 * @property {string} email - User email
 * @property {string} firstName - User first name
 * @property {string} lastName - User last name
 * @property {string} password - User password
 * @property {string} role - User role
 * @property {string} refreshToken - User refresh token
 * @property {string} photoUrl - User photo URL
 * @property {string} phoneNumber - User phone number
 * @property {string[]} trainerIds - User trainer IDs
 * @property {string[]} userIds - User user IDs
 * @property {object} verification - User verification object
 * @property {UserStatus} userStatus - User status
 */
interface User {
  _id?: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role: string;
  refreshToken?: string;
  photoUrl?: string;
  phoneNumber?: string;
  trainerIds?: string[];
  userIds?: string[];
  verification?: object;
  userStatus: UserStatus;
}
export default User;
